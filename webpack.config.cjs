const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "/public/controller.js", // Path to your main JavaScript file
  output: {
    filename: "bundle.js", // Name of the output bundle file
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "/public/index.html", // Path to your HTML file
      filename: "index.html", // Output HTML filename
    }),
  ],
};
