const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    tets: "./src/react.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
