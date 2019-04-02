const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.common.js');

const dev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8888,
        contentBase: './bundle',
        open: true,
        hot: true
        // hotOnly: true    //强制不刷新浏览器，只能热模块替换
    },
    module: {
        rules: [
            {
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
                            importLoaders: 2
                        }
                    },
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].js'
    }
}

module.exports =  merge(config, dev);