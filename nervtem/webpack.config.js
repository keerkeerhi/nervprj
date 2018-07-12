const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
}
