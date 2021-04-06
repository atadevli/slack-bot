const CONSTANTS = {
  SLACK_API_USER_INFO_URL: 'https://slack.com/api/users.info',
  SLACK_API_SEND_MESSAGE_URL: 'https://slack.com/api/chat.postMessage',

  RUNNING_POINT_MULTIPLIER: 1.25,
  BIKING_POINT_MULTIPLIER: 1.5,

  ACTIVITY_TYPES: {
    RUNNING: 1,
    BIKING: 2,
  },

  ACTIVITY_NAMES: {
    1: 'running',
    2: 'biking',
  },

  LEADER_BOARD_USER_LIMIT: 3,
};

module.exports = CONSTANTS;
