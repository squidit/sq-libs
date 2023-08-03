const isArray = require('lodash/isArray')
const get = require('lodash/get')
const moment = require('moment')

function getCenter (arr) {
  return arr.reduce((x, y) => ([x[0] + (y[0] / arr.length), (x[1] + (y[1] / arr.length))]), [0, 0])
}

function getMediaType (tweet) {
  /**
   * Quando faz um tweet com uma media anexada, ele possui essa prop,
   * segundo o proprio twitter (https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/overview/extended-entities-object)
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
  const idTweet = get(data, 'id_str', '')
  return `https://twitter.com/${username}/status/${idTweet}`
}

function isPub (tags) {
  if (!tags || tags.legenth === 0) return false
  const isAnyAdPost = tags.filter(tag => {
    return tag.indexOf('ad') > -1 || tag.indexOf('pub') > -1
  }).length > 0
  return isAnyAdPost
}

function mapTwitterMediaToSquidMedia (data) {
  const media = {
    ...get(data, 'extended_entities.media[0]', {}),
    url: get(data, 'extended_entities.media[0].expandaded_url', ''),
    type: getMediaType(data)
  }
  const url = get(data, 'extended_entities.media[0]', { media_url_https: '' }).media_url_https
  let typeTweet = data.retweeted ? 'retweet' : 'tweet'
  if (data.retweeted) {
    if (data.is_quote_status) typeTweet = 'quoted_retweet'
    else typeTweet = 'retweet'
  } else {
    if (data.is_quote_status) typeTweet = 'quoted_tweet'
    else typeTweet = 'tweet'
  }
  const criadoEm = new Date(data.created_at)
  const mappedMedia = {
    uid: data.id_str,
    tags: data.entities.hashtags.map(tag => (tag.text)),
    mentions: data.entities.user_mentions.map(user => user.screen_name),
    link: getLink(data),
    ad: isPub(data.entities.hashtags.map(tag => (tag.text))),
    tipo: media.type,
    origem: 'twitter',
    upvotes: data.favorite_count,
    comentarios: get(data, 'metrics.reply_count', 0),
    legenda: data.text,
    criadoEm,
    lastUpdate: moment().toISOString(),
    obtidoEm: new Date(),
    metadados: {
      in_reply_to_status_id_str: get(data, 'metrics.in_reply_to_status_id_str', null) || data.in_reply_to_status_id_str,
      source: get(data, 'metrics.source', null) || data.source,
      type_tweet: typeTweet,
      impressions: get(data, 'metrics.impression_count', 0),
      likes: get(data, 'metrics.favorite_count', 0) || get(data, 'favorite_count', 0),
      replies: get(data, 'metrics.reply_count', 0),
      video_views: get(data, 'metrics.video_views', 0) || get(data, 'metrics.mediaMetrics[0].organic_metrics.view_count', 0) || get(data, 'metrics.mediaMetrics[0].public_metrics.view_count', 0),
      user_profile_clicks: get(data, 'metrics.user_profile_clicks', 0) || get(data, 'user_profile_clicks', 0),
      url_clicks: get(data, 'metrics.url_clicks', 0) || get(data, 'metrics.url_link_clicks', 0),
      tax_engagement: get(data, 'metrics.engagement', 0),
      polls: data.polls || [],
      retweets: get(data, 'retweet_count', 0),
      conversation_id: get(data, 'conversation_id', null),
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
