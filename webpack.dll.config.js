/**
 * Created by zhoulongfei on 2018/6/11.
 * E-mail:36995800@163.com
 */
const path=require('path');
const webpack = require('webpack'); // 用于访问内置插件
const library="vendor";
const config = {
    target: 'web',
    mode: 'production',
    entry:{
        vendors: ['a']
    },

    output:{
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, "dist"), // string
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
        filename: '[name].dll.js', // string
        //filename: "[name].js", // 用于多个入口点(entry point)（出口点？）
        // filename: "[chunkhash].js", // 用于长效缓存
        // 「入口分块(entry chunk)」的文件名模板（出口分块？）
        publicPath: "/", // string
        // 输出解析文件的目录，url 相对于 HTML 页面
        library: "vendor", // string,
        // 导出库(exported library)的名称

        libraryTarget: "umd", // 通用模块定义
        // 导出库(exported library)的类型
        libraryExport:'_entry_return_',

        /* 高级输出配置（点击显示） */

        pathinfo: true, // boolean
        // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息。

        chunkFilename: "[id].js",
        //chunkFilename: "[chunkhash].js", // 长效缓存(/guides/caching)
        // 「附加分块(additional chunk)」的文件名模板

        //jsonpFunction: "myWebpackJsonp", // string
        // 用于加载分块的 JSONP 函数名

        sourceMapFilename: "[file].map", // string
        //sourceMapFilename: "sourcemaps/[file].map", // string
        // 「source map 位置」的文件名模板

        //devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
        // 「devtool 中模块」的文件名模板

        //devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
        // 「devtool 中模块」的文件名模板（用于冲突）

        //umdNamedDefine: true, // boolean
        // 在 UMD 库中使用命名的 AMD 模块

        //crossOriginLoading: "use-credentials", // 枚举
        //crossOriginLoading: "anonymous",
        //crossOriginLoading: false,
        // 指定运行时如何发出跨域请求问题

        /* 专家级输出配置（自行承担风险） */

        /* devtoolLineToLine: {
         test: /\.jsx$/
         },*/
        // 为这些模块使用 1:1 映射 SourceMaps（快速）

        //hotUpdateMainFilename: "[hash].hot-update.json", // string
        // 「HMR 清单」的文件名模板

        //hotUpdateChunkFilename: "[id].[hash].hot-update.js", // string
        // 「HMR 分块」的文件名模板

        //sourcePrefix: "\t", // string
        // 包内前置式模块资源具有更好可读性
    },




    module: {
        // 关于模块配置
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
        noParse:/jquery|lodash/
    },
    resolve:{
        // 解析模块请求的选项
        // （不适用于对 loader 解析）
        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        extensions: [".js", ".ts",".tsx", ".json", ".jsx", ".css"],
        // 使用的扩展名

        // 用于查找模块的目录
        alias:{
            a:path.resolve(__dirname, "src/a")
        },
        enforceExtension: false,
        // 如果为 true，请求必不包括扩展名
        // 如果为 false，请求可以包括扩展名
        //unsafeCache: true,
        //unsafeCache: {},
        // 为解析的请求启用缓存
        // 这是不安全，因为文件夹结构可能会改动
        // 但是性能改善是很大的
    },

    devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
    //devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
    //devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。
    // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    // 牺牲了构建速度的 `source-map' 是最详细的。

    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, 'dist/[name]-manifest.json'),
            // This must match the output.library option above
            name: library,

        })


        /*new webpack.ProvidePlugin({
         _: 'lodash'
         })*/
    ]

};

module.exports = config;
