const path = require('path');

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
    }
}