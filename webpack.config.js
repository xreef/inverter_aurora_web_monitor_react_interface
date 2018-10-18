var fs = require('fs');
var path = require('path');
var webpack = require("webpack");


var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

module.exports = function(env) {return {
    entry: {
        'aurora-web.min': ["babel-polyfill", "./src/index.js"],
        'aurora-web':["babel-polyfill", "./src/index.js"]
    },
    // watch: true,
    // watchOptions: {
    //     poll: true
    // },

    stats: {
        hash: true,
        version: true,
        timings: true,
        assets: true,
        chunks: true,
        modules: true,
        reasons: true,
        children: true,
        source: true,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: true
    },
    devtool: "source-map",
    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {

        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!' + AUTOPREFIXER_LOADER
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!' + AUTOPREFIXER_LOADER +
                '!less-loader'
            },
            {
                test: /\.gif/,
                loader: 'url-loader?limit=10000&mimetype=image/gif'
            },
            {
                test: /\.jpg/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.svg/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },{
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                            query: {
                                presets: ['react', 'es2015'],
                                plugins: ['transform-object-rest-spread','transform-class-properties',
                                    ["transform-runtime", {
                                        "react-intl": {
                                            "messagesDir": "./build/messages",
                                            "enforceDescriptions": false
                                        }
                                    }
                                    ]
                                ]
                            }

            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader'
            },
            {
                test: /\.CSV$/,
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("develop")
            }
        }),
        // Compress, but don't print warnings to console
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: true})
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin()
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],


    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
    },
    devServer: {
        // publicPath: '/'
        // // ,compress: true
        // host: "0.0.0.0",
        host: "localhost",
        port: 9000
        , inline: true
        ,stats: {
            colors: true
        }
        , contentBase: 'src'

        ,open: true
        ,hot: true
         // , https: true
        // , https: {
        //     key: fs.readFileSync( "./resources/certificates/localhost_key.pem"),
        //     cert: fs.readFileSync("./resources/certificates/localhost.crt")
        // }
    }
}};
