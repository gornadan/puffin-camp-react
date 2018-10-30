/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const webpack = require('webpack');
const { join } = require('path');
const PWAManifestPlugin = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CONFIG = require('./client.js');
const { PATH_SRC, PATH_PUBLIC, PATH_NODE_MODULES } = require('./common.js');

const PATH_SRC_INDEX = join(PATH_SRC, './index.jsx');

module.exports = merge(CONFIG, {
  bail: true,
  mode: 'production',

  entry: {
    main: PATH_SRC_INDEX,
  },

  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[local]-[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
        exclude: [PATH_NODE_MODULES],
        include: [PATH_SRC],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
        ],
        exclude: [PATH_SRC],
        include: [PATH_NODE_MODULES],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: join(PATH_PUBLIC, './index.html'),
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeComments: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      templateParameters: {
        NODE_PATH: process.env.NODE_PATH,
        PUBLIC_URL: process.env.PUBLIC_URL,
      },
      inlineSource: 'runtime~.+\\.js',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk..css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new PWAManifestPlugin({
      name: 'Puffin Camp',
      icons: [
        {
          src: join(PATH_PUBLIC, '/images/puffin-camp.jpg'),
          sizes: [96, 128, 192, 256, 384, 512, 1024], // multiple sizes
        },
      ],
      short_name: 'PuffC',
      description: 'Puffin Camp React workshops!',
      crossorigin: 'anonymous',
      background_color: '#212121',
    }),
  ],
});
