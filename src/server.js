import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./router/web";
import conNectDB from "./config/conNectDB";
var cookieParser = require("cookie-parser");
var morgan = require("morgan");

require("dotenv").config();

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "https://api-psi-teal.vercel.app/",
      description: "Development server",
    },
  ],
};
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.2/swagger-ui.min.css";
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [`${__dirname}/controllers/*.js`],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
const path = require("path");

viewEngine(app);
initWebRouters(app);

conNectDB();
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use((req, res, next) => {
  res.status(404).send("Page No Found");
});

let port = process.env.PORT;

app.listen(port, () => {
  console.log("backend node js cổng :" + port);
  console.log("khoi tao thanh cong web : http://localhost:3000/");
});
