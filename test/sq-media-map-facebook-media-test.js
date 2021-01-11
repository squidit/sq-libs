/* eslint-disable */
const chai = require('chai')
const { expect } = require('chai')
chai.use(require('chai-datetime'))
const mapFacebookMedia = require('../sq-media-mapping/src/map-facebook-media')
const mock = require('./mock/facebook-media-mock')

describe('Facebook Media mapping to Squid medias', () => {
  it('should map an FB Media to Squid media format', (done) => {
    const media = mapFacebookMedia(mock)

    expect(media).to.have.property('uid', '1817582535434902888_1719443085')
    expect(media).to.have.property('link', 'https://www.instagram.com/p/Bk5Wa-ejR1o/')
    expect(media).to.have.property('tipo', 'carousel')
    expect(media).to.have.property('upvotes', 640)
    expect(media).to.have.property('origem', 'instagram')
    expect(media).to.have.property('comentarios', 33)
    expect(media).to.have.property('legenda', 'Legenda #testepixote da foto #nanana')
    expect(media.tags).to.eql(['testepixote', 'nanana'])
    expect(media).to.have.property('criadoEm')
    expect(media.criadoEm).to.equalDate(new Date('Fri Jul 06 2018'))
    expect(media).to.have.property('obtidoEm')
    expect(media.obtidoEm).to.equalDate(new Date())

    /* images */
    expect(media).to.have.property('imagens')
    const images = media.imagens
    expect(images.resolucaoPadrao).to.have.property('url', 'https://scontent.xx.fbcdn.net/v/t51.2885-15/36136903_449979075478010_5563437967923478528_n.jpg?_nc_cat=0&oh=d8c9af42d65df92a18ce62c13efde881&oe=5BCB44C3')
    expect(images.resolucaoPadrao).to.have.property('width', 640)
    expect(images.resolucaoPadrao).to.have.property('height', 640)
    expect(images.resolucaoMedia).to.have.property('url', 'https://scontent.xx.fbcdn.net/v/t51.2885-15/36136903_449979075478010_5563437967923478528_n.jpg?_nc_cat=0&oh=d8c9af42d65df92a18ce62c13efde881&oe=5BCB44C3')
    expect(images.resolucaoMedia).to.have.property('width', 320)
    expect(images.resolucaoMedia).to.have.property('height', 320)
    expect(images.thumbnail).to.have.property('url', 'https://scontent.xx.fbcdn.net/v/t51.2885-15/36136903_449979075478010_5563437967923478528_n.jpg?_nc_cat=0&oh=d8c9af42d65df92a18ce62c13efde881&oe=5BCB44C3')
    expect(images.thumbnail).to.have.property('width', 150)
    expect(images.thumbnail).to.have.property('height', 150)

    /* carousel */
    expect(media).to.have.property('carousel')
    const carousel = media.carousel
    expect(carousel[0].tipo).to.equal('imagem')
    expect(carousel[0].url).to.equal('https://scontent.xx.fbcdn.net/v/t51.2885-15/36136903_449979075478010_5563437967923478528_n.jpg?_nc_cat=0&oh=d8c9af42d65df92a18ce62c13efde881&oe=5BCB44C3')
    expect(carousel[1].tipo).to.equal('imagem')
    expect(carousel[1].url).to.equal('https://scontent.xx.fbcdn.net/v/t51.2885-15/35986737_494910507614158_1605265514601381888_n.jpg?_nc_cat=0&oh=683826aaf77a6cacb04bd5182cd6d740&oe=5BDAB89D')
    /* videos */
    expect(media).to.not.have.property('videos')

    /* user */
    expect(media).to.have.property('usuario')
    const user = media.usuario
    expect(user).to.have.property('id', 'instagram|1719443085')
    expect(user).to.have.property('username', 'melhorjuntos')
    expect(user).to.have.property('foto', 'https://scontent.xx.fbcdn.net/v/t51.2885-15/35480222_1566271556817364_3959603905792311296_n.jpg?_nc_cat=0&oh=945a7339c8fe9ad52eb6e925f57070d8&oe=5BD059D3')
    expect(user).to.have.property('nome', 'G A B R I E L A  M A R I N O')

    /* metadata */
    expect(media).to.have.property('metadados')
    const metadata = media.metadados
    expect(metadata).to.have.property('idFacebook', '17929566949146367')

    done()
  })

  it('should return 2 mentions into list', () => {
    mock.caption = ' @username @username2 '
    const media = mapFacebookMedia(mock)
    console.log(media.mentions)
    expect(media.mentions).to.be.have.lengthOf(2)
    expect(media.mentions[0]).to.be.equal('username')
    expect(media.mentions[1]).to.be.equal('username2')
  })

  it('should return @ala.limpeza in mentions', () => {
    mock.caption = ' @ala.limpeza'
    const media = mapFacebookMedia(mock)
    console.log(media)
    expect(media.mentions[0]).to.be.equal('ala.limpeza')
  })

  it('if have 2 mentions using the username @ala.limpeza,should return only one', () => {
    mock.caption = ' @ala.limpeza @ala.limpeza'
    const media = mapFacebookMedia(mock)
    console.log(media)
    expect(media.mentions[0]).to.be.equal('ala.limpeza')
    expect(media.mentions.length).to.be.equal(1)
  })

  it('should return @username_123 in mentions', () => {
    mock.caption = '@username_123'
    const media = mapFacebookMedia(mock)
    console.log(media.mentions)
    expect(media.mentions).to.be.have.lengthOf(1)
    expect(media.mentions[0]).to.be.equal('username_123')
  })
})
