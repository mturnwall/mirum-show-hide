const webpack = require('webpack');

function buildConfig(env) {
    return require('./webpack_' + env + '.config.js')({ env: env });
}

module.exports = buildConfig;
