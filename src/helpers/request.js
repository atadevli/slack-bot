const axios = require('axios');

const sendPostRequest = ({ url, data, token }) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : undefined),
  };

  return axios.post(url, data, { headers });
};

const sendGetRequest = ({ url, token }) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : undefined),
  };

  return axios.get(url, { headers });
};

module.exports = { sendPostRequest, sendGetRequest };
