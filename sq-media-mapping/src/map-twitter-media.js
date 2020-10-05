const isArray = require('lodash/isArray')
const get = require('lodash/get')

function getCenter (arr) {
  return arr.reduce((x, y) => ([x[0] + (y[0] / arr.length), (x[1] + (y[1] / arr.length))]), [0, 0])
}

function getMediaType (tweet) {
  /**
   * Quando faz um tweet com uma media anexada, ele possui essa prop,
   * segundo o proprio twitter (https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/overview/extended-entities-object)
   * 
   */
  if (tweet.mediaType) return tweet.mediaType
  if (tweet.extended_entities && tweet.extended_entities.media && tweet.extended_entities.media.length > 0) { 
    const isAnyOfMediaIsVideo = tweet.extended_entities.media.filter(media => media.type.includes('video')).length > 0
    if (isAnyOfMediaIsVideo) return 'video'

    const firstMedia = tweet.extended_entities.media[0]
    return firstMedia.type.includes('gif') || firstMedia.type.includes('photo') ? 'imagem' : firstMedia.type
  } else if (tweet.polls && tweet.polls.length > 0) { //  Para tweet que possui url no link
    return 'votacao'
  } else {
    return 'texto'
  }
}

function getLink (data) {
  const username = get(data, 'user.screen_name', '')
  const idTweet  = get(data, 'id_str', '')
  return `https://twitter.com/${username}/status/${idTweet}`
}

function mapTwitterMediaToSquidMedia (data) {
  const media = {
    ...get(data, 'extended_entities.media[0]',{}),
    url: get(data, 'extended_entities.media[0].expandaded_url', ''),
    type: getMediaType(data)
  }
  const url = get(data, 'extended_entities.media[0]',{ media_url_https: '' }).media_url_https

  const mappedMedia = {
    uid: data.id_str,
    tags: data.entities.hashtags.map(tag => (tag.text)),
    link: getLink(data),
    tipo: media.type,
    upvotes: data.favorite_count,
    origem: 'twitter',
    comentarios: get(data, 'metrics.reply_count', null),
    legenda: data.text,
    criadoEm: new Date(data.created_at),
    obtidoEm: new Date(),
    metadados: {
      in_reply_to_status_id_str: get(data, 'metrics.in_reply_to_status_id_str', null),
      source: get(data, 'metrics.source', null), 
      impressions: get(data, 'metrics.impression_count', 0),
      likes: get(data, 'metrics.favorite_count', 0),
      replies: get(data, 'metrics.reply_count', 0),
      tax_engagement: get(data, 'metrics.engagement', 0),
      polls: data.polls || [],
      retweets: data.retweet_count,
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
  if (['imagem', 'video'].includes(mappedMedia.tipo)) {
    mappedMedia.imagens = {
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
    const video = get(data, 'extended_entities.media[0]')
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

module.exports = function mapTweetMedia (medias) {
  return isArray(medias)
    ? medias.map(mapTwitterMediaToSquidMedia)
    : mapTwitterMediaToSquidMedia(medias)
}
