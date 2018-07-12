module.exports = function() {
    return {
        entry: './src/index.js',
        output: {
            // path: path.resolve(__dirname, 'dist'),
            // filename: 'bundle.js'
            path: path.join(__dirname, '/../dist/assets'),
            filename: '[chunkhash].[name].bundle.js',
            // publicPath: publicPath,
            sourceMapFilename: '[name].map'
        },
        resolve: {
            extensions: ['', '.ts', '.js', '.json'],
            modules: [path.join(__dirname, 'src'), 'node_modules']

        },
        module: {
            loaders: [
            { test: /\.js$/, use: 'babel-loader' },
            {
                test: /\.css$/,
                // use: 'css-loader'
                use: ExtractTextPlugin.extract({use: 'css-loader'})
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }],
        },
        plugins: [
            new ForkCheckerPlugin(),

            new webpack.optimize.CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency'
            })
        ],
    };
}