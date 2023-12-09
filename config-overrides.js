const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    "@api": path.resolve(__dirname, "src/api"),
    "@app": path.resolve(__dirname, "src/app"),
    "@components": path.resolve(__dirname, "src/components"),
    "@features": path.resolve(__dirname, "src/features"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@utils": path.resolve(__dirname, "src/utils"),
  };

  return config;
};
