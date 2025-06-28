function secureRandom18Decimals() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const max = 0xffffffff; // 4294967295
  const rand = buf[0] / (max + 1); // uniform in [0, 1)
  return Math.floor(rand * 1e18) / 1e18; // 18 decimal places
}

const reserveA = 1;
const reserveB = 2500;

const oraclePrice = 2450;
const sigma = 0.8;

const amountADesired = 1;
const amountBDesired = 2500;

const currentRatio = reserveA / reserveB;
const oracleRatio = 1 / oraclePrice;

const targetRatio = sigma * currentRatio + (1 - sigma) * oracleRatio;

console.log("Current Ratio: ", currentRatio * 1e18);
console.log("Oracle Ratio: ", oracleRatio * 1e18);
console.log("Target Ratio: ", targetRatio * 1e18);

const amountBOptimal = amountADesired / targetRatio;

if (amountBOptimal <= amountBDesired) {
  console.log(`${amountADesired} ETH, ${amountBOptimal} USD`);
} else {
  const amountAOptimal = amountBDesired * targetRatio;
  console.log(`${amountAOptimal} ETH, ${amountBDesired} USD`);
}

console.log(1e36 / 24500000000000000000000000000000);
