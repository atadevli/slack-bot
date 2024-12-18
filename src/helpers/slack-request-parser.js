const crypto = require('crypto');
const qs = require('qs');
// fetch this from environment variables
const { SLACK_SIGNING_SECRET_KEY } = require('../config');

// eslint-disable-next-line consistent-return
const signVerification = (req, res, next) => {
  try {
    const slackSignature = req.headers['x-slack-signature'];
    const requestBody = qs.stringify(req.body, { format: 'RFC1738' });
    const timestamp = req.headers['x-slack-request-timestamp'];
    const time = Math.floor(new Date().getTime() / 1000);
    if (Math.abs(time - timestamp) > 300) {
      return res.status(400).send('Ignore this request.');
    }
    if (!SLACK_SIGNING_SECRET_KEY) {
      return res.status(400).send('Slack signing secret is empty.');
    }
    const sigBasestring = `v0:${timestamp}:${requestBody}`;
    const mySignature = `v0=${
      crypto.createHmac('sha256', SLACK_SIGNING_SECRET_KEY)
        .update(sigBasestring, 'utf8')
        .digest('hex')}`;
    if (crypto.timingSafeEqual(
      Buffer.from(mySignature, 'utf8'),
      Buffer.from(slackSignature, 'utf8'),
    )
    ) {
      next();
    } else {
      return res.status(400).send('Verification failed');
    }
  }
  catch (error) {
    console.log('Verification Error: ', error);
    return res.status(400).send('Verification failed');
  }
};

module.exports = signVerification;
