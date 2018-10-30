const crypto = require('crypto')
const {
  PINTEREST_CLIENT_SECRET
} = process.env

function signatureRequest (url, path, method, query) {
  const hmac = crypto.createHmac('sha256', PINTEREST_CLIENT_SECRET)
  const queryArray = Object.keys(query).map(key => {
    return `${key}=${key === 'redirect_uri' ? encodeURIComponent(query[key]) : query[key]}`
  })
  const queryString = queryArray.sort().join('&')
  const requestString = `${method.toUpperCase()}&${encodeURIComponent(`${url}${path}${path.split('').pop() === '/' ? '' : '/'}`)}&${queryString}`
  hmac.update(requestString)
  return hmac.digest('hex')
}

module.exports = signatureRequest
