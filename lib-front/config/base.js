const ExtractTextPlugin = require('extract-text-webpack-plugin')     //打包的css拆分,将一部分抽离出来
const webpack = require('webpack'); //引入的webpack,使用lodash
const HtmlWebpackPlugin = require('html-webpack-plugin')  //将html打包
const path = require('path');  //引入node的path模块
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function() {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'), //定位，输出文件的目标路径
            filename: '[name].js',
            // publicPath: publicPath,
            // sourceMapFilename: '[name].map'
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        resolve: {
            alias: {
                'react': 'nervjs',
                'react-dom': 'nervjs',
                // 除非你想使用 createClass，否则这一条配置是没有必要的
                'create-react-class': "nerv-create-class"
            },
            modules: [ // 模块的查找目录
                path.resolve(__dirname, '../node_modules')
            ],
            extensions: [".js", ".json", ".jsx", ".css"], // 用到的文件的扩展
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    // include: [
                    //     path.resolve(__dirname, 'src')
                    // ],
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    include: [
                        path.resolve(__dirname, '../src/assets')
                    ],
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader'
                        ]
                    })
                },
                {
                    test: /\.css$/,
                    exclude: [
                        path.resolve(__dirname, '../src/assets'),
                    ],
                    // use: 'css-loader'
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader',
                                options: {
                                    modules: true,
                                    sourceMap: true,
                                    importLoaders: 1,
                                    localIdentName: '[name]__[local]___[hash:base64:5]'
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: [
                        {
                            loader: 'file-loader' //根据文件地址加载文件
                        }
                    ]
                }, {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader?limit=100000' //
                        }
                    ]
                }
            ],
        },
        plugins: [
            // 提取css
            new ExtractTextPlugin('style.css'),

            new CopyWebpackPlugin([  //src下其他的文件直接复制到dist目录下
                { from:'src/assets',to: 'assets' }
            ]),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html'
            })
        ],
    };
}