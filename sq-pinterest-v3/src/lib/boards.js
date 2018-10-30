const sqGot = require('../utils/sq-got')

async function boardsSelf (token) {
  const query = {
    access_token: token.access_token
  }
  return sqGot('/users/me/boards/', 'get', query, false)
}

/* Não temos certeza de como autenticar a request ainda, mas a rota existe
async function boardGet (board, token) {
  const query = {
    access_token: token.access_token
  }
  return sqGot(`/boards/${board}/`, 'get', query, false)
} */

module.exports = {
  boardsSelf
  // boardGet
}
