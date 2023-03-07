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

function mapTiktokMediaToSquidMedia (tiktokMedia) {
  const mentionsTitle = getMentions(get(tiktokMedia, 'title', ''))
  const mentionsDescription = getMentions(get(tiktokMedia, 'video_description', ''))
  const criadoEm = moment.unix(get(tiktokMedia, 'create_time')).utc().toISOString()
  const sparkAdsEndDate = moment(get(tiktokMedia, 'sparkAdsEndDate', null)).toISOString()
  return {
    obtidoEm: new Date(),
    origem: 'tiktok',
    uid: get(tiktokMedia, 'id'),
    link: get(tiktokMedia, 'embed_link'),
    tipo: 'video',
    upvotes: parseInt(get(tiktokMedia, 'like_count', null), 10),
    comentarios: parseInt(get(tiktokMedia, 'comment_count', null), 10),
    criadoEm,
    links: getLinks(get(tiktokMedia, 'video_description', '')),
    legenda: get(tiktokMedia, 'title', ''),
    ad: isPub(get(tiktokMedia, 'title', '')) || isPub(get(tiktokMedia, 'video_description', '')),
    mentions: mentionsTitle.concat(mentionsDescription),
    imagens: {
      resolucaoPadrao: {
        url: get(tiktokMedia, 'cover_image_url', ''),
        width: get(tiktokMedia, 'width', 540),
        height: get(tiktokMedia, 'height', 480)
      }
    },
    metadados: {
      statistics: {
        viewCount: parseInt(get(tiktokMedia, 'view_count', null), 10),
        likeCount: parseInt(get(tiktokMedia, 'like_count', null), 10),
        commentCount: parseInt(get(tiktokMedia, 'comment_count', null), 10),
        shares: parseInt(get(tiktokMedia, 'share_count', null), 10),
        audienceByDevice: get(tiktokMedia, 'lifetime_device_distribution', []),
        audienceByGender: get(tiktokMedia, 'lifetime_gender_distribution', []),
        audienceByAge: get(tiktokMedia, 'lifetime_top_age_distribution', []),
        audienceByCountry: get(tiktokMedia, 'lifetime_top_country_distribution', []),
        reach: get(tiktokMedia, 'reach', null),
        videoCompletionRate: get(tiktokMedia, 'video_completion_rate', null),
        totalPlayTime: get(tiktokMedia, 'total_play_time', null),
        averageViewTime: get(tiktokMedia, 'average_view_time', null),
        twoSecondsViews: get(tiktokMedia, 'two_seconds_views', null),
        sixSecondsViews: get(tiktokMedia, 'six_seconds_views', null),
        dailyBreakdown: get(tiktokMedia, 'daily_breakdown', []),
        videoViewsBySource: get(tiktokMedia, 'video_views_by_source', {})
      },
      description: get(tiktokMedia, 'video_description'),
      duration: (get(tiktokMedia, 'duration', null), 10),
      width: parseInt(get(tiktokMedia, 'width', null), 10),
      height: parseInt(get(tiktokMedia, 'height', null), 10),
      player: get(tiktokMedia, 'embed_html')
    },
    sparkAdsAuthCode: get(tiktokMedia, 'sparkAdsAuthCode', null),
    sparkAdsEndDate,
    sparkAdsRequestStatus: get(tiktokMedia, 'sparkAdsRequestStatus', null),
    usuario: get(tiktokMedia, 'usuario')
  }
}

module.exports = function mapTiktokMedia (medias) {
  return isArray(medias)
    ? medias.map(mapTiktokMediaToSquidMedia)
    : mapTiktokMediaToSquidMedia(medias)
}
