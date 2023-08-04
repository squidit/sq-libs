const { get, isArray, uniq } = require('lodash')

function getTags (caption) {
  if (!caption) return []
  const rgx = /(#\w+)/gim
  const results = caption.match(rgx) || []
  return results.filter(v => typeof v === 'string').map(tag => tag.trim().replace('#', ''))
}

function getMentions (caption) {
  if (!caption) return []
  const rgx = new RegExp('@[A-z|.|\\w+]+', 'g')
  const results = caption.match(rgx) || []
  const mentions = results.filter(v => v && typeof v === 'string').map(mention => mention.trim().replace('@', ''))
  return uniq(mentions)
}

function isPub (caption) {
  const rgxPub = new RegExp(`(publi|p u b l i|ad|ads|publicidade)(\\s+|$|\\.)`, 'gi')
  const isCaptionContainsAd = rgxPub.exec(caption)
  return !!isCaptionContainsAd
}

function getCaption (fbMedia) {
  const captionText = get(fbMedia, 'caption.text', null)
  if (captionText !== null && captionText !== undefined) return captionText
  return get(fbMedia, 'caption', '')
}

function getUser (fbMedia, idProfile) {
  const {owner} = fbMedia
  if (owner) {
    let fieldIdUser = 'id'
    if (idProfile === `${get(fbMedia, 'owner.ig_id')}`) {
      fieldIdUser = 'ig_id'
    }
    return {
      id: `instagram|${get(fbMedia, `owner.${fieldIdUser}`)}`,
      username: get(fbMedia, 'owner.username', ''),
      foto: get(fbMedia, 'owner.profile_picture_url', 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xtp1/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'),
      nome: get(fbMedia, 'owner.name', '')
    }
  } else {
    return {
      id: `instagram|${get(fbMedia, 'user.id')}`,
      username: get(fbMedia, 'user.username', ''),
      foto: get(fbMedia, 'user.profile_picture_url', 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xtp1/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'),
      nome: get(fbMedia, 'user.full_name', '')
    }
  }
}

function mapFacebookMediaToSquidMedia (fbMedia, idProfile) {
  const mediaTypes = {
    IMAGE: 'imagem',
    VIDEO: 'video',
    CAROUSEL_ALBUM: 'carousel',
    CAROUSEL: 'carousel'
  }

  const caption = getCaption(fbMedia)
  const mediaType = get(fbMedia, 'media_type') || get(fbMedia, 'type')
  const criadoEm = new Date(get(fbMedia, 'timestamp') || (get(fbMedia, 'created_time', 0) * 1000) || new Date())
  const media = {
    obtidoEm: new Date(),
    origem: 'instagram',
    uid: get(fbMedia, 'id'),
    link: get(fbMedia, 'permalink') || get(fbMedia, 'link'),
    tipo: (mediaTypes[mediaType.toUpperCase()] || 'imagem'),
    upvotes: get(fbMedia, 'like_count', 0) || get(fbMedia, 'likes.count', 0),
    comentarios: get(fbMedia, 'comments_count', 0) || get(fbMedia, 'comments.count', 0),
    criadoEm,
    lastUpdate: new Date(),
    legenda: caption,
    tags: getTags(caption),
    mentions: getMentions(caption),
    ad: isPub(caption),
    usuario: getUser(fbMedia, idProfile),
    metadados: get(fbMedia, 'metadata', {
      idFacebook: get(fbMedia, 'id'),
      productType: get(fbMedia, 'media_product_type', '').toLowerCase()
    })
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

module.exports = function mapFacebookMedia (fbMedia, idProfile = null) {
  return isArray(fbMedia)
    ? fbMedia.map(m => mapFacebookMediaToSquidMedia(m, idProfile))
    : mapFacebookMediaToSquidMedia(fbMedia, idProfile)
}
