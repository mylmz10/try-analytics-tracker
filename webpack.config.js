const path = require("path");

module.exports = (env, arg) => ({
  entry: "./src/try-analytics.js",
  output: {
    filename: "try-analytics.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "TryAnalytics",
    libraryTarget: "window",
    libraryExport: "default",
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
});
