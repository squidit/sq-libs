const mapInstagramMedia = require('./sq-media-mapping/src/map-instagram-media')
const mapYoutubeMedia = require('./sq-media-mapping/src/map-youtube-media')
const mapPinterestMedia = require('./sq-media-mapping/src/map-pinterest-media')
const mapFeatureMedia = require('./sq-media-mapping/src/map-squid-media')
const mapTwitterMedia = require('./sq-media-mapping/src/map-twitter-media')
const mapStoryMedia = require('./sq-media-mapping/src/map-story-media')
const mapFacebookMedia = require('./sq-media-mapping/src/map-facebook-media')
const mapTiktokMedia = require('./sq-media-mapping/src/map-tiktok-media')
const token = require('./sq-pinterest-v3/src/lib/token')
const { userSelf, userGet } = require('./sq-pinterest-v3/src/lib/user')
const { pinsSelf, pinGet } = require('./sq-pinterest-v3/src/lib/pins')
const { boardsSelf } = require('./sq-pinterest-v3/src/lib/boards')
const got = require('./sq-pinterest-v3/src/utils/sq-got')

module.exports = {
  sqMediaMapping: {
    mapInstagramMedia,
    mapYoutubeMedia,
    mapPinterestMedia,
    mapFeatureMedia,
    mapTwitterMedia,
    mapStoryMedia,
    mapFacebookMedia,
    mapTiktokMedia
  },
  sqPinterest: {
    token,
    userSelf,
    userGet,
    pinsSelf,
    pinGet,
    boardsSelf,
    // boardGet,
    got
  }
}
