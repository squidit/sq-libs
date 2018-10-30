const sqGot = require('../utils/sq-got')
const {
  PINTEREST_CLIENT_ID
} = process.env

async function userSelf (token) {
  const query = {
    access_token: token.access_token
  }
  return sqGot('/users/me/', 'get', query, false)
}

async function userGet (user) {
  const query = {
    client_id: PINTEREST_CLIENT_ID,
    timestamp: new Date().getTime()
  }
  return sqGot(`/users/${user}/`, 'get', query, true)
}

module.exports = {
  userSelf,
  userGet
}
