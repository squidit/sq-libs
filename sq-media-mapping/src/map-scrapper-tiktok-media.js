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
  const mentionsTitle = getMentions(get(tiktokMedia, 'text', ''))
  const mentionsDescription = getMentions(get(tiktokMedia, 'text', ''))

  const criadoEm = moment.unix(get(tiktokMedia, 'createTime')).toISOString()
  return {
    obtidoEm: new Date(),
    origem: 'tiktok',
    uid: get(tiktokMedia, 'id'),
    link: get(tiktokMedia, 'videoUrl'),
    tipo: 'video',
    upvotes: parseInt(get(tiktokMedia, 'diggCount', 0), 10),
    comentarios: parseInt(get(tiktokMedia, 'commentCount', 0), 10),
    criadoEm,
    links: getLinks(get(tiktokMedia, 'text', '')),
    legenda: get(tiktokMedia, 'text', ''),
    ad: isPub(get(tiktokMedia, 'text', '')),
    mentions: mentionsTitle.concat(mentionsDescription),
    imagens: {
      resolucaoPadrao: {
        url: get(tiktokMedia, 'imageUrl', ''),
        width: get(tiktokMedia, 'videoMeta.width', 540),
        height: get(tiktokMedia, 'videoMeta.height', 480)
      }
    },
    videos: {
      resolucaoPadrao: {
        url: get(tiktokMedia, 'videoUrl', ''),
        width: get(tiktokMedia, 'videoMeta.width', 540),
        height: get(tiktokMedia, 'videoMeta.height', 480)
      }
    },
    metadados: {
      statistics: {
        viewCount: parseInt(get(tiktokMedia, 'viewCount', 0), 10),
        likeCount: parseInt(get(tiktokMedia, 'diggCount', 0), 10),
        commentCount: parseInt(get(tiktokMedia, 'commentCount', 0), 10),
        shares: parseInt(get(tiktokMedia, 'shareCount', 0), 10)
      },
      description: get(tiktokMedia, 'text'),
      duration: (get(tiktokMedia, 'videoMeta.duration', 0), 10),
      width: parseInt(get(tiktokMedia, 'videoMeta.width', 0), 10),
      height: parseInt(get(tiktokMedia, 'videoMeta.height', 0), 10),
      player: get(tiktokMedia, 'videoUrl')
    },
    usuario: get(tiktokMedia, 'usuario')
  }
}

module.exports = function mapScrapperTiktokMedia (medias) {
  return isArray(medias)
    ? map(medias, mapScrapperTiktokMediaToSquidMedia)
    : mapScrapperTiktokMediaToSquidMedia(medias)
}
