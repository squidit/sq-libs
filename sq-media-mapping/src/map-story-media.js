const { get, isArray } = require('lodash')

function mapStoryMediaToSquidMedia (storyMedia) {
  const mediaTypes = {
    IMAGE: 'imagem',
    VIDEO: 'video'
  }

  const media = {
    obtidoEm: new Date(),
    origem: 'instagram',
    uid: get(storyMedia, 'id'),
    tags: [],
    link: get(storyMedia, 'permalink'),
    tipo: (mediaTypes[get(storyMedia, 'media_type')] || 'imagem') + '_stories',
    upvotes: get(storyMedia, 'likes_count', 0),
    comentarios: get(storyMedia, 'comments_count', 0),
    criadoEm: new Date(get(storyMedia, 'timestamp', new Date())),
    legenda: get(storyMedia, 'caption', ''),
    detection: get(storyMedia, 'detection', null),
    usuario: {
      id: `instagram|${get(storyMedia, 'user.ig_id')}`,
      username: get(storyMedia, 'user.username', ''),
      foto: get(storyMedia, 'user.profile_picture_url', 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xtp1/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'),
      nome: get(storyMedia, 'user.name', '')
    },
    metricsAvailable: get(storyMedia, 'metricsAvailable', '')
  }

  if (media.tipo === 'video_stories') {
    media.videos = {
      resolucaoPadrao: {
        url: get(storyMedia, 'media_url', ''),
        width: 640,
        height: 640
      },
      resolucaoMedia: {
        url: get(storyMedia, 'media_url', ''),
        width: 480,
        height: 480
      }
    }
    media.imagens = {
      resolucaoPadrao: {
        url: get(storyMedia, 'thumbnail_url', ''),
        width: 640,
        height: 640
      },
      resolucaoMedia: {
        url: get(storyMedia, 'thumbnail_url', ''),
        width: 320,
        height: 320
      },
      thumbnail: {
        url: get(storyMedia, 'thumbnail_url', ''),
        width: 150,
        height: 150
      }
    }
  } else if (media.tipo === 'imagem_stories') {
    media.imagens = {
      resolucaoPadrao: {
        url: get(storyMedia, 'media_url', ''),
        width: 640,
        height: 640
      },
      resolucaoMedia: {
        url: get(storyMedia, 'media_url', ''),
        width: 320,
        height: 320
      },
      thumbnail: {
        url: get(storyMedia, 'media_url', ''),
        width: 150,
        height: 150
      }
    }
  }

  return media
}

module.exports = function mapStoryMedia (storyMedia) {
  return isArray(storyMedia)
    ? storyMedia.map(mapStoryMediaToSquidMedia)
    : mapStoryMediaToSquidMedia(storyMedia)
}
