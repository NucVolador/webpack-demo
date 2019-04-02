const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    mode: 'development',
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
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../')
        })
    ],
    // tree shaking
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: false,
                default: false
            }
        }
    },
    output: {
        path: path.resolve(__dirname, '../bundle')
    }
}

module.exports =  config;