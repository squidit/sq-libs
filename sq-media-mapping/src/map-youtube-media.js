const isArray = require('lodash/isArray')
const get = require('lodash/get')
const map = require('lodash/map')

function mapYoutubeMediaToSquidMedia (youtubeMedia) {
  return {
    obtidoEm: new Date(),
    origem: 'youtube',
    uid: get(youtubeMedia, 'id'),
    tags: get(youtubeMedia, 'snippet.tags', []),
    link: `https://www.youtube.com/watch?v=${get(youtubeMedia, 'id')}`,
    tipo: 'video',
    upvotes: parseInt(get(youtubeMedia, 'statistics.likeCount', 0), 10),
    comentarios: parseInt(get(youtubeMedia, 'statistics.commentCount', 0), 10),
    criadoEm: new Date(get(youtubeMedia, 'snippet.publishedAt')),
    legenda: get(youtubeMedia, 'snippet.title', ''),
    imagens: {
      resolucaoPadrao: {
        url: get(youtubeMedia, 'snippet.thumbnails.high.url'),
        width: get(youtubeMedia, 'snippet.thumbnails.high.width', 480),
        height: get(youtubeMedia, 'snippet.thumbnails.high.height', 360)
      },
      resolucaoMedia: {
        url: get(youtubeMedia, 'snippet.thumbnails.medium.url'),
        width: get(youtubeMedia, 'snippet.thumbnails.medium.width', 320),
        height: get(youtubeMedia, 'snippet.thumbnails.medium.height', 180)
      },
      thumbnail: {
        url: get(youtubeMedia, 'snippet.thumbnails.default.url'),
        width: get(youtubeMedia, 'snippet.thumbnails.default.width', 120),
        height: get(youtubeMedia, 'snippet.thumbnails.default.height', 90)
      }
    },
    usuario: {
      id: get(youtubeMedia, 'snippet.channelId'),
      username: get(youtubeMedia, 'snippet.channelTitle'),
      foto: `https://storage.googleapis.com/squid-profile-pictures/${get(youtubeMedia, 'snippet.channelId')}.jpg`
    },
    metadados: {
      statistics: {
        viewCount: parseInt(get(youtubeMedia, 'statistics.viewCount', 0), 10),
        likeCount: parseInt(get(youtubeMedia, 'statistics.likeCount', 0), 10),
        dislikeCount: parseInt(get(youtubeMedia, 'statistics.dislikeCount', 0), 10),
        favoriteCount: parseInt(get(youtubeMedia, 'statistics.favoriteCount', 0), 10),
        commentCount: parseInt(get(youtubeMedia, 'statistics.commentCount', 0), 10)
      },
      description: get(youtubeMedia, 'snippet.description'),
      contentDetails: get(youtubeMedia, 'contentDetails'),
      player: get(youtubeMedia, 'player'),
      statusPrivacidade: get(youtubeMedia, 'status.privacyStatus'),
      idCategoria: parseInt(get(youtubeMedia, 'snippet.categoryId'))
    }
  }
}

module.exports = function mapYoutubeMedia (medias) {
  return isArray(medias)
    ? map(medias, mapYoutubeMediaToSquidMedia)
    : mapYoutubeMediaToSquidMedia(medias)
}
