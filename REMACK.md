## 打包配置说明
@babel: 开头的文件用来对js处理，可以将es6转成es5;

@babel/plugin-proposal-class-properties: 用来编译类(es6的class),兼容类的一些写法,否则有不可预知错误;

babel-loader: babel的基础包;

babel-plugin-import: 按需引入组件;

babel-plugin-transform-runtime: babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小;

css-loader: 处理css相关，可以import css文件到js里面,如果不和style-loader一起用就只能当代码使用了;

style-loader: 能将css-loader处理的样式通用一个JS脚本创建一个style标签装起来;

less,less-loader: 能将less自己处理成css;

img-loader,image-webpack-loader,url-loader,file-loader: 处理图片，字体库，文件，建议一起install;

postcss-loader: 配置autoprefixer等功能;
autoprefixer: 用于为样式自动添加浏览器前缀，比如display:flex => -wibkit-display:flex;

html-webpack-plugin: 主要用来做为对模板index.html的扩展;

webpack,webpack-cli,webpack-dev-sever: 打包和开发环境调试,基本使用参考package.json的scripts配置项;
