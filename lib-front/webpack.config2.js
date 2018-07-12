const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const cssFilename = 'static/css/[name].[contenthash:8].css';
// const extractTextPluginOptions =  { publicPath: Array(cssFilename.split('/').length).join('../') };

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        // use: 'css-loader'
        use: ExtractTextPlugin.extract({use: 'css-loader'})
      }
    ]
  },
  resolve: {
      alias: {
          'react': 'nervjs',
          'react-dom': 'nervjs',
          // 除非你想使用 `createClass`，否则这一条配置是没有必要的
          'create-react-class': "nerv-create-class"
      }
  },
  plugins: [
      // 提取css
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
}
