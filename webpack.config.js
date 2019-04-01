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
                test: /\.png|jpg|gif/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    }
}