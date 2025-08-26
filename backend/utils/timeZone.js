function toIST(date) {
  if (!date) return null;
  let d = new Date(date);
  // IST offset in minutes = 330
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset() + 330);
  return d;
}

module.exports = { toIST };