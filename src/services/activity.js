const RequestHelper = require('../helpers/request');
const {
  RUNNING_POINT_MULTIPLIER, BIKING_POINT_MULTIPLIER, ACTIVITY_TYPES, ACTIVITY_NAMES,
} = require('../constants');

const ActivityDataAccess = require('../data-access/activity');

const getPoint = ({ km, multiplier }) => parseFloat((km * multiplier).toFixed(2));

const createActivity = ({
  userId, type, km, point,
}) => ({
  userId,
  type,
  km,
  point,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createSuccessActivityResponse = ({ km, type }) => ({
  response_type: 'ephemeral',
  text: `Congratulations for your ${km} km ${ACTIVITY_NAMES[type]} :)`,
});

const createFailActivityResponse = ({ type }) => ({
  response_type: 'ephemeral',
  text: `I could not submit your ${ACTIVITY_NAMES[type]} activity please try again later :(`,
});

const newRunningActivity = async (body) => {
  // eslint-disable-next-line camelcase
  const { response_url, user_id, text } = body;

  const km = parseFloat(text);
  const point = getPoint({ km, multiplier: RUNNING_POINT_MULTIPLIER });

  const newActivity = createActivity({
    userId: user_id, type: ACTIVITY_TYPES.RUNNING, km, point,
  });

  try {
    await ActivityDataAccess.insertActivity({ activity: newActivity });

    const response = createSuccessActivityResponse({ km, type: ACTIVITY_TYPES.RUNNING });

    RequestHelper.sendPostRequest({ url: response_url, data: response });
  } catch (error) {
    const response = createFailActivityResponse({ type: ACTIVITY_TYPES.RUNNING });
    RequestHelper.sendPostRequest({ url: response_url, data: response });
  }
};

const newBikingActivity = async (body) => {
  // eslint-disable-next-line camelcase
  const { response_url, user_id, text } = body;

  const km = parseFloat(text);
  const point = getPoint({ km, multiplier: BIKING_POINT_MULTIPLIER });

  const newActivity = createActivity({
    userId: user_id, type: ACTIVITY_TYPES.BIKING, km, point,
  });

  try {
    await ActivityDataAccess.insertActivity({ activity: newActivity });

    const response = createSuccessActivityResponse({ km, type: ACTIVITY_TYPES.BIKING });

    RequestHelper.sendPostRequest({ url: response_url, data: response });
  } catch (error) {
    const response = createFailActivityResponse({ type: ACTIVITY_TYPES.BIKING });
    RequestHelper.sendPostRequest({ url: response_url, data: response });
  }
};

const invalidInput = async (body) => {
  // eslint-disable-next-line camelcase
  const { response_url } = body;

  const InvalidInputResponse = {
    response_type: 'ephemeral',
    text: 'Invalid input. Please enter a km lesser than 20.',
  };

  RequestHelper.sendPostRequest({ url: response_url, data: InvalidInputResponse });
};

module.exports = {
  newRunningActivity,
  newBikingActivity,
  invalidInput,
};
