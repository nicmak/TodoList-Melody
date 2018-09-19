const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['./src/main.js'], // entry point of app
  devtool: 'source-map',
  output: {
    filename: 'bundle.js', //we provide a hash because helps with caching
    publicPath: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.twig$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'melody-loader',
            options: {
              plugins: ['idom']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.filterAvail': true,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
