const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {
    return {
        context:   path.resolve(__dirname, './example'),
        entry:     {
            'main': './main.js',
        },
        output:    {
            path:     path.resolve(__dirname, './example'),
            filename: '[name].bundle.js',
        },
        module:    {
            rules: [
                {
                    test:    /\.js$/,
                    exclude: /node_modules/,
                    loader:  "babel-loader",
                },
            ],
        },
        plugins:   [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
        ],
        devServer: {
            contentBase: [path.join(__dirname, 'example'), path.join(__dirname, 'dist')],
        },
    };
};
