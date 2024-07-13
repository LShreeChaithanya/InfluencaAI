const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

const oauth = OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

const baseUrl = 'https://api.twitter.com/1.1';

const makeRequest = async (url, method, token, tokenSecret, data = null) => {
  const requestData = {
    url,
    method,
  };

  const authHeader = oauth.toHeader(oauth.authorize(requestData, {
    key: token,
    secret: tokenSecret,
  }));

  try {
    const response = await axios({
      url,
      method,
      headers: {
        ...authHeader,
        'Content-Type': 'application/json',
      },
      data,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Twitter API error: ${error.response ? error.response.data : error.message}`);
  }
};

exports.getAccessToken = async (oauthToken, oauthVerifier) => {
  // Implement OAuth 1.0a flow to get access token
};

exports.postTweet = async (accessToken, accessTokenSecret, content) => {
  return makeRequest(`${baseUrl}/statuses/update.json`, 'POST', accessToken, accessTokenSecret, { status: content });
};

exports.getUserTweets = async (accessToken, accessTokenSecret) => {
  return makeRequest(`${baseUrl}/statuses/user_timeline.json`, 'GET', accessToken, accessTokenSecret);
};

exports.getUserStats = async (accessToken, accessTokenSecret) => {
  return makeRequest(`${baseUrl}/users/show.json`, 'GET', accessToken, accessTokenSecret);
};

exports.getTweetAnalytics = async (accessToken, accessTokenSecret, tweetId) => {
  return makeRequest(`${baseUrl}/statuses/show.json?id=${tweetId}`, 'GET', accessToken, accessTokenSecret);
};

exports.getUserProfile = async (accessToken, accessTokenSecret) => {
  return makeRequest(`${baseUrl}/account/verify_credentials.json`, 'GET', accessToken, accessTokenSecret);
};