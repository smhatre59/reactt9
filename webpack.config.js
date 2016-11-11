var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'js/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
           presets: ['es2015','react','stage-0'],
           plugins: ['react-html-attrs', 'transform-class-properties','transform-decorators-legacy']
        }
      }]
  }
};

module.exports = config;
