const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    entry:['babel-polyfill',path.join(__dirname,"src","index.js")],
    output:{
        path:path.resolve(__dirname,"dist"),
    },
    mode:"development",
    watch: true,
    module: {
        rules: [
          {
            test: [/\.?js$/,/\.?test\.js$/],
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader",
            ],
          },
        ]
      },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "src", "index.html"),
        }),
      ],




}