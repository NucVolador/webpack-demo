const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        vendor: ['lodash']
    },
    output: {
        filename: '[name]_[hash].js',
        path: path.resolve(__dirname, 'bundle')
    },
    module:{
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                options:{
                    ignore: [
                        /\/core-js/,
                    ],
                    // 装babel-loader  core-js3  polyfill babel/preset-env就行
                    // presets: [
                        // 这个preset是用于es6语法转换的
                        // useBuiltIns 只注入使用到的高级语法，为使用到的不注入
                        // ["@babel/preset-env",{
                        //     useBuiltIns: "usage",
                        //     corejs: "core-js@3",
                        //     targets: {
                        //         chrome: "67"
                        //     }
                        // }]

                        
                    // ],
                    // 下面这个是针对类库打包的配置
                    // 需要安装
                    // npm install --save-dev @babel/plugin-transform-runtime
                    // npm install --save @babel/runtime
                    // npm install --save @babel/runtime-corejs3
                    // 这种方式打包是用闭包引入的，不会污染全局环境
                    // plugins: [
                    //     ["@babel/plugin-transform-runtime",{
                    //         "absoluteRuntime": false,
                    //         "corejs": 3,
                    //         "helpers": true,
                    //         "regenerator": true,
                    //         "useESModules": false
                    //     }]
                    // ]
                } 
            },{
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
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8888,
        contentBase: './bundle',
        open: true,
        hot: true
        // hotOnly: true
    }
}