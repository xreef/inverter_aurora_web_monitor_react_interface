let fs = require('fs');
let path = require('path');
let webpack = require("webpack");
let Visualizer = require('webpack-visualizer-plugin');
// let ExtractTextPlugin = require("extract-text-webpack-plugin");

let DIST_DIR = path.resolve(__dirname, 'dist');
let AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

let reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};
let reactDOMExternal = {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
};
let momentExternal = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment'
};
let polyfillExternal = {
    root: 'babel-polyfill',
    commonjs2: 'babel-polyfill',
    commonjs: 'babel-polyfill',
    amd: 'babel-polyfill'
};

let externalmw = {
    'react': reactExternal,
    'react-dom': reactDOMExternal,
    'babel-polyfill': polyfillExternal
};

let externalisp = {
    'react': reactExternal,
    'react-dom': reactDOMExternal

    // , 'babel-polyfill': polyfillExternal
};

module.exports =function(env) {
    return {
        entry: {
            'aurora-web.min': ["babel-polyfill", "./src/index"+((env.distType)?"-"+env.distType:"")+".js"],
            'aurora-web':["babel-polyfill", "./src/index"+((env.distType)?"-"+env.distType:"")+".js"]
        },
        externals: (env.distType==='wrapper-mw')?externalmw:externalisp ,

        output: {
            path: DIST_DIR,
            filename: "[name].js",
            libraryTarget: "umd",
            library: "AuroraWeb",
            sourceMapFilename: "[file].map"
        },
        devtool: "source-map",

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
                // {
                //     test: /\.(css|less)$/,
                //     use: ExtractTextPlugin.extract({
                //         use: [{
                //             loader: "css-loader"
                //         }, {
                //             loader: "less-loader"
                //         }],
                //         // use style-loader in development
                //         fallback: "style-loader"
                //     })
                // },
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
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(it|en)$/),
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                comments: false, // remove comments
                compress: {
                    unused: true,
                    dead_code: true, // big one--strip code that will never execute
                    warnings: false, // good for prod apps so users can't peek behind curtain
                    drop_debugger: true,
                    conditionals: true,
                    evaluate: true,
                    drop_console: true, // strips console statements
                    sequences: true,
                    booleans: true,
                },
                sourceMap: true
            }),
            new Visualizer({
                filename: './statistics-'+env.distType+'.html'
            }),
            // new ExtractTextPlugin("styles.css"),
        ],

        resolve: {
            extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
        }
    }
};
