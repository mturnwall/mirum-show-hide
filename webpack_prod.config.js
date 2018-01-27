const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {
    return {
        context: path.resolve(__dirname, './'),
        entry: ['./src/show_hide.js'],
        output:  {
            path:     path.resolve(__dirname, './dist'),
            filename: '[name].min.js',
        },
        module:  {
            rules: [
                {
                    test:    /\.js$/,
                    exclude: /node_modules/,
                    loader:  "babel-loader",
                },
            ],
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                beautify: false,
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                }
            })
        ],
        devtool: 'source-map',
    };
};
