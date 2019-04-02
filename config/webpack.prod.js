const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");
const merge = require('webpack-merge');
const config = require('./webpack.common.js');


const prod = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
    output: {
        filename: '[name]_[hash].js',
        path: path.resolve(__dirname, '../bundle')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    }
    
      
}

module.exports = merge(config, prod);