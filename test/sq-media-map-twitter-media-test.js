/* eslint-disable */
const chai = require('chai');
const { expect } = require('chai');
chai.use(require('chai-datetime'));
const mapTwitterMedia = require('../sq-media-mapping/src/map-twitter-media');
const mock = require('./mock/twitter-media-mock');

describe('Twitter medias mapping to Squid medias', () => {
  it('should return every media sent as parameter', (done) => {
    const result = mapTwitterMedia(mock);
    expect(result.length).to.be.equal(mock.length);

    done();
  });

  it('should map an Tweet with media photo to Squid media format', (done) => {
    const result = mapTwitterMedia(mock);
    expect(result).to.have.length(3);

    const media = result.find(r => r.uid === '878686323984519168');
    expect(media).to.have.property('uid', '878686323984519168');
    expect(media).to.have.property('tags');
    expect(media.tags).to.have.length(1);
    expect(media.tags[0]).to.be.eql('teamsquid');
    expect(media).to.have.property('link', 'https://twitter.com/squiditapp/status/878686323984519168');
    expect(media).to.have.property('tipo', 'imagem');
    expect(media).to.have.property('upvotes', 10);
    expect(media).to.have.property('origem', 'twitter');
    expect(media).to.have.property('comentarios', 0);
    expect(media).to.have.property('legenda', '#teamsquid tá lindo https://t.co/vZLHuFswbj');
    expect(media).to.have.property('criadoEm');
    expect(media.criadoEm).to.equalDate(new Date('Sat Jun 24 2017'));
    expect(media).to.have.property('obtidoEm');
    expect(media.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(media).to.have.property('imagens');
    const images = media.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'https://pbs.twimg.com/media/DDG4inyXsAERZxI.jpg:large');
    expect(images.resolucaoPadrao).to.have.property('width', 768);
    expect(images.resolucaoPadrao).to.have.property('height', 1024);
    expect(images.resolucaoMedia).to.have.property('url', 'https://pbs.twimg.com/media/DDG4inyXsAERZxI.jpg:small');
    expect(images.resolucaoMedia).to.have.property('width', 510);
    expect(images.resolucaoMedia).to.have.property('height', 680);
    expect(images.thumbnail).to.have.property('url', 'https://pbs.twimg.com/media/DDG4inyXsAERZxI.jpg:thumb');
    expect(images.thumbnail).to.have.property('width', 150);
    expect(images.thumbnail).to.have.property('height', 150);

    /* videos */
    expect(media).to.not.have.property('videos');

    /* location */
    expect(media).to.have.property('localizacao');
    const location = media.localizacao;
    expect(location).to.have.property('id', '07d9f33313885003');
    expect(location).to.have.property('nome', 'SESC Pinheiros');
    expect(location).to.have.property('longitude', -46.69746279716492);
    expect(location).to.have.property('latitude', -23.567684736859572);

    /* point */
    expect(media).to.have.property('point');
    const point = media.point;
    expect(point).to.have.property('type', 'Point');
    expect(point).to.have.property('coordinates');
    expect(point.coordinates).to.have.length(2);
    expect(point.coordinates[0]).to.be.eql(-46.69746279716492);
    expect(point.coordinates[1]).to.be.eql(-23.567684736859572);

    /* metadata */
    expect(media).to.have.property('metadados');
    const metadata = media.metadados;
    expect(metadata).to.have.property('retweets', 0);
    expect(metadata).to.have.property('in_reply_to_status_id_str', null);
    expect(metadata).to.have.property('source', '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>');
    expect(metadata.user).to.have.property('followers_count', 28);
    expect(metadata.user).to.have.property('friends_count', 24);
    expect(metadata.user).to.have.property('created_at', 'Fri Apr 17 17:28:37 +0000 2015');
    expect(metadata.user).to.have.property('url', 'http://t.co/X0GqihU5gc');

    /* user */
    expect(media).to.have.property('usuario');
    const user = media.usuario;
    expect(user).to.have.property('id', 'twitter|3177405729');
    expect(user).to.have.property('username', 'squiditapp');
    expect(user).to.have.property('foto', 'https://pbs.twimg.com/profile_images/830048860051558400/sD8-PsLQ_normal.jpg');
    expect(user).to.have.property('nome', 'Squid');

    done();
  });

  it('should map an Tweet with media video to Squid media format', (done) => {
    const resultado = mapTwitterMedia(mock);
    expect(resultado).to.have.length(3);

    const media = resultado.find(r => r.uid === '879349821232095233');
    expect(media).to.have.property('uid', '879349821232095233');
    expect(media).to.have.property('tags');
    expect(media.tags).to.have.length(1);
    expect(media).to.have.property('link', 'https://twitter.com/squiditapp/status/879349821232095233');
    expect(media).to.have.property('tipo', 'video');
    expect(media).to.have.property('upvotes', 0);
    expect(media).to.have.property('origem', 'twitter');
    expect(media).to.have.property('comentarios', 0);
    expect(media).to.have.property('legenda', 'Visão nova! #teamsquid https://t.co/MhI4wvDwCH');
    expect(media).to.have.property('criadoEm');
    expect(media.criadoEm).to.equalDate(new Date('Mon Jun 26 2017'));
    expect(media).to.have.property('obtidoEm');
    expect(media.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(media).to.have.property('imagens');
    const images = media.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'https://pbs.twimg.com/ext_tw_video_thumb/879349688134234114/pu/img/sBGxAIl62GsQDKnJ.jpg:large');
    expect(images.resolucaoPadrao).to.have.property('width', 720);
    expect(images.resolucaoPadrao).to.have.property('height', 720);
    expect(images.resolucaoMedia).to.have.property('url', 'https://pbs.twimg.com/ext_tw_video_thumb/879349688134234114/pu/img/sBGxAIl62GsQDKnJ.jpg:small');
    expect(images.resolucaoMedia).to.have.property('width', 340);
    expect(images.resolucaoMedia).to.have.property('height', 340);
    expect(images.thumbnail).to.have.property('url', 'https://pbs.twimg.com/ext_tw_video_thumb/879349688134234114/pu/img/sBGxAIl62GsQDKnJ.jpg:thumb');
    expect(images.thumbnail).to.have.property('width', 150);
    expect(images.thumbnail).to.have.property('height', 150);

    /* videos */
    expect(media).to.have.property('videos');
    const videos = media.videos;
    expect(videos).to.have.property('resolucaoPadrao');
    expect(videos.resolucaoPadrao).to.have.property('url', 'https://video.twimg.com/ext_tw_video/879349688134234114/pu/vid/720x720/C0lXzF5AgDoBXRkZ.mp4');
    expect(videos.resolucaoPadrao).to.have.property('width', 640);
    expect(videos.resolucaoPadrao).to.have.property('height', 640);
    expect(videos.resolucaoMedia).to.have.property('url', 'https://video.twimg.com/ext_tw_video/879349688134234114/pu/vid/240x240/O50iw30vB5H4q4kv.mp4');
    expect(videos.resolucaoMedia).to.have.property('width', 480);
    expect(videos.resolucaoMedia).to.have.property('height', 480);

    /* location */
    expect(media).to.have.property('localizacao');
    const location = media.localizacao;
    expect(location).to.have.property('id', '68e019afec7d0ba5');
    expect(location).to.have.property('nome', 'Sao Paulo');
    expect(location).to.have.property('latitude', -23.5683949);
    expect(location).to.have.property('longitude', -46.6991169);

    /* point */
    expect(media).to.have.property('point');
    const point = media.point;
    expect(point).to.have.property('type', 'Point');
    expect(point).to.have.property('coordinates');
    expect(point.coordinates).to.have.length(2);
    expect(point.coordinates[0]).to.be.eql(-46.6991169);
    expect(point.coordinates[1]).to.be.eql(-23.5683949);

    /* metadata */
    expect(media).to.have.property('metadados');
    const metadata = media.metadados;
    expect(metadata).to.have.property('retweets', 0);
    expect(metadata).to.have.property('in_reply_to_status_id_str', null);
    expect(metadata).to.have.property('source', '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>');
    expect(metadata.user).to.have.property('followers_count', 28);
    expect(metadata.user).to.have.property('friends_count', 24);
    expect(metadata.user).to.have.property('created_at', 'Fri Apr 17 17:28:37 +0000 2015');
    expect(metadata.user).to.have.property('url', 'http://t.co/X0GqihU5gc');

    /* user */
    expect(media).to.have.property('usuario');
    const user = media.usuario;
    expect(user).to.have.property('id', 'twitter|3177405729');
    expect(user).to.have.property('username', 'squiditapp');
    expect(user).to.have.property('foto', 'https://pbs.twimg.com/profile_images/830048860051558400/sD8-PsLQ_normal.jpg');
    expect(user).to.have.property('nome', 'Squid');

    done();
  });

  it('should map an Tweet with gif media to Squid media format', (done) => {
    const resultado = mapTwitterMedia(mock);
    expect(resultado).to.have.length(3);

    const media = resultado.find(r => r.uid === '879364966519910400');
    expect(media).to.have.property('uid', '879364966519910400');
    expect(media).to.have.property('tags');
    expect(media.tags).to.have.length(1);
    expect(media).to.have.property('link', 'https://twitter.com/squiditapp/status/879364966519910400');
    expect(media).to.have.property('tipo', 'imagem');
    expect(media).to.have.property('upvotes', 0);
    expect(media).to.have.property('origem', 'twitter');
    expect(media).to.have.property('comentarios', 0);
    expect(media).to.have.property('legenda', 'Uhulll #teamsquid https://t.co/AXgVsIMui0');
    expect(media).to.have.property('criadoEm');
    expect(media.criadoEm).to.equalDate(new Date('Mon Jun 26 2017'));
    expect(media).to.have.property('obtidoEm');
    expect(media.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(media).to.have.property('imagens');
    const images = media.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'https://pbs.twimg.com/tweet_video_thumb/DDQhw-wXsAAH1TD.jpg:large');
    expect(images.resolucaoPadrao).to.have.property('width', 324);
    expect(images.resolucaoPadrao).to.have.property('height', 322);
    expect(images.resolucaoMedia).to.have.property('url', 'https://pbs.twimg.com/tweet_video_thumb/DDQhw-wXsAAH1TD.jpg:small');
    expect(images.resolucaoMedia).to.have.property('width', 324);
    expect(images.resolucaoMedia).to.have.property('height', 322);
    expect(images.thumbnail).to.have.property('url', 'https://pbs.twimg.com/tweet_video_thumb/DDQhw-wXsAAH1TD.jpg:thumb');
    expect(images.thumbnail).to.have.property('width', 150);
    expect(images.thumbnail).to.have.property('height', 150);

    /* location */
    expect(media).to.have.property('localizacao');
    const location = media.localizacao;
    expect(location).to.have.property('id', '68e019afec7d0ba5');
    expect(location).to.have.property('nome', 'Sao Paulo');
    expect(location).to.have.property('latitude', -23.682803);
    expect(location).to.have.property('longitude', -46.5955455);

    /* point */
    expect(media).to.have.property('point');
    const point = media.point;
    expect(point).to.have.property('type', 'Point');
    expect(point).to.have.property('coordinates');
    expect(point.coordinates).to.have.length(2);
    expect(point.coordinates[0]).to.be.eql(-46.5955455);
    expect(point.coordinates[1]).to.be.eql(-23.682803);

    /* metadata */
    expect(media).to.have.property('metadados');
    const metadata = media.metadados;
    expect(metadata).to.have.property('retweets', 0);
    expect(metadata).to.have.property('in_reply_to_status_id_str', null);
    expect(metadata).to.have.property('source', '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>');
    expect(metadata.user).to.have.property('followers_count', 28);
    expect(metadata.user).to.have.property('friends_count', 24);
    expect(metadata.user).to.have.property('created_at', 'Fri Apr 17 17:28:37 +0000 2015');
    expect(metadata.user).to.have.property('url', 'http://t.co/X0GqihU5gc');

    /* user */
    expect(media).to.have.property('usuario');
    const user = media.usuario;
    expect(user).to.have.property('id', 'twitter|3177405729');
    expect(user).to.have.property('username', 'squiditapp');
    expect(user).to.have.property('foto', 'https://pbs.twimg.com/profile_images/830048860051558400/sD8-PsLQ_normal.jpg');
    expect(user).to.have.property('nome', 'Squid');

    done();
  });
});
