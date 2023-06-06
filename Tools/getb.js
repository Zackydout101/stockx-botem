function getBetween(str, startDelimiter, endDelimiter) {
  const regex = new RegExp(`${startDelimiter}(.*?)${endDelimiter}`);
  const matches = str.match(regex);
  return matches ? matches[1] : null;
}
module.exports = getBetween;
