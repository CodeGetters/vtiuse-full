/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
// fork-ts-checker-webpack-plugin需要单独安装
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // 入口文件位置
  entry: "./src/main",
  // 指定构建目标为 node 环境
  target: "node",
  // 优化 externals 配置，只排除原生模块
  externals: [
    nodeExternals({
      // 将 @fastify 相关模块打包进来
      allowlist: [/@fastify/],
    }),
  ],
  // 优化打包模式
  mode: "production",
  optimization: {
    minimize: false, // 避免混淆 Node.js 代码
  },

  // 模块处理规则配置
  module: {
    rules: [
      {
        // 使用正则匹配所有的 .ts 文件
        test: /\.ts?$/,
        use: {
          // 使用 ts-loader 处理 TypeScript 文件
          loader: "ts-loader",
          options: {
            // 启用 transpileOnly 选项可以提高构建速度，但需要配合 ForkTsCheckerWebpackPlugin 做类型检查
            transpileOnly: true,
          },
        },
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
      {
        // 处理 i18n 相关的 JSON 文件
        test: /\.json$/,
        // 使用 javascript/auto 类型以防止 JSON 模块被多次处理
        type: "javascript/auto",
        // 只处理 i18n 目录下的 JSON 文件
        include: /i18n/,
        // 使用 json-loader 处理 JSON 文件
        use: "json-loader",
      },
    ],
  },

  // 输出配置
  output: {
    // 构建后的文件名
    filename: "index.js",
    // 构建后的文件存放路径，使用 path.resolve 获取绝对路径
    path: path.resolve(__dirname, "api"),
  },

  // 解析配置
  resolve: {
    // 自动解析这些扩展名的文件，引入时可以省略扩展名
    extensions: [".js", ".ts", ".json"],
    alias: {
      "~": path.resolve(__dirname, "src"), // 支持 @ 路径别名
    },
  },

  plugins: [
    // 配置 IgnorePlugin 来忽略特定模块，优化打包体积
    new webpack.IgnorePlugin({
      checkResource(resource) {
        // 定义需要懒加载的 NestJS 相关模块
        const lazyImports = [
          "@nestjs/microservices",
          "@nestjs/microservices/microservices-module",
          "@nestjs/websockets/socket-module",
          "cache-manager",
          "class-validator",
          "class-transformer",
        ];
        // 如果不在懒加载列表中，不忽略
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          // 尝试解析资源
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch (err) {
          // 如果解析失败，则忽略该模块
          return true;
        }
        return false;
      },
    }),
    // 使用 ForkTsCheckerWebpackPlugin 在单独的进程中进行类型检查，提高构建速度
    new ForkTsCheckerWebpackPlugin(),
    // 注入环境变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // 源文件路径：i18n 翻译文件所在目录
          from: path.resolve(__dirname, "src/common/locales/i18n"),
          // 目标路径：构建后的 i18n 文件存放位置
          to: path.resolve(__dirname, "api/i18n"),
          // noErrorOnMissing: true,
          // force: true,
        },
      ],
    }),
  ],
};
