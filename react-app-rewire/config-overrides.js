const webpack = require('webpack');

module.exports = function override(config, env) {

    config.plugins = [
        ...config.plugins,
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ];

    return config;

}
