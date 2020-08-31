const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeSass = require('node-sass');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDevelopment = process.env.NODE_ENV === 'development';
const analyzeBundle = process.env.ANALYZE_BUNDLE;

module.exports = [
  {
    // entry: { 'no-react': './src/no-react.js', index: './src/index.js' },
    entry: './src/index.js',
    externals: [nodeExternals()],
    output: {
      filename: 'index.js',
      library: 'a11ize',
      libraryTarget: 'umd',
      path: path.join(__dirname, '/dist/react'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      //   chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
      // }),
    ],
    module: {
      rules: [
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            // isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'dashes',
                },
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
                implementation: nodeSass,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.(s(a|c)ss)$/,
          loader: [
            // isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      esmodules: true,
                    },
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
        },
        {
          test: /\.ya?ml$/,
          type: 'json', // Required by Webpack v4
          use: 'yaml-loader',
        },
      ],
    },
  },
  {
    // entry: { 'no-react': './src/no-react.js', index: './src/index.js' },
    entry: './src/no-react.js',
    // externals: [nodeExternals()],
    output: {
      filename: 'index.js',
      library: 'a11ize',
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, '/dist/no-react'),
      // publicPath: 'http://acoolplaceholderurl.net/',
    },
    resolve: {
      mainFields: ['module', 'main'],
      // extensions: ['.ts', '.tsx', '.js'],
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      },
    },
    stats: {
      // Examine all modules
      maxModules: Infinity,
      // Display bailout reasons
      optimizationBailout: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      //   chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
      // }),
      // new DynamicPublicPathPlugin({
      //   externalGlobal: 'window.publicPath', // Your global variable name.
      //   chunkName: 'app', // Chunk name from "entry".
      // }),
      analyzeBundle ? new BundleAnalyzerPlugin() : () => {},
    ],
    module: {
      rules: [
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            // isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'dashes',
                },
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
                implementation: nodeSass,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.(s(a|c)ss)$/,
          loader: [
            // isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
        },
        {
          test: /\.ya?ml$/,
          type: 'json', // Required by Webpack v4
          use: 'yaml-loader',
        },
      ],
    },
  },
];
