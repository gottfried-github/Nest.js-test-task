const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        assetModuleFilename: '[name][ext]'
      },
    entry: {
        index: './src/front-end/index.js'
    },
    mode: "development",
    devtool: 'inline-source-map',
    module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'images/[name][ext]'
            }
          },
          {
            test: /\.(html|css)$/i,
            type: 'asset/resource',
            generator: {
                filename: '[name][ext]'
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
            ],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: { presets: ["@babel/env", "@babel/preset-react"] }
          },
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        // chunkFilename: "[id].css",
      }),
    ]
}