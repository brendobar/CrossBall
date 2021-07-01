const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    target: 'web',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test:/\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                'postcss-loader'
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true, // webpack@1.x
                      disable: true, // webpack@2.x and newer
                    },
                  },
                ],
              }
        ]
    },
    devServer: {
        overlay: true
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css'
        }),
      ]
      
}