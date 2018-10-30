const isArray = require('lodash/isArray')
const mean = require('lodash/mean')

const features = require('./features/features')
const featureTags = require('./features/feature-tags')

function mapSquidMediaToFeatureObject (squidMedia) {
  const featureObject = {}
  const emotionFaces = squidMedia.analiseVisual.facesEmocao
  const visualTags = squidMedia.analiseVisual.descricao.categorias

  featureTags.forEach(featureTag => {
    featureObject[featureTag] = visualTags.includes(featureTag)
  })

  featureObject.anger = mean(emotionFaces.map(face => face.pontuacao.raiva)) || 0
  featureObject.contempt = mean(emotionFaces.map(face => face.pontuacao.desprezo)) || 0
  featureObject.disgust = mean(emotionFaces.map(face => face.pontuacao.nojo)) || 0
  featureObject.fear = mean(emotionFaces.map(face => face.pontuacao.medo)) || 0
  featureObject.happiness = mean(emotionFaces.map(face => face.pontuacao.felicidade)) || 0
  featureObject.neutral = mean(emotionFaces.map(face => face.pontuacao.neutro)) || 0
  featureObject.sadness = mean(emotionFaces.map(face => face.pontuacao.tristeza)) || 0
  featureObject.surprise = mean(emotionFaces.map(face => face.pontuacao.surpresa)) || 0

  featureObject.adultScore = squidMedia.analiseVisual.adulto.pontuacaoAdultoExplicito
  featureObject.racyScore = squidMedia.analiseVisual.adulto.pontuacaoAdultoImplicito
  featureObject.likes = squidMedia.upvotes
  featureObject.comments = squidMedia.comentarios
  featureObject.dominantColorBackground = squidMedia.analiseVisual.cor.corDominantePlanoFundo
  featureObject.dominantColorForeground = squidMedia.analiseVisual.cor.corDominantePrimeiroPlano
  featureObject.filter = squidMedia.metadados.filter

  return featureObject
}

function mapSquidMediaToFeatures (squidMedia) {
  const featureObject = mapSquidMediaToFeatureObject(squidMedia)

  return features.map(feature => featureObject[feature])
}

module.exports = function mapSquidMedia (medias) {
  return isArray(medias)
    ? medias.map(mapSquidMediaToFeatures)
    : mapSquidMediaToFeatures(medias)
}
