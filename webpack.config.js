const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env, arg) => ({
  entry: "./src/client-tracker/tryAnalytics.js",
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
  plugins: [
    new Dotenv({
      path: "./.env",
    }),
  ],
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
