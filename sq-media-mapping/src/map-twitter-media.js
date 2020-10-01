const isArray = require('lodash/isArray')
const get = require('lodash/get')

function getCenter (arr) {
  return arr.reduce((x, y) => ([x[0] + (y[0] / arr.length), (x[1] + (y[1] / arr.length))]), [0, 0])
}

function mapTwitterMediaToSquidMedia (data) {
  const media = {
    ...get(data, 'entities.medias[0]',{}),
    url: get(data, 'entities.medias[0].expandaded_url', null),
    type: media.mediaType
  }
  const url = data.extended_entities.media[0].media_url_https

  const mappedMedia = {
    uid: data.id_str,
    tags: data.entities.hashtags.map(tag => (tag.text)),
    link: media.url,
    tipo: media.type,
    upvotes: data.favorite_count,
    origem: 'twitter',
    comentarios: 0,
    legenda: data.text,
    criadoEm: new Date(data.created_at),
    obtidoEm: new Date(),
    imagens: {
      resolucaoPadrao: {
        url: `${url}:large`,
        width: media.sizes.large.w,
        height: media.sizes.large.h
      },
      resolucaoMedia: {
        url: `${url}:small`,
        width: media.sizes.small.w,
        height: media.sizes.small.h
      },
      thumbnail: {
        url: `${url}:thumb`,
        width: media.sizes.thumb.w,
        height: media.sizes.thumb.h
      }
    },
    metadados: {
      ...data.metrics,
      polls: data.polls,
      retweet_count: data.retweet_count,
      in_reply_to_status_id_str: data.in_reply_to_status_id_str,
      source: data.source,
      user: {
        followers_count: data.user.followers_count,
        friends_count: data.user.friends_count,
        created_at: data.user.created_at,
        url: data.user.url
      }
    },
    usuario: {
      id: `twitter|${data.user.id_str}`,
      username: data.user.screen_name,
      foto: data.user.profile_image_url_https,
      nome: data.user.name
    }
  }

  if (data.place) {
    const longitude = data.coordinates ? data.coordinates.coordinates[0] : getCenter(data.place.bounding_box.coordinates[0])[0]
    const latitude = data.coordinates ? data.coordinates.coordinates[1] : getCenter(data.place.bounding_box.coordinates[0])[1]

    mappedMedia.localizacao = {
      id: data.place.id,
      nome: data.place.name,
      longitude,
      latitude
    }

    mappedMedia.point = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  }

  if (mappedMedia.tipo === 'video') {
    const video = get(media, 'extended_entities.media[0]')
    const sizesOrdered = video.video_info.variants.sort(v => v.bitrate).filter(v => (v.bitrate || v.bitrate === 0))
    mappedMedia.videos = {
      resolucaoPadrao: {
        url: sizesOrdered[0].url,
        width: 640,
        height: 640
      },
      resolucaoMedia: {
        url: sizesOrdered.length > 1 ? sizesOrdered[1].url : sizesOrdered[0].url,
        width: 480,
        height: 480
      }
    }
  }

  return mappedMedia
}

module.exports = function mapYoutubeMedia (medias) {
  return isArray(medias)
    ? medias.map(mapTwitterMediaToSquidMedia)
    : mapTwitterMediaToSquidMedia(medias)
}
