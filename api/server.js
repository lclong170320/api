import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import viewEngine from "../src/config/viewEngine";
import initWebRouters from "../src/router/web";
import conNectDB from "../src/config/conNectDB";
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
const path = require("path");

viewEngine(app);
initWebRouters(app);

conNectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.status(404).send("Page No Found");
});

let port = process.env.PORT;

app.listen(port, () => {
  console.log("backend node js cổng :" + port);
  console.log("khoi tao thanh cong web : http://localhost:3000/");
});
