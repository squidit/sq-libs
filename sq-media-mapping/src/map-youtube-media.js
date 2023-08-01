const isArray = require('lodash/isArray')
const get = require('lodash/get')
const map = require('lodash/map')

function getLinks (description) {
  if (!description) return description
  const expression = '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^\\s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^\\s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^\\s]{2,}|www.[a-zA-Z0-9]+.[^\\s]{2,})'
  const rgx = new RegExp(expression, 'gmi')
  const links = []
  let result
  while ((result = rgx.exec(description)) !== null) {
    links.push(result[0])
  }

  return links
}

function isPub (text) {
  const rgxPub = new RegExp(`(publi|p u b l i|ad|ads|publicidade)(\\s+|$|\\.)`, 'gi')
  const isCaptionContainsAd = rgxPub.exec(text)
  return !!isCaptionContainsAd
}

function getMentions (text) {
  if (!text) return []
  const rgx = /(^|\s+@\w+)/g
  const results = text.match(rgx) || []
  return results.filter(v => v && typeof v === 'string').map(tag => tag.trim().replace('@', ''))
}

function parseIso8601Duration (iso8601Duration) {
  // tslint:disable-next-line
  const iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/
  const matches = iso8601Duration.match(iso8601DurationRegex) || []
  return {
    sign: matches[1] === undefined ? '+' : '-',
    years: parseInt(get(matches, '[2]', 0)),
    months: parseInt(get(matches, '[3]', 0)),
    weeks: parseInt(get(matches, '[4]', 0)),
    days: parseInt(get(matches, '[5]', 0)),
    hours: parseInt(get(matches, '[6]', 0)),
    minutes: parseInt(get(matches, '[7]', 0)),
    seconds: parseInt(get(matches, '[8]', 0))
  }
}

function mapYoutubeMediaToSquidMedia (youtubeMedia) {
  const mentionsTitle = getMentions(get(youtubeMedia, 'snippet.title', ''))
  const mentionsDescription = getMentions(get(youtubeMedia, 'snippet.description', ''))
  const criadoEm = new Date(get(youtubeMedia, 'snippet.publishedAt'))
  const durationMetrics = this.parseIso8601Duration(youtubeMedia.contentDetails.duration)
  if(durationMetrics.minutes >= 2 || (durationMetrics.minutes >= 1 && durationMetrics.seconds >= 10)) {
    typeOfMidia = 'video'
  } else {
      typeOfMidia = 'shorts'
  }
  const videoInfo = youtubeMedia.player.embedHtml.split('"')
  const widthVideo = Number(videoInfo[1])
  const heightVideo = Number(videoInfo[3])
  const urlVideo = `https:${(videoInfo[5])}`

  return {
    obtidoEm: new Date(),
    origem: 'youtube',
    uid: get(youtubeMedia, 'id'),
    tags: get(youtubeMedia, 'snippet.tags', []),
    link: `https://www.youtube.com/watch?v=${get(youtubeMedia, 'id')}`,
    tipo: typeOfMidia,
    upvotes: parseInt(get(youtubeMedia, 'statistics.likeCount', 0), 10),
    comentarios: parseInt(get(youtubeMedia, 'statistics.commentCount', 0), 10),
    criadoEm,
    lastUpdate: criadoEm,
    links: getLinks(get(youtubeMedia, 'snippet.description', '')),
    legenda: get(youtubeMedia, 'snippet.title', ''),
    ad: isPub(get(youtubeMedia, 'snippet.title', '')) || isPub(get(youtubeMedia, 'snippet.description', '')),
    mentions: mentionsTitle.concat(mentionsDescription),
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
    videos: {
      resolucaoPadrao: {
        url: urlVideo,
        width: widthVideo,
        height: heightVideo
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
      duration: parseIso8601Duration(get(youtubeMedia, 'contentDetails.duration', '')),
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
