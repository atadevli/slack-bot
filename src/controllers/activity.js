const ActivityService = require('../services/activity');
const Validator = require('../helpers/validator');

const newRunningActivity = (body) => {
  const { text } = body;
  const isValid = Validator.isBikingActivityInputValid(text);

  if (!isValid) {
    ActivityService.invalidInput(body);
  }
  else {
    ActivityService.newRunningActivity(body);
  }
};

const newBikingActivity = (body) => {
  const { text } = body;
  const isValid = Validator.isBikingActivityInputValid(text);

  if (!isValid) {
    ActivityService.invalidInput(body);
  }
  else {
    ActivityService.newBikingActivity(body);
  }
};

module.exports = {
  newRunningActivity,
  newBikingActivity,
};
