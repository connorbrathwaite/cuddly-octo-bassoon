const webpack = require('webpack')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
