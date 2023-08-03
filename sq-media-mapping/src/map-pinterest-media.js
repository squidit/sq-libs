const isArray = require('lodash/isArray')
const get = require('lodash/get')
const map = require('lodash/map')
const moment = require('moment')

function mapPinterestMediaToSquidMedia (pinterestMedia) {
  const media = {
    obtidoEm: new Date(),
    origem: 'pinterest',
    uid: get(pinterestMedia, 'id'),
    link: `https://pinterest.com/pin/${get(pinterestMedia, 'id')}`,
    tipo: get(pinterestMedia, 'is_video') ? 'video' : 'imagem',
    comentarios: get(pinterestMedia, 'comment_count', 0),
    criadoEm: new Date(get(pinterestMedia, 'created_at')),
    lastUpdate: moment().toISOString(),
    legenda: get(pinterestMedia, 'description', ''),
    usuario: {
      id: get(pinterestMedia, 'user.id'),
      username: get(pinterestMedia, 'user.username', ''),
      foto: get(pinterestMedia, 'user.image_large_url', 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xtp1/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'),
      nome: `${get(pinterestMedia, 'user.first_name', get(pinterestMedia, 'user.username', ''))} ${get(pinterestMedia, 'user.last_name', '')}`
    },
    imagens: {
      resolucaoPadrao: {
        url: get(pinterestMedia, 'image_large_url', ''),
        width: get(pinterestMedia, 'image_large_size_pixels.width', 640),
        height: get(pinterestMedia, 'image_large_size_pixels.height', 640)
      },
      resolucaoMedia: {
        url: get(pinterestMedia, 'image_medium_url', ''),
        width: get(pinterestMedia, 'image_medium_size_pixels.width', 320),
        height: get(pinterestMedia, 'image_medium_size_pixels.height', 320)
      },
      thumbnail: {
        url: get(pinterestMedia, 'image_square_url', ''),
        width: get(pinterestMedia, 'image_square_size_pixels.width', 150),
        height: get(pinterestMedia, 'image_square_size_pixels.height', 150)
      }
    },
    metadados: {
      externalLink: get(pinterestMedia, 'link'),
      board: {
        id: get(pinterestMedia, 'pinned_to_board.id'),
        categoria: get(pinterestMedia, 'pinned_to_board.category'),
        url: decodeURI(get(pinterestMedia, 'pinned_to_board.url')),
        nome: get(pinterestMedia, 'pinned_to_board.name')
      },
      attribution: {
        authorName: get(pinterestMedia, 'attribution.author_name'),
        authorUrl: get(pinterestMedia, 'attribution.author_url'),
        provider: get(pinterestMedia, 'attribution.provider_name'),
        providerIcon: get(pinterestMedia, 'attribution.provider_icon_url'),
        title: get(pinterestMedia, 'attribution.title')
      },
      statistics: {
        '30d': {
          save: get(pinterestMedia, 'influencer_pin_stats.30d.save', 0),
          closeup: get(pinterestMedia, 'influencer_pin_stats.30d.closeup', 0),
          impression: get(pinterestMedia, 'influencer_pin_stats.30d.impression', 0),
          clickthrough: get(pinterestMedia, 'influencer_pin_stats.30d.clickthrough', 0),
          updatedAt: new Date(get(pinterestMedia, 'influencer_pin_stats.30d.last_updated', 0))
        },
        '7d': {
          save: get(pinterestMedia, 'influencer_pin_stats.7d.save', 0),
          closeup: get(pinterestMedia, 'influencer_pin_stats.7d.closeup', 0),
          impression: get(pinterestMedia, 'influencer_pin_stats.7d.impression', 0),
          clickthrough: get(pinterestMedia, 'influencer_pin_stats.7d.clickthrough', 0),
          updatedAt: new Date(get(pinterestMedia, 'influencer_pin_stats.7d.last_updated', 0))
        },
        '24h': {
          save: get(pinterestMedia, 'influencer_pin_stats.24h.save', 0),
          closeup: get(pinterestMedia, 'influencer_pin_stats.24h.closeup', 0),
          impression: get(pinterestMedia, 'influencer_pin_stats.24h.impression', 0),
          clickthrough: get(pinterestMedia, 'influencer_pin_stats.24h.clickthrough', 0),
          updatedAt: new Date(get(pinterestMedia, 'influencer_pin_stats.24h.last_updated', 0))
        }
      }
    }
  }

  if (pinterestMedia.is_video && pinterestMedia.attribution) {
    media.metadados.player = {
      embedUrl: get(pinterestMedia, 'attribution.embed_url')
    }
  }

  return media
}

module.exports = function mapPinterestMedia (pinterestMedias) {
  return isArray(pinterestMedias)
    ? map(pinterestMedias, mapPinterestMediaToSquidMedia)
    : mapPinterestMediaToSquidMedia(pinterestMedias)
}
