class DataStorageManager {
  saveData(data) {
    console.log("data", data);
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  getData(params) {
    return new Promise((resolve, reject) => {
      console.log("get result", params);
      reject();
    });
  }
}

module.exports = DataStorageManager;