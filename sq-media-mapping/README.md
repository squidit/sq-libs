# sq-media-mapping [![wercker status](https://app.wercker.com/status/daca7948c48a70089b12dd8a8a6b11f1/s/master "wercker status")](https://app.wercker.com/project/byKey/daca7948c48a70089b12dd8a8a6b11f1) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
> Mapping de mídias para objeto padrão da Squid.

## Install
Adicionar no `package.json` como repositrio git, `"squid-media-mapping": "squidit/sq-media-mapping"`

[Twitter](#twitter)

[Instagram](#instagram)

[Youtube](#youtube)

[Pinterest](#pinterest)
# Twitter

| Squid Media  | Twitter |
| ------------- | ------------- |
| uid  | id_str |
| legenda | text |
| criadoEm | created_at |
| obtidoEm  |  `new Date` |
| origem  | `twitter` |
| tags  |  entities.hashtags[].text  |
| link  | entities.media[].url  |
| tipo  | entities.media[].type *(photo, video)*  |
| upvotes  | favorite_count  |
|  comentarios | 0  |
| usuario. id  | `twitter` user.id_str  |
| usuario.username  | user.screen_name  |
| usuario.nome  |  user.name  |
| usuario. foto  |  user.profile_image_url_https |
| localizacao.id | place.id |
| localizacao.nome | place. name |
| localizacao.latitude | coordinates[1] |
| localizacao.longitude | coordinates[0] |
| point  | coordinates `or` place.bounding_box.coordinates *(se Polygon)* |
| imagens.resolucaoPadrao.url | extended_entities.media[].media_url_https + `:large` or `:medium` |
| imagens.resolucaoPadrao.width | extended_entities.media[].sizes.large/medium.w |
| imagens.resolucaoPadrao.height | extended_entities.media[].sizes.large/medium.h |
| imagens.thumbnail.url | extended_entities.media[].media_url_https + `:thumb` |
| imagens.thumbnail.width | extended_entities.media[].sizes.thumb.w |
| imagens.thumbnail.height | extended_entities.media[].sizes.thumb.h |
| imagens.resolucaoMedia.url | extended_entities.media[].media_url_https + `:small` |
| imagens.resolucaoMedia.width | extended_entities.media[].sizes.small.w |
| imagens.resolucaoMedia.height | extended_entities.media[].sizes.small.h |
| metadados  |  retweet_count, user.followers_count, user.friends_count, user.created_at, user.url, in_reply_to_status_id_str, source |
| videos.resolucaoPadrao.url | extended_entities.video_info.variants[].url |
| videos.resolucaoPadrao.width | 640 |
| videos.resolucaoPadrao.height | 640 |
| videos.resolucaoMedia.url | extended_entities.video_info.variants[].url |
| videos.resolucaoMedia.width | 480 |
| videos.resolucaoMedia.height | 480 |

# Pinterest

| Squid Media | Pinterest |
| ------------- | ------------- |
| uid  | id |
| legenda | description |
| criadoEm | created_at |
| obtidoEm  |  `new Date` |
| origem  | `pinterest` |
| tags  | - |
| link  | `https://pinterest.com/pin/{id}`
| tipo  | is_video |
| comentarios | comment_count |
| usuario. id  | user.id |
| usuario.username | user.username |
| usuario.nome  | `{user.first_name} {user.last_name}` |
| usuario.foto  | user.image_large_url |
| imagens.resolucaoPadrao.url | image_large_url |
| imagens.resolucaoPadrao.width | image_large_size_pixels.width |
| imagens.resolucaoPadrao.height | image_large_size_pixels.height |
| imagens.resolucaoMedia.url | image_medium_url |
| imagens.resolucaoMedia.width | image_medium_size_pixels.width |
| imagens.resolucaoMedia.height | image_medium_size_pixels.height |
| imagens.thumbnail.url | image_square_url |
| imagens.thumbnail.width | image_square_size_pixels.width |
| imagens.thumbnail.height | image_square_size_pixels.height |
| metadados.attribution  |  attribution  |
| metadados.board  |  pinned_to_board  |
| metadados.statistics  |  influencer_pin_stats  |
| metadados.player  |  attribution.embed_url  |
