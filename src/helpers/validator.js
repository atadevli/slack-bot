const isNumeric = (str) => {
  if (typeof str !== 'string') return false;
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(str) && !isNaN(parseFloat(str));
};

const isBikingActivityInputValid = (input) => isNumeric(input) && (parseFloat(input) <= 20);

const isRunnigActivityInputValid = (input) => isNumeric(input) && (parseFloat(input) <= 20);

module.exports = {
  isBikingActivityInputValid,
  isRunnigActivityInputValid,
};
