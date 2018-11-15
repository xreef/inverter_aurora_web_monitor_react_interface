const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// let ExtractTextPlugin = require("extract-text-webpack-plugin");

const DIST_DIR = path.resolve(__dirname, 'dist');
const AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:['
    + '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", '
    + '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};
const reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};
const momentExternal = {
  root: 'moment',
  commonjs2: 'moment',
  commonjs: 'moment',
  amd: 'moment'
};
const polyfillExternal = {
  root: 'babel-polyfill',
  commonjs2: 'babel-polyfill',
  commonjs: 'babel-polyfill',
  amd: 'babel-polyfill'
};

const externalmw = {
  react: reactExternal,
  'react-dom': reactDOMExternal,
  'babel-polyfill': polyfillExternal
};

const externalisp = {
  react: reactExternal,
  'react-dom': reactDOMExternal

  // , 'babel-polyfill': polyfillExternal
};

module.exports = function (env) {
  return {
    entry: {
      'aurora-web.min': ['babel-polyfill', `./src/index${(env.distType) ? `-${env.distType}` : ''}.jsx`],
      'aurora-web': ['babel-polyfill', `./src/index${(env.distType) ? `-${env.distType}` : ''}.jsx`]
    },
    externals: (env.distType === 'wrapper-mw') ? externalmw : externalisp,

    output: {
      path: DIST_DIR,
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'AuroraWeb',
      sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.css$/,
          loader: `style-loader!css-loader!${AUTOPREFIXER_LOADER}`
        },
        {
          test: /\.less$/,
          loader: `style-loader!css-loader!${AUTOPREFIXER_LOADER
          }!less-loader`
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
        }, {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015'],
            plugins: ['transform-object-rest-spread', 'transform-class-properties',
              ['transform-runtime', {
                'react-intl': {
                  messagesDir: './build/messages',
                  enforceDescriptions: false
                }
              }
              ]
            ]
          }

        }, {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
        }
      ]
    },

    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          include: /\.min\.js$/,
          sourceMap: true
        })
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(it|en)$/),
      new Visualizer({
        filename: `./statistics-${env.distType}.html`
      }),
      // new ExtractTextPlugin("styles.css"),
    ],

    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
    }
  };
};
