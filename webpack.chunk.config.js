/**
 * Created by zhoulongfei on 2018/6/11.
 * E-mail:36995800@163.com
 */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack'); // 用于访问内置插件


module.exports = function(env, argv){
    return  {
        target: 'web',
        mode: 'production',
        //entry:path.resolve(__dirname, 'src/entry.js'),
        entry:{
            editor:[path.resolve(__dirname, 'assets/css/demo.sass'),path.resolve(__dirname, 'src/main.ts')],
        },
        output: {
            // webpack 如何输出结果的相关选项
            path: path.resolve(__dirname, "dist"), // string
            // 所有输出文件的目标路径
            // 必须是绝对路径（使用 Node.js 的 path 模块）
            //filename: "editor.full.min.js", // string
            filename: "[name].full.js", // 用于多个入口点(entry point)（出口点？）
            // filename: "[chunkhash].js", // 用于长效缓存
            // 「入口分块(entry chunk)」的文件名模板（出口分块？）
            publicPath: "//asserts.xcarimg.com/zteditor-m/dist/", // string
            // 输出解析文件的目录，url 相对于 HTML 页面
            library: "main", // string,
            // 导出库(exported library)的名称

            libraryTarget: "umd", // 通用模块定义
            // 导出库(exported library)的类型
            libraryExport: '_entry_return_',

            /* 高级输出配置（点击显示） */

            pathinfo: true, // boolean
            // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息。

            chunkFilename: '[name].dll.js',
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

        cache: false, // boolean
        // 禁用/启用缓存


        module: {
            // 关于模块配置
            rules: [
                {
                    test:/\.css$/,
                    use:[
                        {
                            loader:MiniCssExtractPlugin.loader,
                            options:{
                                publicPath:'/'
                            }
                        },
                        'css-loader'
                    ]
                },

                {
                    test: /\.(sa|sc)ss$/,
                    use: [
                        {
                            loader:MiniCssExtractPlugin.loader,
                            options:{
                                publicPath:'/'
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                importLoader: 1
                            }
                        },
                        "sass-loader" // compiles Sass to CSS
                    ]
                },
                {
                    test: /\.jpg$/,
                    loader: "file-loader"
                },
                {
                    test: /\.png$/,
                    loader: "url-loader?mimetype=image/png"
                },
                {
                    test: /\.art$/,
                    loader: "art-template-loader",
                    options: {
                        // art-template options (if necessary)
                        // @see https://github.com/aui/art-template
                    }
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [[
                                "@babel/preset-env",
                                {
                                    "targets": "since 2015",
                                    //forceAllTransforms: true,
                                }
                            ]],

                        }
                    }
                },
                { test: /\.txt$/, use: 'raw-loader' },
                {
                    test: /\.tsx?$/,
                    use:[
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [[
                                    "@babel/preset-env",
                                ]],
                            }
                        },
                        {loader: "ts-loader"}
                        ]
                }
            ],
            //noParse:/jquery|lodash/
        },
        resolve: {
            // 解析模块请求的选项
            // （不适用于对 loader 解析）
            modules: [
                "node_modules",
                path.resolve(__dirname, "src")
            ],
            extensions: [".js", ".ts", ".tsx", ".json", ".jsx", ".css",".scss","sass"],
            // 使用的扩展名

            // 用于查找模块的目录
            alias: {
                main: path.resolve(__dirname, "src/main")//demo



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

        devtool: "source-map", // enum
        //devtool: "inline-source-map", // 嵌入到源文件中
        //devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
        //devtool: "hidden-source-map", // SourceMap 不在源文件中引用
        //devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
        //devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
        //devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。
        // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
        // 牺牲了构建速度的 `source-map' 是最详细的。

        plugins: [
            new webpack.BannerPlugin({banner: `/**hash:[hash] time stamp:${new Date().toISOString()} */`, raw: true, entryOnly: true}),
            new CleanWebpackPlugin(['./dist/'], {
                exclude: []
            }),
            new MiniCssExtractPlugin({
                filename: "bundle.css",
                chunkFilename: "[name].chunk.css"
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
            })


        ],
        optimization:{
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i,
                    parallel: true,
                    sourceMap: true,
                    extractComments: false,
                    uglifyOptions: {
                        warnings: false,
                        parse: {bare_returns:true},
                        compress: {},
                        mangle: false, // Note `mangle.properties` is `false` by default.
                        output: {
                            ascii_only:true,
                            quote_keys:true,
                            comments:/^\*hash\:/
                        },
                        toplevel: false,
                        nameCache: true,
                        ie8: false,
                        keep_fnames: true,
                    },
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                chunks: "all",
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                        priority: -10
                    },
                    extern:{
                        test: /[\\/]extern[\\/]/,
                        name: "extern",
                        chunks: "all",
                        priority: -10
                    },
                    styles: {
                        test: /\.css$/,
                        name: 'styles',
                        chunks: 'all',
                        priority: -10,
                        enforce: true
                    },
                    sass: {
                        name: 'sass',
                        test: /\.(sa|sc|)ss$/,
                        chunks: 'all',
                        priority: -10,
                        enforce: true
                    },

                    default: {
                        minChunks: 1,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        }

    }
};
