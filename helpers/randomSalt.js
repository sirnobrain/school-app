module.exports = () => {
  const randomRoundNumber = (max, min) => {
    return Math.round(Math.random() * (max - min) + min);
  }
  let salt = '';

  while (salt.length < 8) {
    const randomAlphanumeric = [
      randomRoundNumber(57, 48), 
      randomRoundNumber(90, 65), 
      randomRoundNumber(122, 97)
    ].map(alphanum => String.fromCharCode(alphanum));

    salt += randomAlphanumeric[Math.round(Math.random() * (2 - 0) + 0)];
  }

  return salt;
}