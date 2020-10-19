const { get, isArray } = require('lodash')

function getTags (caption) {
  if (!caption) return []
  const rgx = /(#\w+)/g
  return caption.match(rgx).filter(v => typeof v === 'string').map(tag => tag.replace('#', ''))
}

function getMentions (caption) {
  if (!caption) return []
  const rgx = /(@\w+)/g
  return caption.match(rgx).filter(v => typeof v === 'string').map(tag => tag.replace('@', ''))
}

function isPub (caption) {
  const tags = getTags(caption)
  const isAnyAdPost = tags.filter(tag => {
    return tag.indexOf('ad') > -1 || tag.indexOf('pub') > -1
  }).length > 0
  return isAnyAdPost
}

function mapFacebookMediaToSquidMedia (fbMedia) {
  const mediaTypes = {
    IMAGE: 'imagem',
    VIDEO: 'video',
    CAROUSEL_ALBUM: 'carousel'
  }

  const media = {
    obtidoEm: new Date(),
    origem: 'instagram',
    uid: `${get(fbMedia, 'ig_id')}_${get(fbMedia, 'owner.ig_id')}`,
    link: get(fbMedia, 'permalink'),
    tipo: (mediaTypes[get(fbMedia, 'media_type')] || 'imagem'),
    upvotes: get(fbMedia, 'like_count', 0),
    comentarios: get(fbMedia, 'comments_count', 0),
    criadoEm: new Date(get(fbMedia, 'timestamp', new Date())),
    legenda: get(fbMedia, 'caption', ''),
    tags: getTags(get(fbMedia, 'caption', '')),
    mentions: getMentions(get(fbMedia, 'caption', '')),
    pub: isPub(get(fbMedia, 'caption', '')),
    usuario: {
      id: `instagram|${get(fbMedia, 'owner.ig_id')}`,
      username: get(fbMedia, 'owner.username', ''),
      foto: get(fbMedia, 'owner.profile_picture_url', 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xtp1/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'),
      nome: get(fbMedia, 'owner.name', '')
    },
    metadados: {
      idFacebook: get(fbMedia, 'id')
    }
  }

  if (media.tipo === 'video') {
    media.videos = {
      resolucaoPadrao: {
        url: get(fbMedia, 'media_url', ''),
        width: 640,
        height: 640
      },
      resolucaoMedia: {
        url: get(fbMedia, 'media_url', ''),
        width: 480,
        height: 480
      }
    }
    media.imagens = {
      resolucaoPadrao: {
        url: get(fbMedia, 'thumbnail_url', ''),
        width: 640,
        height: 640
      },
      resolucaoMedia: {
        url: get(fbMedia, 'thumbnail_url', ''),
        width: 320,
        height: 320
      },
      thumbnail: {
        url: get(fbMedia, 'thumbnail_url', ''),
        width: 150,
        height: 150
      }
    }
  } else {
    media.imagens = {
      resolucaoPadrao: {
        url: get(fbMedia, 'media_url', ''),
        width: 640,
        height: 640
      },
      resolucaoMedia: {
        url: get(fbMedia, 'media_url', ''),
        width: 320,
        height: 320
      },
      thumbnail: {
        url: get(fbMedia, 'media_url', ''),
        width: 150,
        height: 150
      }
    }

    if (media.tipo === 'carousel' && fbMedia.children && fbMedia.children.data) {
      media.carousel = fbMedia.children.data.map((c) => {
        return { tipo: mediaTypes[c.media_type], url: c.media_url }
      })
    }
  }

  return media
}

const getTagsInPhoto = (caption) => {
  return caption.split(' ')
    .filter(v => v.startsWith('#'))
    .map(v => v.slice(1).toLowerCase())
}

module.exports = function mapFacebookMedia (fbMedia) {
  return isArray(fbMedia)
    ? fbMedia.map(mapFacebookMediaToSquidMedia)
    : mapFacebookMediaToSquidMedia(fbMedia)
}
