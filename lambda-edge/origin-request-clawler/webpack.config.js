const path = require("path");
const webpack = require("webpack");
const slsw = require("serverless-webpack");

module.exports = {
  mode: "production",
  entry: slsw.lib.entries,
  target: "node",

  // Fix output filename
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, ".webpack"),
    filename: "[name].js"
  },
  module: {}
};
