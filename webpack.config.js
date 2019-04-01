const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle')
    },
    module:{
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'font'
                        }
                    }
                ]
            },{
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/',
                            limit: 10240
                        }
                    }
                ]
            },{
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // css module  和 vue中的scoped一样
                            modules: true,
                        }
                    }
                ]
            },{
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },{
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    },{
                        loader: 'postcss-loader',
                        options: {

                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 进行html文件的创建，并自动加载 打包生成的 js css文件，
        // 此plugin在有hash值是特别好用
        // 详细用法见 https://github.com/jantimon/html-webpack-plugin#configuration
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'template'
        }),
        // 在打包前删除 output的目录，然后重新打包
        new CleanWebpackPlugin()
    ]
}