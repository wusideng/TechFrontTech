const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const baseUrl = process.env.baseUrl;
const staticUrl = process.env.staticUrl;
const node_env = process.env.NODE_ENV || "development";

console.log("当前环境：", node_env);

const env = dotenv.config().parsed;

// 自动将所有环境变量转换为webpack可用的格式
const envKeys = {
  "process.env": JSON.stringify(env),
};
// const externals = [
//   /^antd$/,
//   /^react$/,
//   /^react-dom$/,
//   /^react-redux$/,
//   /^react-router-dom$/,
//   /^redux$/,
// ];
module.exports = {
  mode: node_env,
  optimization: {
    usedExports: true,
    minimize: true,
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-router|redux)[\\/]/,
          name: "react-vendor",
          priority: 20,
        },
        antdMobile: {
          test: /[\\/]node_modules[\\/](antd-mobile|antd-mobile-icons)[\\/]/,
          name: "antd-mobile",
          priority: 20,
        },
        moment: {
          test: /[\\/]node_modules[\\/](moment)[\\/]/,
          name: "moment",
          priority: 15,
        },
        pdfjs: {
          test: /[\\/]node_modules[\\/](pdfjs-dist)[\\/]/,
          name: "pdfjs-dist",
          priority: 14,
        },
        vendor: {
          test: /[\\/]node_modules[\\/](?!(react|react-dom|react-router-dom|core-js|regenerator-runtime)[\\/])/,
          name: "vendor",
          priority: 10,
        },
        polyfills: {
          test: /[\\/]node_modules[\\/](core-js|regenerator-runtime)[\\/]/,
          name: "polyfills",
          chunks: "async", // 只在需要时加载
          priority: 6,
        },
        common: {
          name: "common",
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },
  entry: "./src/index.js",
  devtool: node_env === "development" ? "source-map" : "source-map",
  devServer: {
    allowedHosts: ["http://localhost:8000", "localhost"],
    // contentBase: "./dist",
    publicPath: `/${baseUrl}/`,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: {
      rewrites: [
        {
          from: new RegExp(`^/${baseUrl}/`),
          to: `/${baseUrl}/index.html`,
        },
      ],
    },
    hot: true,
    // openPage: "index.html",
    port: 8001,
  },
  // externals : externals,
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        oneOf: [
          // 处理本地PDF worker文件
          {
            include: path.resolve(__dirname, "src/assets/file/pdf.worker.min.mjs"),
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                  // 输出目录,根据需要调整
                  outputPath: "assets/file/",
                },
              },
            ],
          },
          // 处理 pdfjs-dist 中的文件
          {
            include: path.resolve(__dirname, "node_modules/pdfjs-dist"),
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: ["@babel/plugin-proposal-optional-chaining"],
              },
            },
          },
        ],
      },
      {
        test: /\.pdf$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/file/",
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "控制台",
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "index.html"),
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    umdNamedDefine: true,
    publicPath: node_env == "development" ? `/${baseUrl}/` : `${staticUrl}/${baseUrl}/`,
  },
};
