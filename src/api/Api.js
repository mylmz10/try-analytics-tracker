const DataStorageManager = require("./DataStoreManager.js");

class Api {
  constructor() {
    this.path = "/api";
    this.dataStorageManager = new DataStorageManager();
  }

  get apiPath() {
    return this.path;
  }

  saveResult(req, res) {
    this.dataStorageManager
      .saveData(req)
      .then(() => {
        res.send({ state: true });
      })
      .catch((e) => {
        res.send({ state: false, error: e });
      });
  }
  getResult(req, res) {
    this.dataStorageManager
      .getData(req)
      .then(() => {
        res.send({ state: true });
      })
      .catch((e) => {
        res.send({ state: false, error: e });
      });
  }
}

module.exports = new Api();
