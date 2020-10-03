const merge = require('webpack-merge');
const appCommonConfig = require('./webpackCommon.js');
const path = require('path');

module.exports = env => merge.merge( appCommonConfig(env), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.bundle.js'
  }
});