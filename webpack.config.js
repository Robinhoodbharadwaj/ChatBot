'use strict';

const path = require('path');
const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
require('dotenv').config();

module.exports = {
  watch: true,
  devtool: 'eval-source-map', // For generating sourcemaps, debugging purpose
  entry: [
    path.join(__dirname, 'src')
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'dist',
    inline: true,
    host: process.env.IP,
    watchContentBase: true,
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'public/img/favicon.ico',
      template: 'public/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    // create global variables accessible on client
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify('development'),
      ENGINE: JSON.stringify(process.env.ENGINE),
      API_KEY: JSON.stringify(process.env.API_KEY)
    })
  ],
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          fix: true,
          emitError: true,
          configFile: './.eslintrc.json'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        // For all .css files except from node_modules
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {loader: 'css-loader'}
        ]
      },
      {
        // For all .css files in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less'
      },

      // SASS
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
};
