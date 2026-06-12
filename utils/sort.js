const sortOptions = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
};

function parsePrices(priceList) {
  return priceList.map(price => parseFloat(price.replace(/[^0-9.]/g, '')));
}

function isSortedAsc(values) {
  return values.every((value, index) => index === 0 || value >= values[index - 1]);
}

function isSortedDesc(values) {
  return values.every((value, index) => index === 0 || value <= values[index - 1]);
}

function isAlphabetical(values) {
  const sorted = [...values].sort((a, b) => a.localeCompare(b));
  return values.every((value, index) => value === sorted[index]);
}

function isReverseAlphabetical(values) {
  const sorted = [...values].sort((a, b) => b.localeCompare(a));
  return values.every((value, index) => value === sorted[index]);
}

module.exports = {
  sortOptions,
  parsePrices,
  isSortedAsc,
  isSortedDesc,
  isAlphabetical,
  isReverseAlphabetical,
};
