# Itô Protocol

## 1. What is Ito Protocol?

**Itô Protocol** is a **Stochastic AMM** an on‑chain Automated Market Maker that embeds **stochastic price modeling** to dynamically manage pricing, spreads, liquidity, and fees.  

Built on real-time Chainlink oracles, it simulates possible future prices via a **Geometric Brownian Motion (GBM)** model and adjusts its internal mechanics on-the-fly to better handle volatility and market risk.

---

## 2. What are Stochastic AMMs?

A **Stochastic AMM** extends traditional AMM models (like Uniswap) by incorporating **random price evolution** into their core design.  
- Instead of using deterministic formulas (e.g., constant-product), it uses probabilistic models to simulate future price movement.  
- By sampling a randomized “effective price” at each trade, it adapts parameters—such as fees, spreads, and liquidity routing—based on modeled risk, giving it trading-like adaptability.

---

## 3. What is GBM & its Finance Use?

**Geometric Brownian Motion (GBM)** is a mathematical model for asset price evolution, defined by the SDE:

\[
dS_t = \mu S_t\,dt + \sigma S_t\,dW_t
\]

- **μ** = drift (average growth)  
- **σ** = volatility (randomness)  
- **W_t** = Wiener process (continuous Brownian motion).

**Why GBM?**  
- Ensures **positivity** and log-normal distribution of prices  
- Well-known from the Black–Scholes model for options  
- Balances realism and mathematical simplicity for risk modeling

---

## 4. Discrete GBM in Ito Protocol

In practice, Itô Protocol uses a discrete snapshot at swap time:

\[
\text{EffectivePrice} = P_\text{market} \times \exp\left(
-\tfrac{\sigma^2 \Delta t}{2} + \sigma \sqrt{\Delta t}\, Z_0
\right)
\]

- **Convexity Adjustment** (–σ²·Δt / 2): Corrects the log-normal skew so the expectation isn’t biased upward  
- **Volatility Scaling** (σ√Δt): Translates annual σ to the chosen time window Δt  
- **Random Shock** (Z₀ ~ N(0,1)): Applies random variation in line with GBM

Here, Δt is the time since the last volatility update—i.e., a single-use noise injection at each trade without simulating a full price path.

---

## 5. Component Overview

1. **Oracle Price (Chainlink)**: Provides live \(P_\text{market}\)  
2. **Volatility (σ)**: 30‑day historical volatility computed via Chainlink data feeds  
3. **Random Generator (Z₀)**: Provided per-trade by secure randomness (e.g., Chainlink Functions)  
4. **Pricing Module**: Computes EffectivePrice and informs swap rates  
5. **Fee Engine**: Dynamically sets trading fees based on current volatility and trade depth  
6. **Liquidity Manager**: Participants deposit two tokens; price-setting adjusts reserves using both oracle and volatile signals

---

## 6. Liquidity Mechanics

Price in the pool is determined by blending current pool ratio with oracle price, weighted by volatility:

\[
\text{TokenB/TokenA} = (\sigma \times \text{currentRatio}) + ((1 - \sigma) \times \text{oracleRatio})
\]

- **currentRatio** = reserveA / reserveB  
- **oracleRatio** = 1 / Price (i.e. market reference)

When volatility is high, the pool ratio drives price; when low, the oracle anchors more tightly.

---

## 7. Why 30-Day Volatility?

- **Statistical Stability**: Offers more reliable measurement than noisy 24h windows  
- **Industry Standard**: Typically used in options pricing and financial risk
- **Mean-Reversion**: Volatility fluctuates; 30 days captures a balanced outlook  
- **Avoids Over-reaction**: Reduces erratic protocol behavior from temporary spikes

Using 24h volatility risks noise, manipulation, and unstable fee dynamics—it’s too short for reliable adjustment.

---

## 8. Fee Calculation

Fees are computed to compensate LP risk and scale with trade dynamics:

\[
\text{Fee} = \text{Base} + \sigma \times \text{VolMultiplier} + \frac{\text{TradeSize}}{\text{Reserves}} \times \text{DepthFactor}
\]

- **Base**: Minimum fee floor (e.g., 0.05%)  
- **σ × VolMultiplier**: Increases fees in line with volatility  
- **TradeSize/Reserves × DepthFactor**: Adds slippage-based premium

This ensures LPs are compensated for higher risk during volatile periods and for larger trades that shift pool balance.

---