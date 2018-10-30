const sqGot = require('../utils/sq-got')

async function pinsSelf (token, pageSize, page = 0, bookmark) {
  const query = {
    access_token: token.access_token,
    bookmark,
    page_size: pageSize
  }
  return sqGot('/users/me/pins/', 'get', query, false)
    .then(async pins => {
      if (page === 0) return pins
      page--
      return pinsSelf(token, pageSize, page, pins.bookmark)
    })
}

async function pinGet (pin, token) {
  const query = {
    access_token: token.access_token
  }
  return sqGot(`/pins/${pin}/`, 'get', query, false)
}

module.exports = {
  pinsSelf,
  pinGet
}
