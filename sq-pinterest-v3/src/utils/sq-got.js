const got = require('got')
const signatureRequest = require('./signature-request')
const baseUrl = 'https://api.pinterest.com/v3'

async function sqGot (path, method, query, needSignature) {
  if (needSignature) {
    const oauthSignature = await signatureRequest(baseUrl, path, method, query)
    query['oauth_signature'] = oauthSignature
  }
  return got(path, {
    baseUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method,
    query
  })
    .then(({ body }) => {
      const response = JSON.parse(body)
      if (response.bookmark) {
        response.data.bookmark = response.bookmark
      }
      return response.data
    })
}

module.exports = sqGot
