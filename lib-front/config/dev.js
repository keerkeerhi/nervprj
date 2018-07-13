const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        // devtool: "source-map"
    })
}