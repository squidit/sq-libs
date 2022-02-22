/* eslint-disable */
const chai = require('chai');
const { expect } = require('chai');
const {cloneDeep} = require('lodash')
chai.use(require('chai-datetime'));
const mapTiktokMedia = require('../sq-media-mapping/src/map-tiktok-media');
const mock = require('./mock/tiktok-media-mock');

describe('Tiktok medias mapping to Squid medias', () => {

  it('should return every media sent as parameter', (done) => {
    const result = mapTiktokMedia(mock);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(mock.length);

    done();
  });

  it('should return one media sent as parameter', (done) => {
    const result = mapTiktokMedia(mock[0]);
    expect(result).to.not.be.an('array');

    done();
  });

  it('should map an Tiktok vídeo to Squid media format', (done) => {
    const result = mapTiktokMedia(mock[0]);

    expect(result).to.have.property('uid', '7063992018837490949');
    expect(result).to.have.property('link', 'https://www.tiktok.com/embed/v2/7063992018837490949');
    expect(result).to.have.property('tipo', 'video');
    expect(result).to.have.property('upvotes', 8612);
    expect(result).to.have.property('origem', 'tiktok');
    expect(result).to.have.property('comentarios', 73);
    expect(result).to.have.property('legenda', '#dueto com @dessahcatty Já sigam lá no meu perfil novo! ❤️😍🎉 #foryou #fy');
    expect(result).to.have.property('criadoEm');
    expect(result).to.have.property('obtidoEm');
    expect(result.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(result).to.have.property('imagens');
    const images = result.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/ba97c789548945a3931552a549c202fe_1644713813~tplv-noop.image?x-expires=1645506124&x-signature=03CwhWfapNKKE6tPDkGq%2B6OLuTI%3D');
    expect(images.resolucaoPadrao).to.have.property('width', 540);
    expect(images.resolucaoPadrao).to.have.property('height', 480);

    /* metadata */
    expect(result).to.have.property('metadados');
    const metadata = result.metadados;
    expect(metadata).to.have.property('statistics');
    const statistics = metadata.statistics;
    expect(statistics).to.have.property('viewCount', 58300);
    expect(statistics).to.have.property('likeCount', 8612);
    expect(statistics).to.have.property('commentCount', 73);
    expect(metadata).to.have.property('player', `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@andressahcatty/video/7063992018837490949?utm_campaign=tt4d_open_api&utm_source=aw6sn7bj97vpkide" data-video-id="7063992018837490949" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@andressahcatty" href="https://www.tiktok.com/@andressahcatty">@andressahcatty</a> <p><a title="dueto" target="_blank" href="https://www.tiktok.com/tag/dueto">#dueto</a> com @dessahcatty Já sigam lá no meu perfil novo! ❤️😍🎉 <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou">#foryou</a> <a title="fy" target="_blank" href="https://www.tiktok.com/tag/fy">#fy</a></p> <a target="_blank" title="♬ Boys Don't Cry - Anitta" href="https://www.tiktok.com/music/7057067275543447553-Boys+Don%27t+Cry">♬ Boys Don't Cry - Anitta</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`);
    expect(metadata).to.have.property('description', '#dueto com @dessahcatty Já sigam lá no meu perfil novo! ❤️😍🎉 #foryou #fy https://www.tiktok.com/ https://www.google.com/');

    /* channel */
    expect(result).to.not.have.property('channel');

    done();
  });


  it('should return links when description has links', () => {
    const result = mapTiktokMedia(mock[0])
    expect(result.links).to.an('array')
    expect(result.links).to.be.have.lengthOf(2)
  })

  it('should return pub true if title has #publi', () => {
    mock[0].title += ' #publi'
    const result = mapTiktokMedia(mock[0])
    expect(result.ad).to.be.equal(true)
  })

  it('should return pub true if title has #ad', () => {
    const mockTest = cloneDeep(mock[0])
    mockTest.title += ' #ad'
    const result = mapTiktokMedia(mockTest)
    expect(result.ad).to.be.equal(true)
  })

  it('should return pub true if description has #publi', () => {
    const mockTest = cloneDeep(mock[0])
    mockTest.video_description += ' #publi'
    const result = mapTiktokMedia(mockTest)
    expect(result.ad).to.be.equal(true)
  })

  it('should return pub true if description has #ad', () => {
    const mockTest = cloneDeep(mock[0])
    mockTest.video_description += ' #ad'
    const result = mapTiktokMedia(mockTest)
    expect(result.ad).to.be.equal(true)
  })

  it('should return list of mentions when has a @username and @username2 into tilte', () => {
    const mockTest = cloneDeep(mock[0])
    const result = mapTiktokMedia(mockTest)
    expect(result.mentions).to.be.have.lengthOf(2)
  })
});
