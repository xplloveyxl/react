const path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 手动指定一个 入口 和 出口
    mode: "development",  //production
    entry: path.resolve(__dirname, './src/js/App'), /*入口表示要使用webpack打包那个文件*/
    output: { /*输出文件相关配置*/
        path: path.resolve(__dirname, './dist'), /*指定打包好的文件输出的目录*/
        filename: 'js/bundle.js', /*指定输出文件的名称*/
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'] /* 配置自动识别缺省后缀,缺省不能为''要为'*' */
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    "presets": ['@babel/preset-env', '@babel/preset-react'],  /* 配置es6和react语法打包成es5*/
                    "plugins": [['@babel/plugin-proposal-class-properties'], ["import", {
                        "libraryName": "antd-mobile",
                        "style": 'css'
                    }]] /* 识别es6的class配制以及按需加载antd-mobile,能根据import的组件自动引入组件对应的css */
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader' /*相比css多一个less,less要放最后，因为要先执行*/
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                             limit: 8192, /*图片小于51kb转成base64展示*/
                             name: 'image/[name].[ext]' /*超过51kb就按路径输出图片*/
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)$/, /* 字体库 */
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,  //这里要足够大这样所有的字体图标都会打包到css中
                    }
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({  /*配置index.html模板*/
            title: "antd-mobile登录界面",
            template: path.resolve(__dirname, './src/index.html'),
            inject: 'header',
            /* 是否按output自动输出(注入)script标签*/
            minify: {
                collapseWhitespace: false,
                removeComments: false
            },
        })
    ]
};
