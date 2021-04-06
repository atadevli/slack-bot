const express = require('express');
const bodyParser = require('body-parser');

const ActivityController = require('./src/controllers/activity');
const ReportController = require('./src/controllers/report');

const { PORT } = require('./src/config');

const db = require('./src/db');

const SlackSignVerification = require('./src/helpers/slack-request-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

app.get('/health', (req, res) => {
  res.status(200);
  res.send('slack-bot is running');
});

app.post('/running', SlackSignVerification, (req, res) => {
  res.status(200);
  res.send();
  const { body } = req;
  ActivityController.newRunningActivity(body);
});

app.post('/biking', SlackSignVerification, (req, res) => {
  res.status(200);
  res.send();
  const { body } = req;
  ActivityController.newBikingActivity(body);
});

app.post('/leaderboard', SlackSignVerification, (req, res) => {
  res.status(200);
  res.send();
  const { body } = req;
  ReportController.getLeaderBoard(body);
});

app.listen(PORT);
