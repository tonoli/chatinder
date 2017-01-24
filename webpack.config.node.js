// for babel-plugin-webpack-loaders
require('babel-register');
const devConfigs = require('./webpack.config.development');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: devConfigs.module.rules.slice(1)  // remove babel-loader
  }
};
