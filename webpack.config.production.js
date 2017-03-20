var webpack = require('webpack');
var path = require('path');

var webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.sass', '.css']
    },
    entry: [
        'webpack-production-server/client?http://localhost:3000',
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'source-map'
};

module.exports = webpackConfig;
