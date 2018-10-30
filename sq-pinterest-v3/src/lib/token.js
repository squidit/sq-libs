const sqGot = require('../utils/sq-got')
const {
  PINTEREST_CLIENT_ID
} = process.env

async function token (code, redirectUri) {
  const query = {
    client_id: PINTEREST_CLIENT_ID,
    code: code,
    consumer_id: PINTEREST_CLIENT_ID,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    timestamp: new Date().getTime()
  }
  return sqGot('/oauth/code_exchange/', 'put', query, true)
}

module.exports = token
