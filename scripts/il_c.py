import json
import math
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime

# ================= CONFIG =================
INPUT_FILE = "data.json"
INITIAL_USD = 1_000_000       # realistic LP deposit
BASE_FEE = 0.003              # 0.3%
DEPTH_FACTOR = 0.05           # scaling for dynamic fee
V3_RANGE = (0.9,1.1)         # narrow v3 range
BALANCER_WEIGHT = 0.8
DT = 1/365                     # daily timestep
BASE_FEE_GBM = 0.001
TRADE_SIZE_FRACTION = 0.01
# ==========================================

def timestamp_to_datetime(ts):
    return datetime.utcfromtimestamp(ts/1000)

def sqrt(x):
    return math.sqrt(x)

# --- IL Formulas ---
def il_uniswap_v2(p: float) -> float:
    return (2 * sqrt(p)) / (1 + p) - 1

def il_balancer(p: float, w: float = BALANCER_WEIGHT) -> float:
    V_hodl = w * p + (1 - w)
    V_pool = p**w
    return V_pool / V_hodl - 1

# --- v3 formulas ---
def compute_L_from_initial(initial_amount0, initial_amount1, P0, P_a, P_b):
    sqrtP0 = sqrt(P0)
    sqrtPa = sqrt(P_a)
    sqrtPb = sqrt(P_b)
    L0 = initial_amount0 * (sqrtPb * sqrtP0) / (sqrtPb - sqrtP0) if P0 < P_b else 0.0
    L1 = initial_amount1 / (sqrtP0 - sqrtPa) if P0 > P_a else 0.0
    if L0 > 0 and L1 > 0:
        L = min(L0, L1)
    elif L0 > 0:
        L = L0
    else:
        L = L1
    return L

def amounts_for_liquidity(L, P, P_a, P_b):
    sqrtP = sqrt(P)
    sqrtPa = sqrt(P_a)
    sqrtPb = sqrt(P_b)
    if P <= P_a:
        amount0 = L * (sqrtPb - sqrtPa) / (sqrtPa * sqrtPb)
        amount1 = 0.0
    elif P >= P_b:
        amount0 = 0.0
        amount1 = L * (sqrtPb - sqrtPa)
    else:
        amount0 = L * (sqrtPb - sqrtP) / (sqrtP * sqrtPb)
        amount1 = L * (sqrtP - sqrtPa)
    return amount0, amount1

def v3_position_value_usdc(L, P, P_a, P_b):
    amount0, amount1 = amounts_for_liquidity(L, P, P_a, P_b)
    return amount0 * P + amount1

# --- GBM stochastic AMM ---
def gbm_effective_price(P_market, sigma, dt=DT):
    Z = np.random.normal()
    return P_market * math.exp(-0.5 * sigma**2 * dt + sigma * math.sqrt(dt) * Z)

def compute_fee(sigma, trade_size, reserveB, base_fee=BASE_FEE_GBM):
    return base_fee + sigma + (trade_size / reserveB) * DEPTH_FACTOR

# --- Load data ---
with open(INPUT_FILE, "r") as f:
    data = json.load(f)

timestamps = [d["timestamp"] for d in data]
dates = [timestamp_to_datetime(ts) for ts in timestamps]
prices = [d["price"] for d in data]
vols = [d["volatility"] for d in data]

# --- Initial LP deposit ---
initial_amount0 = (INITIAL_USD / 2) / prices[0]  # ETH
initial_amount1 = INITIAL_USD / 2                 # USD

# --- v3 absolute range ---
P_a = V3_RANGE[0] * prices[0]
P_b = V3_RANGE[1] * prices[0]

# --- Compute cumulative IL for v2 ---
il_v2_cum = []
for p in prices:
    ratio = p / prices[0]
    il_v2_cum.append(il_uniswap_v2(ratio) * 100)

# --- Compute cumulative IL for Balancer ---
il_bal_cum = []
for p in prices:
    ratio = p / prices[0]
    il_bal_cum.append(il_balancer(ratio, BALANCER_WEIGHT) * 100)

# --- Compute cumulative IL for v3 ---
v3_L = compute_L_from_initial(initial_amount0, initial_amount1, prices[0], P_a, P_b)
il_v3_cum = []
for p in prices:
    V_pool = v3_position_value_usdc(v3_L, p, P_a, P_b)
    V_hodl = initial_amount0 * p + initial_amount1
    IL = (V_pool / V_hodl - 1.0) * 100
    il_v3_cum.append(IL)

# --- Compute cumulative IL for stochastic AMM ---
lp_values = []
hodl_values = []

for i, entry in enumerate(data):
    P_market = entry["price"]
    sigma = entry["volatility"]
    P_eff = gbm_effective_price(P_market, sigma)
    trade_size = TRADE_SIZE_FRACTION * initial_amount1
    fee = compute_fee(sigma, trade_size, initial_amount1)
    fee_earned = trade_size * fee
    V_pool = initial_amount0 * P_eff + initial_amount1 + fee_earned
    V_hodl = initial_amount0 * P_eff + initial_amount1
    lp_values.append(V_pool)
    hodl_values.append(V_hodl)

il_stochastic_cum = [(lp - hodl)/hodl*100 for lp, hodl in zip(lp_values, hodl_values)]

# --- Plot ---
plt.figure(figsize=(16,7))
plt.plot(dates, il_v2_cum, label="Uniswap v2 (50/50)", alpha=0.8)
plt.plot(dates, il_bal_cum, label=f"Balancer {int(BALANCER_WEIGHT*100)}/{int((1-BALANCER_WEIGHT)*100)}", alpha=0.8)
plt.plot(dates, il_v3_cum, label=f"Uniswap v3 ({V3_RANGE[0]*100:.0f}-{V3_RANGE[1]*100:.0f}% range)", alpha=0.8)
plt.plot(dates, il_stochastic_cum, label="Stochastic AMM (GBM + Fee)", alpha=0.8)
plt.axhline(0, color='black', linestyle='--', linewidth=0.8)
plt.xlabel("Date")
plt.ylabel("Cumulative Impermanent Loss (%)")
plt.title("Cumulative Impermanent Loss Across AMMs")
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()
