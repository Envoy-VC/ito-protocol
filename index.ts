function secureRandom18Decimals() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const max = 0xffffffff; // 4294967295
  const rand = buf[0] / (max + 1); // uniform in [0, 1)
  return Math.floor(rand * 1e18) / 1e18; // 18 decimal places
}

console.log(secureRandom18Decimals());
