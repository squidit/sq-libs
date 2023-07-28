const isArray = require('lodash/isArray')
const get = require('lodash/get')
const map = require('lodash/map')
const moment = require('moment')

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

async function mapScrapperTiktokMediaToSquidMedia (tiktokMedia) {
  const mentionsTitle = getMentions(get(tiktokMedia, 'desc', ''))
  const mentionsDescription = getMentions(get(tiktokMedia, 'desc', ''))

  const criadoEm = moment.unix(get(tiktokMedia, 'createTime')).toISOString()
  return {
    obtidoEm: new Date(),
    origem: 'tiktok',
    uid: get(tiktokMedia, 'id'),
    link: get(tiktokMedia, 'video.downloadAddr'),
    tipo: 'video',
    upvotes: parseInt(get(tiktokMedia, 'stats.diggCount', 0), 10),
    comentarios: parseInt(get(tiktokMedia, 'stats.commentCount', 0), 10),
    criadoEm,
    lastUpdate: criadoEm,
    links: getLinks(get(tiktokMedia, 'desc', '')),
    legenda: get(tiktokMedia, 'desc', ''),
    ad: isPub(get(tiktokMedia, 'desc', '')),
    mentions: mentionsTitle.concat(mentionsDescription),
    imagens: {
      resolucaoPadrao: {
        url: get(tiktokMedia, 'video.cover', ''),
        width: get(tiktokMedia, 'video.width', 540),
        height: get(tiktokMedia, 'video.height', 480)
      }
    },
    videos: {
      resolucaoPadrao: {
        url: get(tiktokMedia, 'video.downloadAddr', ''),
        width: get(tiktokMedia, 'video.width', 540),
        height: get(tiktokMedia, 'video.height', 480)
      }
    },
    metadados: {
      statistics: {
        viewCount: parseInt(get(tiktokMedia, 'stats.playCount', 0), 10),
        likeCount: parseInt(get(tiktokMedia, 'stats.diggCount', 0), 10),
        commentCount: parseInt(get(tiktokMedia, 'stats.commentCount', 0), 10),
        shares: parseInt(get(tiktokMedia, 'stats.shareCount', 0), 10),
        reach: get(tiktokMedia, 'reachCount', 0),
      },
      engagementRate: parseInt(get(tiktokMedia, 'stats.engagementRate', 0), 10),
      description: get(tiktokMedia, 'desc'),
      duration: (get(tiktokMedia, 'video.duration', 0), 10),
      width: parseInt(get(tiktokMedia, 'video.width', 0), 10),
      height: parseInt(get(tiktokMedia, 'video.height', 0), 10),
      player: get(tiktokMedia, 'video.downloadAddr')
    },
    usuario: get(tiktokMedia, 'usuario')
  }
}

module.exports = function mapScrapperTiktokMedia (medias) {
  return isArray(medias)
    ? map(medias, mapScrapperTiktokMediaToSquidMedia)
    : mapScrapperTiktokMediaToSquidMedia(medias)
}
