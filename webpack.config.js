const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
     {
       test: /\.css$/,
       exclude: /node_modules/,
       use: ['style-loader', 'css-loader']
     }
   ]
 },
 resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
 plugins: [
   new HtmlWebpackPlugin({ template: './src/index.html' })
 ]
}