const mongoose = require("mongoose");
const { ErrorWithCodes } = require("../errors/errors");

class DataStorageManager {
  constructor() {
    const PerfDataSchema = new mongoose.Schema(
      {
        url: String,
        data: {
          ttfb: Number,
          fcp: Number,
          resources: Array,
          DOMLoadTime: Number,
        },
      },
      { timestamps: { createdAt: "createdAt" }, versionKey: false },
    );
    this.dataSchema = mongoose.model("PerfData", PerfDataSchema);
  }

  /**
   * Database connection function
   * @param config
   */
  connect(config) {
    console.log(config);
    mongoose.connect(`mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  /**
   * This function save analytics data
   * @param payload
   * @returns {Promise}
   */
  saveData(payload) {
    return new Promise(async (resolve, reject) => {
      console.log(payload);
      if (!payload) {
        return reject(ErrorWithCodes.EMPTY_PAYLOAD);
      }

      const { token, url } = payload;

      // Check token exist
      if (!token) {
        return reject(ErrorWithCodes.TOKEN_NOT_FOUND);
      }

      // Check url exist
      if (!url) {
        return reject(ErrorWithCodes.URL_NOT_FOUND);
      }

      // TODO (improvement) check token is valid

      // Delete data that will not be saved
      delete payload.token;

      try {
        await new this.dataSchema(payload).save();
        return resolve(payload);
      } catch (error) {
        return reject(error);
      }
    });
  }

  /**
   * This function return analytics data
   * @param params
   * @returns {Promise<unknown>}
   */
  getData(params) {
    return new Promise(async (resolve, reject) => {
      const { token, url } = params;
      let { startDate, endDate } = params;

      // Check token exist
      if (!token) {
        reject(ErrorWithCodes.TOKEN_NOT_FOUND);
      }

      // Check url exist
      if (!url) {
        reject(ErrorWithCodes.URL_NOT_FOUND);
      }

      // TODO (improvement) check token is valid

      let dataList = [];

      const now = new Date();
      startDate = startDate ? startDate : new Date(now.setMinutes(now.getMinutes() - 30));
      endDate = endDate ? endDate : new Date();

      try {
        dataList = await this.dataSchema.find({ url: url, createdAt: { $gte: startDate, $lte: endDate } });
        resolve(dataList);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = DataStorageManager;
