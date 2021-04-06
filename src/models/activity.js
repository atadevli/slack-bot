module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define('activity', {
    userId: {
      type: sequelize.Sequelize.CHAR,
    },
    type: {
      type: Sequelize.INTEGER,
    },
    km: {
      type: Sequelize.DOUBLE,
    },
    point: {
      type: Sequelize.DOUBLE,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: 'activities',
  });

  return Activity;
};
