/**
 *
 * @param reserveA Amount of token A in the pool
 * @param reserveB Amount of token B in the pool
 * @param volatility Volatility in percentage
 * @param oraclePrice Market Price of the token returned by the oracle
 * @returns {number} Target Ratio
 */
export const calculateTargetRatio = (
  reserveA: number,
  reserveB: number,
  volatility: number,
  oraclePrice: number,
) => {
  // B/A = (σ * currentRatio + (1 - σ) * oracleRatio)
  // Current Ratio = reserveA / reserveB
  // Oracle Ratio = 1 / Price
  // σ = Volatility in percentage
  const currentRatio = reserveA / reserveB;
  const oracleRatio = 1 / oraclePrice;
  const sigma = volatility;
  const targetRatio = (sigma * currentRatio + (1 - sigma) * oracleRatio) / 1;
  return targetRatio;
};

/**
 *
 * @param volatility Volatility in percentage
 * @param deltaT Time delta in years
 * @param marketPrice Market Price of the token
 * @returns {object} Effective Price and Percentage Difference
 */
export const calculateEffectivePrice = (
  volatility: number,
  deltaT: number,
  marketPrice: number,
) => {
  // Effective Price = Market Price * exp(- (σ² * Δt)/2 + σ * √(Δt) * Z₀)
  // Where σ is volatility, Δt is time delta in years, Z₀ is standard normal distribution
  // - (σ² * Δt)/2 is convexity adjustment factor
  // σ * √(Δt) * Z₀ is random shock

  const z0 = 2.576;
  // Returns average effective price and percentage difference that could happen
  const maxEffectivePrice =
    marketPrice *
    Math.exp(-(volatility * deltaT) / 2 + volatility * Math.sqrt(deltaT) * z0);
  const minEffectivePrice =
    marketPrice *
    Math.exp(-(volatility * deltaT) / 2 + volatility * Math.sqrt(deltaT) * -z0);

  const averageEffectivePrice = (maxEffectivePrice + minEffectivePrice) / 2;
  const percentageDifference =
    (averageEffectivePrice - minEffectivePrice) / minEffectivePrice;

  return {
    averageEffectivePrice,
    percentageDifference,
  };
};

export const sleep = async (ms: number) => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};
