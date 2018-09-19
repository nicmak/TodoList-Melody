const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const port = 3000

module.exports = {
  mode: 'development',
  entry: ['./src/main.js'], // entry point of app
  output: {
    filename: 'bundle.[hash].js', //we provide a hash because helps with caching
    publicPath: '/'
  },
  devtool: 'inline-source-map', //makes source maps, helps with debugging
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.twig$/,
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
        test: /\.(png|jpg|svg|gif|jpeg)$/,
        use: ['url-loader?limit=1']
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.filterAvail': true,
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    port
  }
}
