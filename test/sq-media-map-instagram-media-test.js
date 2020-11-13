/* eslint-disable */
const chai = require('chai');
const { expect } = require('chai');
chai.use(require('chai-datetime'));
const mapInstagramMedia = require('../sq-media-mapping/src/map-instagram-media');
const mock = require('./mock/instagram-media-mock');

describe('Instagram medias mapping to Squid medias', () => {
  it('should return every media sent as parameter', (done) => {
    const result = mapInstagramMedia(mock);
    expect(result.length).to.be.equal(mock.length);

    done();
  });

  it('should map an Instagram image to Squid media format', (done) => {
    const result = mapInstagramMedia(mock);
    expect(result).to.have.length(5);

    const media = result.filter(r => r.uid === '1257294056359895637_2118635679')[0];
    expect(media).to.have.property('uid', '1257294056359895637_2118635679');
    expect(media).to.have.property('tags');
    expect(media.tags).to.have.length(5);
    expect(media).to.have.property('link', 'https://www.instagram.com/p/BFyzkhniqJV/');
    expect(media).to.have.property('tipo', 'imagem');
    expect(media).to.have.property('upvotes', 25);
    expect(media).to.have.property('origem', 'instagram');
    expect(media).to.have.property('comentarios', 1);
    expect(media).to.have.property('legenda', 'Job do Dia!!! #lojasmel #jobdodia #SquidIt #TeamSquid #Squid');
    expect(media).to.have.property('criadoEm');
    expect(media.criadoEm).to.equalDate(new Date('Tue May 24 2016'));
    expect(media).to.have.property('obtidoEm');
    expect(media.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(media).to.have.property('imagens');
    const images = media.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13109001_181822948881506_2108721353_n.jpg?ig_cache_key=MTI1NzI5NDA1NjM1OTg5NTYzNw%3D%3D.2');
    expect(images.resolucaoPadrao).to.have.property('width', 640);
    expect(images.resolucaoPadrao).to.have.property('height', 640);
    expect(images.resolucaoMedia).to.have.property('url', 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13109001_181822948881506_2108721353_n.jpg?ig_cache_key=MTI1NzI5NDA1NjM1OTg5NTYzNw%3D%3D.2');
    expect(images.resolucaoMedia).to.have.property('width', 320);
    expect(images.resolucaoMedia).to.have.property('height', 320);
    expect(images.thumbnail).to.have.property('url', 'https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13109001_181822948881506_2108721353_n.jpg?ig_cache_key=MTI1NzI5NDA1NjM1OTg5NTYzNw%3D%3D.2');
    expect(images.thumbnail).to.have.property('width', 150);
    expect(images.thumbnail).to.have.property('height', 150);

    /* videos */
    expect(media).to.not.have.property('videos');

    /* location */
    expect(media).to.have.property('localizacao');
    const location = media.localizacao;
    expect(location).to.have.property('id', '214835558');
    expect(location).to.have.property('nome', 'São Bernardo do Campo, Brazil');
    expect(location).to.have.property('latitude', -23.7);
    expect(location).to.have.property('longitude', -46.55);

    /* metadata */
    expect(media).to.have.property('metadados');
    const metadata = media.metadados;
    expect(metadata).to.have.property('filter', 'Normal');
    expect(metadata.users_in_photo).to.have.length(4);

    /* user */
    expect(media).to.have.property('usuario');
    const user = media.usuario;
    expect(user).to.have.property('id', 'instagram|2118635679');
    expect(user).to.have.property('username', 'carolcarobeno');
    expect(user).to.have.property('foto', 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xpa1/t51.2885-19/s150x150/12105021_1540290902968380_1757759352_a.jpg');
    expect(user).to.have.property('nome', 'Carol Carobeno');

    done();
  });

  it('should map an Instagram video to Squid media format', (done) => {
    const resultado = mapInstagramMedia(mock);
    expect(resultado).to.have.length(5);

    const media = resultado.filter(r => r.uid === '1255673147483789726_2002244389')[0];
    expect(media).to.have.property('uid', '1255673147483789726_2002244389');
    expect(media).to.have.property('tags');
    expect(media.tags).to.have.length(5);
    expect(media).to.have.property('link', 'https://www.instagram.com/p/BFtDBMlxJme/');
    expect(media).to.have.property('tipo', 'video');
    expect(media).to.have.property('upvotes', 15);
    expect(media).to.have.property('origem', 'instagram');
    expect(media).to.have.property('comentarios', 0);
    expect(media).to.have.property('legenda', 'Rugby sevens yesterday was fun 🐙 #teamsquid #teamjellyfish #rugbysevens #friends #drunk');
    expect(media).to.have.property('criadoEm');
    expect(media.criadoEm).to.equalDate(new Date('Sun May 22 2016'));
    expect(media).to.have.property('obtidoEm');
    expect(media.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(media).to.have.property('imagens');
    const images = media.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13267516_1024595524242253_1195621424_n.jpg?ig_cache_key=MTI1NTY3MzE0NzQ4Mzc4OTcyNg%3D%3D.2');
    expect(images.resolucaoPadrao).to.have.property('width', 640);
    expect(images.resolucaoPadrao).to.have.property('height', 640);
    expect(images.resolucaoMedia).to.have.property('url', 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13267516_1024595524242253_1195621424_n.jpg?ig_cache_key=MTI1NTY3MzE0NzQ4Mzc4OTcyNg%3D%3D.2');
    expect(images.resolucaoMedia).to.have.property('width', 320);
    expect(images.resolucaoMedia).to.have.property('height', 320);
    expect(images.thumbnail).to.have.property('url', 'https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13267516_1024595524242253_1195621424_n.jpg?ig_cache_key=MTI1NTY3MzE0NzQ4Mzc4OTcyNg%3D%3D.2');
    expect(images.thumbnail).to.have.property('width', 150);
    expect(images.thumbnail).to.have.property('height', 150);

    /* videos */
    expect(media).to.have.property('videos');
    const videos = media.videos;
    expect(videos).to.have.property('resolucaoPadrao');
    expect(videos.resolucaoPadrao).to.have.property('url', 'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11674488_1466993833612192_1725655309_n.mp4');
    expect(videos.resolucaoPadrao).to.have.property('width', 640);
    expect(videos.resolucaoPadrao).to.have.property('height', 640);
    expect(videos.resolucaoMedia).to.have.property('url', 'https://scontent.cdninstagram.com/hphotos-xfa1/t50.2886-16/11675105_984895574887943_726157105_s.mp4');
    expect(videos.resolucaoMedia).to.have.property('width', 480);
    expect(videos.resolucaoMedia).to.have.property('height', 480);

    /* location */
    expect(media).to.have.property('localizacao');
    const location = media.localizacao;
    expect(location).to.have.property('id', '276323455');
    expect(location).to.have.property('nome', 'Rugby Sevens Twickenham');
    expect(location).to.have.property('latitude', 51.455569444311);
    expect(location).to.have.property('longitude', -0.34118516580961);

    /* metadata */
    expect(media).to.have.property('metadados');
    const metadata = media.metadados;
    expect(metadata).to.have.property('filter', 'Normal');

    /* user */
    expect(media).to.have.property('usuario');
    const user = media.usuario;
    expect(user).to.have.property('id', 'instagram|2002244389');
    expect(user).to.have.property('username', 'sianlfeltham');
    expect(user).to.have.property('foto', 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xpf1/t51.2885-19/s150x150/12501871_561974260630924_1187848207_a.jpg');
    expect(user).to.have.property('nome', 'Sian Louise Feltham');

    done();
  });
});
