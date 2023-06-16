const webpack = require("webpack");

const configuration = {
  mode: "development",
  entry: "./file-to-import-from.js",
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

const compiler = webpack(configuration);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    const dependencyGraph = require("dependency-graph")(stats.toJson());

    console.log(dependencyGraph);
  }
});