const WebpackPluginAutoUid = require("webpack-plugin-auto-uid");
module.exports = {
  entry: "./index.js",
  outputDir: "./dist",
  plugins: [
    new WebpackPluginAutoUid({
      enable: process.env.NODE_ENV === "production",
      debug: true
    })
  ]
};
