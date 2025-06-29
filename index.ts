// function secureRandom18Decimals() {
//   const buf = new Uint32Array(1);
//   crypto.getRandomValues(buf);
//   const max = 0xffffffff; // 4294967295
//   const rand = buf[0] / (max + 1); // uniform in [0, 1)
//   return Math.floor(rand * 1e18) / 1e18; // 18 decimal places
// }

// const reserveA = 1;
// const reserveB = 2500;

// const oraclePrice = 2450;
// const sigma = 0.8;

// const amountADesired = 1;
// const amountBDesired = 2500;

// const currentRatio = reserveA / reserveB;
// const oracleRatio = 1 / oraclePrice;

// const targetRatio = sigma * currentRatio + (1 - sigma) * oracleRatio;

// console.log("Current Ratio: ", currentRatio * 1e18);
// console.log("Oracle Ratio: ", oracleRatio * 1e18);
// console.log("Target Ratio: ", targetRatio * 1e18);

// const amountBOptimal = amountADesired / targetRatio;

// if (amountBOptimal <= amountBDesired) {
//   console.log(`${amountADesired} ETH, ${amountBOptimal} USD`);
// } else {
//   const amountAOptimal = amountBDesired * targetRatio;
//   console.log(`${amountAOptimal} ETH, ${amountBDesired} USD`);
// }

// console.log(1e36 / 24500000000000000000000000000000);

const volatility = 0.8;
const SECONDS_IN_YEAR = 31536000;
//  5 mins in years
const timeDelta = 300 / SECONDS_IN_YEAR;
const z0 = 152853852999162607 / 1e18;

const price = 2450;

const convexityAdjustment = -(volatility * volatility * timeDelta) / 2;
// JS:  -3044140030441.401
// SOL: -3044140030441

const randomShock = volatility * Math.sqrt(timeDelta) * z0;
// JS:   377158327655476.7
// SOL:  377158327655469

const exponent = convexityAdjustment + randomShock;
// Sol:    374114187625028
// JS:     374114187625035.3

const priceFactor = Math.exp(exponent);
// JS:   1000374184177065500
// SOL:  1000374184168337719

const effectivePrice = price * priceFactor;
console.log("Effective Price: ", effectivePrice);
// JS:    2450916751233810400000
// SOL:   2450916751212427411550

console.log((2450916751212427411550 - 7352750253637282234) / 1e18);

// 2450916751212427411550
//  203426581532318479845
