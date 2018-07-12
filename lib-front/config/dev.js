module.exports = function (env) {
    return {
        devtool: 'cheap-module-source-map',
        devServer: {
            port: 7777,
            host: 'localhost',
            historyApiFallback: true,
            noInfo: false,
            stats: 'minimal',
            publicPath: publicPath
        }
    }
}