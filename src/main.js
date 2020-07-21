const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const api = require("./api/Api");

class TryAnalytics {
  constructor() {
    this.http = null;
    this.app = null;
    this.port = process.env.PORT || 8086;

    this.configServer();
    this.registerEndpoints();
  }

  configServer() {
    this.app = express();
    this.http = require("http").Server(this.app);
    this.app.use(cors());
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));

    this.http.listen(this.port, () => {
      console.log("Server is listening on *:" + this.port); // eslint-disable-line
    });
  }

  registerEndpoints() {
    this.app.use("/", express.static("./dist"));

    this.app.post(`${api.apiPath}/saveResult`, api.saveResult.bind(api));
    this.app.get(`${api.apiPath}/getResult`, api.getResult.bind(api));
  }
}

const tryAnalytics = new TryAnalytics();
