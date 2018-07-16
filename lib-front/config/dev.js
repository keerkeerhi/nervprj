const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        devServer: {
            proxy: {
                "/api": {
                    "target": "http://localhost:8888",
                    "changeOrigin": true,
                    "pathRewrite": {"^/api": "/api"}
                }
            }
        },
        // devtool: "source-map"
    })
}