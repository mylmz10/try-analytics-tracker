const DataStorageManager = require("./DataStoreManager.js");

class Api {
  constructor() {
    this.path = "/api";
    this.dataStorageManager = new DataStorageManager();
    this.connectDB();
  }

  get apiPath() {
    return this.path;
  }

  connectDB() {
    this.dataStorageManager.connect({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
    });
  }

  saveResult(req, res) {
    this.dataStorageManager
      .saveData(req.body)
      .then((data) => {
        res.send({ state: true, data: data });
      })
      .catch((e) => {
        res.send({ state: false, error: e });
      });
  }
  getResult(req, res) {
    this.dataStorageManager
      .getData(req.query)
      .then((data) => {
        res.send({ state: true, data });
      })
      .catch((e) => {
        res.send({ state: false, error: e });
      });
  }
}

module.exports = new Api();
