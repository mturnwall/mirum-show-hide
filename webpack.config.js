const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './show_hide.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
};
