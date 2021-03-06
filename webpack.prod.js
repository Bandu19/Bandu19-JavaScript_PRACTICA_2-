const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    clean: true,
    filename: "main.[contenthash].js", //Nombre de Producción.
  },
  /**
   * El module es el comienzo de la
   * configuración del webpack
   */
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader",
      },
      {
        test: /\.m?js$/,
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

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizer(), new TerserPlugin()],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      /**
       * El fullhas se utiliza en modo producción
       */
      // filename: "[name].[fullhash].css",
      filename: "[name].[fullhash].css",
      ignoreOrder: false,
    }),

    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets" }],
    }),
  ],
};
