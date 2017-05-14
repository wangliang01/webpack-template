// 引入 webpack 
var webpack = require('webpack');

var path = require('path');

var htmlWebpackPlugin = require("html-webpack-plugin");

var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(webpack.optimize)
module.exports = {
	devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
	// 页面入口文件配置
	// entry可以是一个字符串，也可以是一个数组，还可以是一个对象
	// __dirname是node.js中一个全局变量，它指向当前脚本所在的目录
	entry: {
		index: __dirname+ '/app/main.js' //唯一入口文件
	},
	// 入口文件输出配置
	output: {
		// output里的filename有三个值，[name],[hash],[chunkhash]
		path: __dirname+ '/public',//打包后文件存放的地方(输出文件的保存路径)
		filename: '[name].js'//[name]的值是entry的键值，[hash]是打包时的hash值，chunkhash是md5加密的值，这里是用作版本号使用（输出文件的名称）
	},
	
	module: {
		// loader加载器
		rules: [
			{
				test: /\.json$/,
				use: ['json-loader']//webpack2中-loader不能省略
			},
			{
				test: /\.js[x]$/,
				use: ['babel-loader'],
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: ['css-loader', 'style-loader']
			},
			{
				test: /\.less$/,
				use: ['css-loader', 'style-loader','less-loader','postcss-loader']
			},
			{
				test:/\.(png|jpg|gif|svg)$/i,
				use: ['file-loader']
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			}

		]
	},
	// 插件项
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				// 构建本地服务器
				devServer: {
					contentBase: '/public', ////本地服务器所加载的页面所在的目录
					port: '8080', //设置默认监听端口，如果省略，默认为"8080"
					inline: true, //设置为true，当源文件改变时会自动刷新页面
					colors: true, //设置为true，使终端输出的文件为彩色的
					historyApiFallback: true //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
				},
				postcss:function() {
                  return [autoprefixer];
              	}
			}
		}),
		new htmlWebpackPlugin({
			filename:__dirname + '/public/index.html',
	        template:__dirname + '/app/index.tmpl.html',
	        inject:'body',
	        miniify:{
	            removeComments:true,
	            collapseWhitespace:true
          	}
		}),
	    new webpack.optimize.UglifyJsPlugin(),
	    new ExtractTextPlugin("style.css")
	]

};