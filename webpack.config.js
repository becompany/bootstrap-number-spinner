const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'dist'),
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'prism-loader',
            options: {
              languages: [ 'typescript' ]
            }
          }
        ]
      }
    ]
  }
};