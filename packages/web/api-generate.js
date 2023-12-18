import { generateApi } from "swagger-typescript-api";
import path from "node:path";
import process from "node:process";

generateApi({
  url: "http://localhost:3000/docs/json",
  output: path.resolve(process.cwd(), "./src/api"),
  httpClientType: "axios",
  modular: true,
  templates: path.resolve(process.cwd(), "./api-templates"),
  extractRequestParams: true,
  unwrapResponseData: false,
  hooks: {
    onCreateRoute: (routeData) => {
      routeData.request.path = `/api${routeData.request.path}`;
      routeData.raw.moduleName = routeData.request.path.split("/")[3];
      routeData.namespace = routeData.raw.moduleName;
    },
  },
});
