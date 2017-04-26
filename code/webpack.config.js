'use strict';
let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'main': './app/main.ts',
    'polyfill': './app/polyfill.ts'
  },

  context: path.join(process.cwd(), 'src'),

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve(process.cwd(), 'src', 'app'),
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        exclude: path.resolve(process.cwd(), 'src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(process.cwd(), 'src')
    ),
    new CopyWebpackPlugin([
      { from: 'index.html' },
      { from: 'favicon.ico' }
    ]),
    new ExtractTextPlugin('style.bundle.css')
  ],

  resolve: {
    modules: [
      'node_modules',
      path.resolve(process.cwd(), 'src')
    ],
    extensions: ['.ts', '.js']
  },

  devServer: {
    contentBase: './src',
    port: 8080,
    inline: true,
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500
    }
  },

  stats: 'errors-only',

  devtool: 'source-map'
};
