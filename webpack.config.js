var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        fullPage: path.resolve(__dirname, './lib/fullpage/fullpage.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name].js', //此格式写法后续会提到为什么
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        hash: true,
        template: './demo/fullpage/index.html',
        inject: 'head'
    })]
}