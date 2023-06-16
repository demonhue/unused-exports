module.exports = {
    mode: "development",
    entry: "./src/file-to-import-from.js",
    output: {
      filename: "bundle.js"
    },
    resolve: {
      extensions: [".js"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  };