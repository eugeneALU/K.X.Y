const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'development',
    context: srcPath,
    resolve: {
        alias: {
            states: path.resolve(srcPath, 'states'),
            utilities: path.resolve(srcPath, 'utilities'),
            components: path.resolve(srcPath, 'components'),
            api: path.resolve(srcPath, 'api')
        }
    },
    entry: {
        index: './index.jsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', { modules: false }],
                            'react'
                        ],
                        plugins: [
                            'babel-plugin-transform-class-properties',
                            'transform-object-rest-spread'
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
                    //'autoprefixer'
                ]
            }
        ]
    },
    optimization: { splitChunks: { name: 'vendor', filename: 'vendor.bundle.js', minChunks: 2 } },
    devServer: {
        contentBase: distPath,
        compress: true,
        hot:true,
        port: 6060
    },
    devtool: 'cheap-source-map'
};
