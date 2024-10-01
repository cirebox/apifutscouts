import { SwaggerCustomOptions } from "@nestjs/swagger";

export const customOptions: SwaggerCustomOptions = {
  // swaggerOptions: {
  //   persistAuthorization: true,
  // },
  customSiteTitle: "API FutBox",
  jsonDocumentUrl: '/docs/json', // URL do arquivo JSON da documentação
  explorer: true, // Permite a exploração de diferentes endpoints na interface
  swaggerOptions: {
    docExpansion: 'none',           // Expande ou colapsa as seções na UI ('none', 'list', 'full')
    filter: true,                   // Adiciona um campo de busca para filtrar os endpoints
    tagsSorter: 'alpha',            // Ordena as tags em ordem alfabética
    operationsSorter: 'alpha',      // Ordena as operações (endpoints) em ordem alfabética
    displayRequestDuration: true,   // Mostra a duração da requisição nas respostas da API
  },
};
