/* eslint-disable */
const chai = require('chai');
const { expect } = require('chai');
const {cloneDeep} = require('lodash')
chai.use(require('chai-datetime'));
const mapYoutubeMedia = require('../sq-media-mapping/src/map-youtube-media');
const mock = require('./mock/youtube-media-mock');

describe('Youtube medias mapping to Squid medias', () => {
  it('should return every media sent as parameter', (done) => {
    const result = mapYoutubeMedia(mock);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(mock.length);

    done();
  });

  it('should return one media sent as parameter', (done) => {
    const result = mapYoutubeMedia(mock[0]);
    expect(result).to.not.be.an('array');

    done();
  });

  it('should map an Youtube vídeo to Squid media format', (done) => {
    const result = mapYoutubeMedia(mock[0]);

    expect(result).to.have.property('uid', '5vO-hJrh3qI');
    expect(result).to.have.property('tags');
    expect(result.tags).to.have.length(2);
    expect(result).to.have.property('link', 'https://www.youtube.com/watch?v=5vO-hJrh3qI');
    expect(result).to.have.property('tipo', 'video');
    expect(result).to.have.property('upvotes', 223918);
    expect(result).to.have.property('origem', 'youtube');
    expect(result).to.have.property('comentarios', 17995);
    expect(result).to.have.property('legenda', '2 MILHÕES DE INSCRITOS!!! - Especial - MrPoladoful');
    expect(result).to.have.property('criadoEm');
    expect(result.criadoEm).to.equalDate(new Date('2016-09-03T20:55:04.000Z'));
    expect(result).to.have.property('obtidoEm');
    expect(result.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(result).to.have.property('imagens');
    const images = result.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'https://i.ytimg.com/vi/5vO-hJrh3qI/hqdefault.jpg');
    expect(images.resolucaoPadrao).to.have.property('width', 480);
    expect(images.resolucaoPadrao).to.have.property('height', 360);
    expect(images.resolucaoMedia).to.have.property('url', 'https://i.ytimg.com/vi/5vO-hJrh3qI/mqdefault.jpg');
    expect(images.resolucaoMedia).to.have.property('width', 320);
    expect(images.resolucaoMedia).to.have.property('height', 180);
    expect(images.thumbnail).to.have.property('url', 'https://i.ytimg.com/vi/5vO-hJrh3qI/default.jpg');
    expect(images.thumbnail).to.have.property('width', 120);
    expect(images.thumbnail).to.have.property('height', 90);

    /* usuario */
    expect(result).to.have.property('usuario');
    const usuario = result.usuario;
    expect(usuario).to.have.property('id', 'UC5gFyQ1LCdZ6xeeHz73ujQQ');
    expect(usuario).to.have.property('username', 'MrPoladoful');

    /* videos */
    expect(result).to.not.have.property('videos');

    /* location */
    expect(result).to.not.have.property('localizacao');

    /* metadata */
    expect(result).to.have.property('metadados');
    const metadata = result.metadados;
    expect(metadata).to.have.property('statistics');
    const statistics = metadata.statistics;
    expect(statistics).to.have.property('viewCount', 1039170);
    expect(statistics).to.have.property('likeCount', 223918);
    expect(statistics).to.have.property('dislikeCount', 629);
    expect(statistics).to.have.property('favoriteCount', 0);
    expect(statistics).to.have.property('commentCount', 17995);
    expect(metadata).to.have.property('player');
    const player = metadata.player;
    expect(player).to.have.property('embedHtml', '<iframe width=\'640\' height=\'360\' src=\'//www.youtube.com/embed/5vO-hJrh3qI\' frameborder=\'0\' allowfullscreen></iframe>');
    expect(metadata).to.have.property('contentDetails');
    const contentDetails = metadata.contentDetails;
    expect(contentDetails).to.have.property('duration', 'PT6M58S');
    expect(contentDetails).to.have.property('dimension', '2d');
    expect(contentDetails).to.have.property('definition', 'hd');
    expect(contentDetails).to.have.property('caption', 'false');
    expect(contentDetails).to.have.property('licensedContent', true);
    expect(contentDetails).to.have.property('projection', 'rectangular');
    expect(metadata).to.have.property('description', 'Fiz 2 milhões de inscritos. Papo sério. Pffhahaha\nInstagram: http://instagram.com/mrpoladoful/\nFacebook: http://www.facebook.com/Poladoful\nTwitter: http://twitter.com/MrPoladoful\n\nTem sugestão de jogo/quer falar comigo?  \nEnvie para: contatopoladoful@gmail.com  \n\nEmpresa? \nEnvie para: poladofulloficial@gmail.com\n\nJesus APROVA!\n\nFinal - Créditos da Música\nThomasVX\nhttps://www.facebook.com/thomasvx\nhttps://soundcloud.com/thomas-vx\nhttps://twitter.com/thomasvxmusic\nhttps://www.youtube.com/user/DOCTORVOXofficial\n\nPode conter músicas de Kevin MacLeod\nhttp://incompetech.com/music/royalty-free/\n\nEdit por: Gabriela Bastos\nhttps://twitter.com/Porchantt\n\nAbraço!');
    expect(metadata).to.have.property('statusPrivacidade', 'public');
    expect(metadata).to.have.property('idCategoria', 20);

    /* channel */
    expect(result).to.not.have.property('channel');

    done();
  });

  it('should return links when description has links', () => {
    const result = mapYoutubeMedia(mock[0])
    expect(result.links).to.an('array')
    expect(result.links).to.be.have.lengthOf(9)
  })

  it('should return pub true if title has #publi', () => {
    mock[0].snippet.title += ' #publi'
    const result = mapYoutubeMedia(mock[0])
    expect(result.ad).to.be.equal(true)
  })

  it('should return pub true if title has #ad', () => {
    const mockTest = cloneDeep(mock[0])
    mockTest.snippet.title += ' #ad'
    const result = mapYoutubeMedia(mockTest)
    expect(result.ad).to.be.equal(true)
  })

  it('should return pub true if description has #publi', () => {
    const mockTest = cloneDeep(mock[0])
    mockTest.snippet.description += ' #publi'
    const result = mapYoutubeMedia(mockTest)
    expect(result.ad).to.be.equal(true)
  })

  it('should return pub true if description has #ad', () => {
    const mockTest = cloneDeep(mock[0])
    mockTest.snippet.description += ' #ad'
    const result = mapYoutubeMedia(mockTest)
    expect(result.ad).to.be.equal(true)
  })

  it('should return list of mentions when has a @username and @username2 into tilte', () => {
    const mockTest = cloneDeep(mock[0])
    mockTest.snippet.title += ' @username @username2'
    const result = mapYoutubeMedia(mockTest)
    expect(result.mentions).to.be.have.lengthOf(2)
  })

  it('should return list of mentions when has a @username and @username2 into description', () => {
    const mockTest = cloneDeep(mock[0])
    mockTest.snippet.description += ' @username @username2'
    const result = mapYoutubeMedia(mockTest)
  
    expect(result.mentions).to.be.have.lengthOf(2)
  })
});
