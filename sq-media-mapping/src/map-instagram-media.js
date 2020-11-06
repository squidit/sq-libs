const get = require('lodash/get')


function getTags (caption) {
  const rgx = /(#\w+)/g
  const haveTags = caption ? caption.match(rgx) : ''
  if (!haveTags) return []
  return haveTags.filter(v => typeof v === 'string')

}

function getMentions (caption) {
  const rgx = /(@\w+)/g
  const haveMentions = caption ? caption.match(rgx) : ''
  if (!haveMentions) return []
  return haveMentions.filter(v => typeof v === 'string')
}

function isPub (caption) {
  const tags = getTags(caption)
  const isAnyAdPost = tags.filter(tag => {
    return tag.indexOf('#ad') > -1 || tag.indexOf('#pub') > -1
  }).length > 0
  return isAnyAdPost
}

function mapInstagramMediaToSquidMedia (instagramMedia) {
  const mediaTypes = {
    image: 'imagem',
    video: 'video',
    carousel: 'carousel'
  }

  const mediaLocation = (!instagramMedia.location) ? null : {
    id: get(instagramMedia, 'location.id', 0).toString(),
    nome: get(instagramMedia, 'location.name', ''),
    latitude: get(instagramMedia, 'location.latitude', 0),
    longitude: get(instagramMedia, 'location.longitude', 0)
  }

  const media = {
    obtidoEm: new Date(),
    origem: 'instagram',
    uid: get(instagramMedia, 'id'),
    tags: getTags(get(instagramMedia, 'caption.text', '')),
    mentions: getMentions(get(instagramMedia, 'caption.text', '')),
    pub: isPub(get(instagramMedia, 'caption.text', '')),
    link: get(instagramMedia, 'link'),
    tipo: mediaTypes[get(instagramMedia, 'type')] || 'video',
    upvotes: get(instagramMedia, 'likes.count', 0),
    comentarios: get(instagramMedia, 'comments.count', 0),
    criadoEm: new Date(parseInt(get(instagramMedia, 'created_time'), 10) * 1000),
    legenda: get(instagramMedia, 'caption.text', ''),
    usuario: {
      id: `instagram|${get(instagramMedia, 'user.id', get(instagramMedia, 'id').split('_')[1])}`,
      username: get(instagramMedia, 'user.username', ''),
      foto: get(instagramMedia, 'user.profile_picture', 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xtp1/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'),
      nome: get(instagramMedia, 'user.full_name', get(instagramMedia, 'user.username', ''))
    },
    localizacao: mediaLocation,
    imagens: {
      resolucaoPadrao: {
        url: get(instagramMedia, 'images.standard_resolution.url', ''),
        width: get(instagramMedia, 'images.standard_resolution.width', 640),
        height: get(instagramMedia, 'images.standard_resolution.height', 640)
      },
      resolucaoMedia: {
        url: get(instagramMedia, 'images.low_resolution.url', ''),
        width: get(instagramMedia, 'images.low_resolution.width', 320),
        height: get(instagramMedia, 'images.low_resolution.height', 320)
      },
      thumbnail: {
        url: get(instagramMedia, 'images.thumbnail.url', ''),
        width: get(instagramMedia, 'images.thumbnail.width', 150),
        height: get(instagramMedia, 'images.thumbnail.height', 150)
      }
    },
    metadados: {
      filter: get(instagramMedia, 'filter', ''),
      users_in_photo: get(instagramMedia, 'users_in_photo', []),
      productType: get(instagramMedia, 'product_type')
    }
  }

  if (instagramMedia.type === 'video' && instagramMedia.hasOwnProperty('videos')) {
    media.videos = {
      resolucaoPadrao: {
        url: get(instagramMedia, 'videos.standard_resolution.url', ''),
        width: get(instagramMedia, 'videos.standard_resolution.width', 640),
        height: get(instagramMedia, 'videos.standard_resolution.height', 640)
      },
      resolucaoMedia: {
        url: get(instagramMedia, 'videos.low_bandwidth.url', ''),
        width: get(instagramMedia, 'videos.low_bandwidth.width', 480),
        height: get(instagramMedia, 'videos.low_bandwidth.height', 480)
      }
    }
  } else if (instagramMedia.type === 'carousel' && instagramMedia.hasOwnProperty('carousel_media')) {
    media.carousel = instagramMedia.carousel_media.map((c) => {
      const carouselType = mediaTypes[c.type]
      let url
      if (carouselType === 'imagem') {
        url = c.images.standard_resolution.url
      } else {
        url = c.videos.standard_resolution.url
      }
      return { tipo: carouselType, url }
    })
  }

  if (media.localizacao) {
    media.point = {
      type: 'Point',
      coordinates: [
        media.localizacao.longitude,
        media.localizacao.latitude
      ]
    }
  }

  return media
}

module.exports = function mapInstagramMedia (instagramMedias) {
  return instagramMedias.map(mi => mapInstagramMediaToSquidMedia(mi))
}
