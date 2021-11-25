const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
module.exports = {
  // Where files should be sent once they are bundled
 output: {
   path: path.join(__dirname, '/..', '/public'),
   filename: 'index.bundle.js',
   publicPath: '/'
 },
 entry: './src/index.js',
 devtool: 'eval-cheap-module-source-map',

// Rules of how webpack will take our files, compile & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(ts|js)x?$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader",
         options: {
           presets: [
             "@babel/preset-env",
             "@babel/preset-react",
             "@babel/preset-typescript",
            ],
          },
        },
      },
      { test: /\.tsx?$/, include: /front/},
      {
        test: /\.(scss)$/,
        use: [{
          // inject CSS to page
          loader: 'style-loader'
        }, {
          // translates CSS into CommonJS modules
          loader: 'css-loader'
        }, {
          // Run postcss actions
          loader: 'postcss-loader',
          options: {
            // `postcssOptions` is needed for postcss 8.x;
            // if you use postcss 7.x skip the key
            postcssOptions: {
              // postcss plugins, can be exported to postcss.config.js
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader'
        }]
      }, {
        test: /\.svg$/,
        use: [
            {
                loader: "@svgr/webpack"
            },
            {
              loader: "file-loader",
              options: {
                name: 'assets/[path][name].[ext]',
              },
            }
        ],
        type: "javascript/auto",
        issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/]
        }
    }, {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
   ]
 },
 resolve: {
  alias: {     
    // bind to modules;
    modules: path.join(__dirname, "node_modules")
   },
   extensions: ['.tsx', '.ts', '.js'],
  },
 plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html', 
    inject: false
  }),
  new FaviconsWebpackPlugin("./src/assets/favicon.png"),
 ]
}