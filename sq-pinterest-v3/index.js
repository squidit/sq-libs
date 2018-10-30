const token = require('./src/lib/token')
const {
  userSelf,
  userGet
} = require('./src/lib/user')
const {
  pinsSelf,
  pinGet
} = require('./src/lib/pins')
const {
  boardsSelf
  // boardGet
} = require('./src/lib/boards')
const got = require('./src/utils/sq-got')

module.exports = {
  token,
  userSelf,
  userGet,
  pinsSelf,
  pinGet,
  boardsSelf,
  // boardGet,
  got
}
