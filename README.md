# Squid Libs

Projeto que agrupa libs privadas da organização Squid

## Instalação

```sh
$ npm install github:squidit/sq-libs
```

## Projetos

[sq-media-mapping](https://github.com/squidit/sq-libs/blob/master/sq-media-mapping/README.md)

[sq-pinterest-v3](https://github.com/squidit/sq-libs/blob/master/sq-pinterest-v3/README.md)

## Uso

```js
const {
    sqMediaMapping,
    sqPinterest
} = require('sq-libs')

// Funções do sq-media-mapping no Readme acima
sqMediaMapping.mapInstagramMedia(media)

// Funções do sq-pinterest-v3 no Readme acima
sqPinterest.userSelf(token)

```

### ENVs necessárias sq-pinterest

Para rodar o projeto é necessário ter as seguintes ENVs:
```
PINTEREST_CLIENT_ID=
PINTEREST_CLIENT_SECRET=
```
