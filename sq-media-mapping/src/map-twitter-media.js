const isArray = require('lodash/isArray')
const get = require('lodash/get')

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
  const username = get(data, 'metadata.username', '')
  const idTweet = get(data, 'id', '')
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
  const media = data.medias[0]
  let typeTweet = 'tweet'
  if (data.referenced_tweets && data.referenced_tweets.length > 0) {
    typeTweet = data.referenced_tweets[0].type
  }
  const criadoEm = new Date(data.created_at)
  const mappedMedia = {
    uid: data.id,
    tags: data?.hashtags?.map(tag => (tag.tag)),
    mentions: data?.mentions?.map(user => user.tag) ?? [],
    link: getLink(data),
    ad: isPub(data?.hashtags?.map(tag => (tag.tag)) ?? false),
    tipo: data.mediaType,
    origem: 'twitter',
    upvotes: get(data, 'metrics.like_count', null),
    comentarios: get(data, 'metrics.reply_count', null),
    legenda: data.text,
    criadoEm,
    lastUpdate: new Date(),
    obtidoEm: new Date(),
    metadados: {
      in_reply_to_status_id_str: get(data, 'referenced_tweets[0].id', null),
      type_tweet: typeTweet,
      impressions: get(data, 'metrics.impression_count', null),
      likes: get(data, 'metrics.like_count', null),
      replies: get(data, 'metrics.reply_count', null),
      user_profile_clicks: get(data, 'metrics.user_profile_clicks', null),
      tax_engagement: get(data, 'metrics.engagement', null),
      polls: data.polls || [],
      retweets: get(data, 'metrics.retweet_count', null),
      conversation_id: get(data, 'conversation_id', null)
    },
    usuario: {
      id: `twitter|${data.user.id}`,
      username: data.user.username,
    }
  }
  if (['imagem', 'video'].includes(mappedMedia.tipo)) {
    mappedMedia.imagens = {
      resolucaoPadrao: {
        url: `${media.preview_image_url}:large`,
        width: 1920,
        height: 1080
      },
      resolucaoMedia: {
        url: `${media.preview_image_url}:small`,
        width: 680,
        height: 380
      },
      thumbnail: {
        url: `${media.preview_image_url}:thumb`,
        width: 150,
        height: 150
      }
    }
  }

  if (mappedMedia.tipo === 'video') {
    const sizesOrdered = media.variants.sort(v => v.bit_rate).filter(v => (v.bit_rate || v.bit_rate === 0))
    mappedMedia.videos = {
      resolucaoPadrao: {
        url: sizesOrdered[0].url,
        width: 1280,
        height: 720
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
