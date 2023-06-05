import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

// Get the current directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: "./public/controller.js",
  output: {
    filename: "bundle.js",
    chunkFilename: "[name].js", // Add this line to generate chunk files with appropriate names
    path: path.resolve(__dirname, "dist"),
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
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
};
