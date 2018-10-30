/* eslint-disable */
const chai = require('chai');
const { expect } = require('chai');
chai.use(require('chai-datetime'));
const mapPinterestMedia = require('../sq-media-mapping/src/map-pinterest-media');
const mock = require('./mock/pinterest-media-mock');

describe('Pinterest medias mapping to Squid medias', () => {
  it('should return every media sent as parameter', (done) => {
    const result = mapPinterestMedia(mock);
    expect(result.length).to.be.equal(mock.length);

    done();
  });

  it('should map an Pinterest image to Squid media format', (done) => {
    const result = mapPinterestMedia(mock);
    expect(result).to.have.length(2);

    const media = result.find(r => r.uid === '795026140445904512');
    expect(media).to.have.property('uid', '795026140445904512');
    expect(media).to.have.property('link', 'https://pinterest.com/pin/795026140445904512');
    expect(media).to.have.property('tipo', 'imagem');
    expect(media).to.have.property('origem', 'pinterest');
    expect(media).to.have.property('comentarios', 0);
    expect(media).to.have.property('legenda', 'NyTimes - Islamophobia');
    expect(media).to.have.property('criadoEm');
    expect(media.criadoEm).to.equalDate(new Date('Wed Sep 26 2018'));
    expect(media).to.have.property('obtidoEm');
    expect(media.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(media).to.have.property('imagens');
    const images = media.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'http://i.pinimg.com/1200x/d4/0d/ff/d40dff0295bce3f74f7d41ddfcbf836e.jpg');
    expect(images.resolucaoPadrao).to.have.property('width', 600);
    expect(images.resolucaoPadrao).to.have.property('height', 337);
    expect(images.resolucaoMedia).to.have.property('url', 'http://i.pinimg.com/200x/d4/0d/ff/d40dff0295bce3f74f7d41ddfcbf836e.jpg');
    expect(images.resolucaoMedia).to.have.property('width', 200);
    expect(images.resolucaoMedia).to.have.property('height', 112);
    expect(images.thumbnail).to.have.property('url', 'http://i.pinimg.com/45x45/d4/0d/ff/d40dff0295bce3f74f7d41ddfcbf836e.jpg');
    expect(images.thumbnail).to.have.property('width', 45);
    expect(images.thumbnail).to.have.property('height', 45);

    /* videos */
    expect(media).to.not.have.property('videos');

    /* metadata */
    expect(media).to.have.property('metadados');
    const metadata = media.metadados;
    expect(metadata).to.have.property('externalLink', 'https://www.nytimes.com/2018/09/26/opinion/islamophobia-muslim-religion-politics.html?action=click&module=Opinion&pgtype=Homepage');
    /* board */
    expect(metadata).to.have.property('board');
    const board = metadata.board;
    expect(board).to.have.property('categoria', 'art');
    expect(board).to.have.property('nome', 'Pasta de referências teste 1!');
    expect(board).to.have.property('url', '/limafelipe92/pasta-de-referências-teste-1/');
    expect(board).to.have.property('id', '795026209158460934');
    /* attribution */
    expect(metadata).to.have.property('attribution');
    const attribution = metadata.attribution;
    expect(attribution).to.have.property('authorName', 'NyTimes');
    expect(attribution).to.have.property('authorUrl', 'https://www.flickr.com/photos/84251445@N04/');
    expect(attribution).to.have.property('provider', 'flickr');
    expect(attribution).to.have.property('providerIcon', 'http://s.pinimg.com/images/api/attrib/flickr@2x.png');
    expect(attribution).to.have.property('title', 'NyTimes - Islamophobia');
    /* statistics */
    expect(metadata).to.have.property('statistics');
    const statistics = metadata.statistics;
    expect(statistics).to.have.property('30d');
    expect(statistics).to.have.property('7d');
    expect(statistics).to.have.property('24h');
    const stats30d = statistics['30d']
    expect(stats30d).to.have.property('save', 0);
    expect(stats30d).to.have.property('closeup', 1);
    expect(stats30d).to.have.property('impression', 21);
    expect(stats30d).to.have.property('clickthrough', 0);
    expect(stats30d.updatedAt).to.equalDate(new Date('Wed Oct 24 2018'));

    /* user */
    expect(media).to.have.property('usuario');
    const user = media.usuario;
    expect(user).to.have.property('id', '795026277877788753');
    expect(user).to.have.property('username', 'limafelipe92');
    expect(user).to.have.property('foto', 'https://i.pinimg.com/140x140_RS/60/51/00/605100e58f68129b38c45a1169dacf56.jpg');
    expect(user).to.have.property('nome', 'Felipe Lima');

    done();
  });

  it('should map an Pinterest video to Squid media format', (done) => {
    const result = mapPinterestMedia(mock);
    expect(result).to.have.length(2);

    const media = result.find(r => r.uid === '795026140445904527');
    expect(media).to.have.property('uid', '795026140445904527');
    expect(media).to.have.property('link', 'https://pinterest.com/pin/795026140445904527');
    expect(media).to.have.property('tipo', 'video');
    expect(media).to.have.property('origem', 'pinterest');
    expect(media).to.have.property('comentarios', 0);
    expect(media).to.have.property('legenda', 'MURILO COUTO - ANITTA E O ELE NÃO');
    expect(media).to.have.property('criadoEm');
    expect(media.criadoEm).to.equalDate(new Date('Wed Sep 26 2018'));
    expect(media).to.have.property('obtidoEm');
    expect(media.obtidoEm).to.equalDate(new Date());

    /* images */
    expect(media).to.have.property('imagens');
    const images = media.imagens;
    expect(images.resolucaoPadrao).to.have.property('url', 'http://i.pinimg.com/1200x/90/1b/96/901b96e724ab2c279a1cafcb979b6a1e.jpg');
    expect(images.resolucaoPadrao).to.have.property('width', 1200);
    expect(images.resolucaoPadrao).to.have.property('height', 675);
    expect(images.resolucaoMedia).to.have.property('url', 'http://i.pinimg.com/200x/90/1b/96/901b96e724ab2c279a1cafcb979b6a1e.jpg');
    expect(images.resolucaoMedia).to.have.property('width', 200);
    expect(images.resolucaoMedia).to.have.property('height', 112);
    expect(images.thumbnail).to.have.property('url', 'http://i.pinimg.com/45x45/90/1b/96/901b96e724ab2c279a1cafcb979b6a1e.jpg');
    expect(images.thumbnail).to.have.property('width', 45);
    expect(images.thumbnail).to.have.property('height', 45);

    /* videos */
    expect(media).to.not.have.property('videos');

    /* metadata */
    expect(media).to.have.property('metadados');
    const metadata = media.metadados;
    expect(metadata).to.have.property('externalLink', 'https://www.youtube.com/watch?v=WstcnZcHvCk');
    /* board */
    expect(metadata).to.have.property('board');
    const board = metadata.board;
    expect(board).to.have.property('categoria', 'art');
    expect(board).to.have.property('nome', 'Pasta de referências teste 1!');
    expect(board).to.have.property('url', '/limafelipe92/pasta-de-referências-teste-1/');
    expect(board).to.have.property('id', '795026209158460934');
    /* attribution */
    expect(metadata).to.have.property('attribution');
    const attribution = metadata.attribution;
    expect(attribution).to.have.property('authorName', 'Murilo Couto');
    expect(attribution).to.have.property('authorUrl', 'https://www.youtube.com/channel/UCDG56nDKCg302lY6Lr_GOWg');
    expect(attribution).to.have.property('provider', 'youtube');
    expect(attribution).to.have.property('providerIcon', 'http://s.pinimg.com/images/api/attrib/youtube@2x.png');
    expect(attribution).to.have.property('title', 'MURILO COUTO - ANITTA E O ELE NÃO');
    /* player */
    expect(metadata).to.have.property('player');
    const player = metadata.player;
    expect(player).to.have.property('embedUrl', 'http://www.youtube.com/embed/WstcnZcHvCk?autohide=1&theme=light&hd=1&modestbranding=1&rel=0&showinfo=0&showsearch=0&wmode=transparent&autoplay=1');
    /* statistics */
    expect(metadata).to.have.property('statistics');
    const statistics = metadata.statistics;
    expect(statistics).to.have.property('30d');
    expect(statistics).to.have.property('7d');
    expect(statistics).to.have.property('24h');
    const stats30d = statistics['30d']
    expect(stats30d).to.have.property('save', 0);
    expect(stats30d).to.have.property('closeup', 6);
    expect(stats30d).to.have.property('impression', 10);
    expect(stats30d).to.have.property('clickthrough', 1);
    expect(stats30d.updatedAt).to.equalDate(new Date('Wed Oct 24 2018'));

    /* user */
    expect(media).to.have.property('usuario');
    const user = media.usuario;
    expect(user).to.have.property('id', '795026277877788753');
    expect(user).to.have.property('username', 'limafelipe92');
    expect(user).to.have.property('foto', 'https://i.pinimg.com/140x140_RS/60/51/00/605100e58f68129b38c45a1169dacf56.jpg');
    expect(user).to.have.property('nome', 'Felipe Lima');

    done();
  });
});
