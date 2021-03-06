var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.sass', '.css']
    },
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './a9.css',
        './client.js'
    ],
    output: {
        path: path.resolve('./build/js'),
        publicPath: '/public/js/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    require.resolve('react-hot-loader'),
                    require.resolve('babel-loader')
                ]
            },
            { test: /\.json$/, loader: 'json-loader'},
            { test: /\.(css)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
        ]
    },
    node: {
        setImmediate: false
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    devtool: 'eval'
};

module.exports = webpackConfig;
