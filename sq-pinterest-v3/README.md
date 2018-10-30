# Squid Pinterest API v3

Projeto que encapsula chamadas para a API do Pinterest v3.

## Instalação

```sh
$ npm install github:squidit/sq-pinterest-v3-api
```

## Uso

O projeto dispõe de funções que simplificam chamadas para a API v3 do Pinterest.

### Autenticação

Enviar usuário para o processo de liberação para a página de OAuth em: https://www.pinterest.com/oauth/

Parâmetros para enviar na query string:

```json
{
    "consumer_id": "1447917",
    "redirect_uri": "[PINTEREST_REDIRECT_URI]",
    "response_type": "code"
}
```

Exemplo:
https://www.pinterest.com/oauth/\
?consumer_id=1447917\
&redirect_uri=https%3A%2F%2Fwww.example.com%2Foauth%2Fpinterest%2Foauth_response%2F\
&response_type=code

Após o usuário liberar o uso da aplicação, ele é redirecionado para a URL informada no passo anterior, com os seguintes parâmetros de retorno:

https://www.example.com/oauth/pinterest/oauth_response/?code=dc2674ed56709ec4d6760ee2f017ab0fd07895d4

O parâmetro `code` deverá ser enviado para poder retornar o `access_token` do usuário

### Funções

Exemplo de código para usar as funções da lib

```js
const sqPinterest = require('sq-pinterest-v3')

// função que gera um token a partir de um `code` gerado no callback de login do Pinterest
const token = await sqPinterest.token(code)

// função que busca informações de um usuário baseado no `accessToken` do Pinterest dele
const userSelf = await sqPinterest.userSelf(accessToken)

// função que busca informações de um usuário baseado no `userId` dele
const user = await sqPinterest.userGet(userId)

// função que busca informações dos pins de um usuário baseado no `accessToken` dele
const pinsSelf = await sqPinterest.pinsSelf(accessToken)

// função que busca informações de um pin baseado no `pinId` e algum `accessToken` válido
const pin = await sqPinterest.pinsSelf(pinId, accessToken)

// função que busca informações dos boards de um usuário baseado no `accessToken` dele
const boardsSelf = await sqPinterest.boardsSelf(accessToken)

// função que realiza uma request qualquer na api do Pinterest v3 baseado no `path` e `method` da request, parametros da query string `query` e se precisa gerar assinatura `oauth_signature`
const response = await sqPinterest.got(path, method, query, oauth_signature)
/* Exemplo: const query = {
    client_id: PINTEREST_CLIENT_ID,
    timestamp: new Date().getTime()
  }
  
  const response = await sqPinterest.got(`/users/${userId}`, 'get', query, true) */

```

### ENVs necessárias

Para rodas o projeto é necessário ter as seguintes ENVs:
```
PINTEREST_CLIENT_ID=
PINTEREST_CLIENT_SECRET=
```
