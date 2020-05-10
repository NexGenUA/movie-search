const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {

  entry: ['@babel/polyfill', './src/index.ts', './src/styles/style.scss'],
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 4200,
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].style.css',
    }),
    new CopyPlugin([
      { from: './src/assets/fav', to: './' },
      { from: './src/mock/images', to: './assets' },
    ]),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: { outputPath: 'assets/fonts' },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[hash:7].[name].[ext]',
          outputPath: './assets/img',
        },
      },
      {
        test: /\.mp3$/i,
        loader: 'file-loader',
        options: {
          name: '[hash:7].[name].[ext]',
          outputPath: 'assets/audio',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },

};
