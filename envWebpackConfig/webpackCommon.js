const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = function (env) {

    let modeApp = 'electron_write_files'
    if (env && env.notWrite==='true') modeApp = 'normalMode'
    console.log(modeApp)

    return {
    entry: './src/main.js',
    module: {
      rules: [
        { test: /\.txt$/, use: 'raw-loader' },
        { 
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/'
            }
          }]
        },			
        { test: /\.(obj|glb)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'obj/'
            }
          }]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './envWebPackConfig/index.html',
        title: 'Composition',
      }),
      new webpack.ProvidePlugin({
        PIXI: 'pixi.js-legacy',
      }),
      new webpack.DefinePlugin({
        'MODE_APP': JSON.stringify(modeApp),
      })
    ]
  };
}