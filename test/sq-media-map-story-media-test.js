/* eslint-disable */
const chai = require('chai')
const { expect } = require('chai')
chai.use(require('chai-datetime'))
const mapStoryMedia = require('../sq-media-mapping/src/map-story-media')
const mock = require('./mock/story-media-mock')

describe('Story FB mapping to Squid medias', () => {
  it('should map an Story to Squid media format', (done) => {
    const media = mapStoryMedia(mock)

    expect(media).to.have.property('uid', '1673265261993302752_6097620011')
    expect(media).to.have.property('link', 'https://www.instagram.com/p/BcuRZHXnT3o/')
    expect(media).to.have.property('tipo', 'imagem_stories')
    expect(media).to.have.property('upvotes', 0)
    expect(media).to.have.property('origem', 'instagram')
    expect(media).to.have.property('comentarios', 0)
    expect(media).to.have.property('legenda', 'teste pixote legenda')
    expect(media).to.have.property('criadoEm')
    expect(media.criadoEm).to.equalDate(new Date('Tue Dec 15 2017'))
    expect(media).to.have.property('obtidoEm')
    expect(media.obtidoEm).to.equalDate(new Date())

    /* images */
    expect(media).to.have.property('imagens')
    const images = media.imagens
    expect(images.resolucaoPadrao).to.have.property('url', 'https://scontent.xx.fbcdn.net/t51.12442-9/24845949_166019907337772_6869502492883812352_n.jpg')
    expect(images.resolucaoPadrao).to.have.property('width', 640)
    expect(images.resolucaoPadrao).to.have.property('height', 640)
    expect(images.resolucaoMedia).to.have.property('url', 'https://scontent.xx.fbcdn.net/t51.12442-9/24845949_166019907337772_6869502492883812352_n.jpg')
    expect(images.resolucaoMedia).to.have.property('width', 320)
    expect(images.resolucaoMedia).to.have.property('height', 320)
    expect(images.thumbnail).to.have.property('url', 'https://scontent.xx.fbcdn.net/t51.12442-9/24845949_166019907337772_6869502492883812352_n.jpg')
    expect(images.thumbnail).to.have.property('width', 150)
    expect(images.thumbnail).to.have.property('height', 150)

    /* videos */
    expect(media).to.not.have.property('videos')

    /* user */
    expect(media).to.have.property('usuario')
    const user = media.usuario
    expect(user).to.have.property('id', 'instagram|6097620011')
    expect(user).to.have.property('username', 'sandbox5305')
    expect(user).to.have.property('foto', 'https://scontent.xx.fbcdn.net/v/t51.2885-15/26332892_185971878656916_4417254627053928448_n.jpg?_nc_cat=0&oh=9cf05ae98ec1286049490b671bfd37be&oe=5B8968BD')
    expect(user).to.have.property('nome', 'Sandbox')

    done()
  })
})
