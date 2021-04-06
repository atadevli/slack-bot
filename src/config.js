const Configs = {
  SLACK_SIGNING_SECRET_KEY: process.env.SLACK_SIGNING_SECRET_KEY || '',
  SLACK_API_TOKEN: process.env.SLACK_API_TOKEN || '',
  SLACK_CHANNEL_ID: process.env.SLACK_CHANNEL_ID || '',

  PORT: process.env.PORT || 8080,

  POSTGRES_CREDENTIALS: {
    USER: process.env.DB_USER || '',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_NAME || '',
    HOST: process.env.DB_HOST || '',
  },
};

module.exports = Configs;
