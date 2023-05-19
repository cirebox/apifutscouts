
# API de Scout de Futebol
Esta é uma API desenvolvida em Node.js utilizando o framework NestJS e TypeScript, juntamente com a biblioteca Axios. A API tem como objetivo fornecer recursos para um sistema de scout de futebol, permitindo consultas de atualização de informações sobre jogadores, times e partidas.

## Motivação
A escolha das tecnologias utilizadas na API é fundamentada nos seguintes motivos:

* Nodejs: Eficiência e escalabilidade para operações de I/O assíncronas, além de um ecossistema rico em bibliotecas e ferramentas.

* NestJS: Abordagem modular e baseada em componentes que facilita a organização do código e a implementação de boas práticas de desenvolvimento. Construído em cima do Express.js, oferecendo flexibilidade e desempenho.

* TypeScript: Adiciona tipagem estática ao JavaScript, tornando o código mais robusto e menos propenso a erros. Fornece recursos avançados de desenvolvimento, como autocompletar e refatoração segura de código.

* Axios: Biblioteca para realizar chamadas HTTP a serviços externos. Fácil de usar e oferece uma sintaxe limpa para trabalhar com requisições e respostas HTTP.

## Rodando a Aplicação

Siga as etapas abaixo para executar a aplicação em seu ambiente local:

Certifique-se de que o Node.js esteja instalado em sua máquina. Você pode obtê-lo em https://nodejs.org.
Clone o repositório da API de Scout de Futebol:
```bash
git clone https://github.com/cirebox/apifutscouts.git
```
Navegue até o diretório raiz do projeto:
```bash
cd apifutscouts
```
Instale as dependências do projeto:
```bash
npm install
```
Inicie a aplicação:
```bash
npm run start
```
A API estará disponível no seguinte endereço: http://localhost:3000.

Agora você pode usar um cliente HTTP, como o Postman ou o cURL, para enviar requisições à API de Scout de Futebol e testar os recursos disponíveis.

## Endpoints Disponíveis
A documentação completa dos endpoints da API, incluindo os métodos suportados e os parâmetros necessários, está disponível na rota /api/v1 após a execução da aplicação.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```