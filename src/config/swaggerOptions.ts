import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Quikdev Test",
    version: "1.0.0",
    description: "Api para teste de desenvolvedor Quikdev",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

export const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/entities/*.ts"],
};
