const ReportService = require('../services/report');

const getLeaderBoard = (body) => {
  ReportService.getLeaderBoard(body);
};

module.exports = {
  getLeaderBoard,
};
