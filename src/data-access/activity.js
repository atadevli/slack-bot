const db = require('../db');
const { LEADER_BOARD_USER_LIMIT } = require('../constants');

const Activity = db.activity;
const { Op } = db.Sequelize;

const insertActivity = ({ activity }) => Activity.create(activity)
  .catch((err) => {
    console.log('insertActivity Error: ', err);
    throw err;
  });

const getTotalActivityPointsOfUsersFromDate = ({ date }) => Activity.findAll({
  where: {
    createdAt: {
      [Op.gte]: date,
    },
  },
  attributes: [
    'userId',
    [db.sequelize.fn('sum', db.sequelize.col('point')), 'total_point'],
  ],
  group: ['userId'],
  order: [
    [db.sequelize.literal('total_point'), 'DESC'],
  ],
  limit: LEADER_BOARD_USER_LIMIT,
  raw: true,
});

module.exports = {
  insertActivity,
  getTotalActivityPointsOfUsersFromDate,
};
