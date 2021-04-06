const moment = require('moment');

const ActivityDataAccess = require('../data-access/activity');
const RequestHelper = require('../helpers/request');

const { SLACK_API_USER_INFO_URL, SLACK_API_SEND_MESSAGE_URL } = require('../constants');

const { SLACK_API_TOKEN, SLACK_CHANNEL_ID } = require('../config');

const getOneHourBeforeDate = () => moment.utc().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss');

const getSlackUserNameById = async (userId) => {
  const url = `${SLACK_API_USER_INFO_URL}?user=${userId}`;

  try {
    const response = await RequestHelper.sendGetRequest({ url, token: SLACK_API_TOKEN });
    const { status, data: { user: { name } } } = response;
    if (status === 200) {
      return { [userId]: name };
    }
    return { [userId]: userId };
  }
  catch (error) {
    return { [userId]: userId };
  }
};

const getAllUsersIdList = (results) => results.reduce((acc, currentValue) => {
  const { userId } = currentValue;

  if (acc.includes(userId)) return acc;

  return acc.concat([userId]);
}, []);

const getUsersRealNameLookup = async (userIdList) => {
  const promises = userIdList.map((userId) => getSlackUserNameById(userId));
  const userNameInfos = await Promise.all(promises);

  return userNameInfos.reduce((acc, currentValue) => ({ ...acc, ...currentValue }), {});
};

const createSlackMessageBlocksForLeaderBoard = ({ userNameLookUp, leaderBoard }) => {
  let counter = 0;

  const titleBlock = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Leaderboard:',
      },
    },
  ];

  const resultBlocks = leaderBoard.map((userResult) => {
    const { userId, total_point: totalPoint } = userResult;
    const userName = userNameLookUp[userId];
    counter += 1;

    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${counter}. ${userName} with ${totalPoint} point.`,
      },
    };
  });

  return titleBlock.concat(resultBlocks);
};

const createSlackMessageBlocksForEmptyLeaderboard = () => ([{
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: 'There is no any activity within last 1 hour.',
  },
}]);

const sendMessageToSlackChannel = ({ channelId, messageBlocks }) => {
  const body = {
    channel: channelId,
    blocks: messageBlocks,
  };

  RequestHelper.sendPostRequest({ url: SLACK_API_SEND_MESSAGE_URL, token: SLACK_API_TOKEN, data: body });
};

const getLeaderBoard = async () => {
  const oneHourBeforeDate = getOneHourBeforeDate();

  const leaderBoard = await ActivityDataAccess.getTotalActivityPointsOfUsersFromDate({ date: oneHourBeforeDate });

  if (leaderBoard.length > 0) {
    const userIdList = getAllUsersIdList(leaderBoard);

    const userNameLookUp = await getUsersRealNameLookup(userIdList);

    const messageBlocks = createSlackMessageBlocksForLeaderBoard({ leaderBoard, userNameLookUp });

    sendMessageToSlackChannel({ channelId: SLACK_CHANNEL_ID, messageBlocks });
  }
  else {
    const messageBlocks = createSlackMessageBlocksForEmptyLeaderboard();

    sendMessageToSlackChannel({ channelId: SLACK_CHANNEL_ID, messageBlocks });
  }
};

module.exports = {
  getLeaderBoard,
};
