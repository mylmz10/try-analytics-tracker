const express = require("express");
const cors = require("cors");

let http;
let app;
const PORT = 8085;

function main() {
  app = express();
  http = require("http").Server(app);
  app.use(cors());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  http.listen(PORT, function () {
    console.log("Server is listening on *:" + PORT); // eslint-disable-line
  });
  registerEndpoints();
}

function registerEndpoints() {
  app.use("/", express.static("./dist"));
}

main();
