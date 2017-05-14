# webpack-template

webpack模板

webpack 是以 commonJS 的形式来书写脚本滴，但对 AMD/CMD 的支持也很全面，方便旧项目进行代码迁移。

能被模块化的不仅仅是 JS 了。

开发便捷，能替代部分 grunt/gulp 的工作，比如打包、压缩混淆、图片转base64等。

扩展性强，插件机制完善，特别是支持 React 热插拔（见 react-hot-loader ）的功能让人眼前一亮。



WebPack的安装

1.安装命令

	npm install webpack -g     

	#全局安装webpack

2.使用webpack 

	npm init 

	# 会自动生成一个package.json文件

	npm install webpack --save-dev 

	#将webpack添加到package.json文件中

3.添加启动服务器的插件

	npm install webpack-dev-server --save-dev

	将webpack-dev-server 添加到package.json文件中

4.创建一个webpack.config.js文件,用来配置webpack,具体配置请见webpack.config.js

	webpack.config.js返回一个对象，对象中主要有这样几个属性：

	注意：不能取名为webpack-config.js,否则webpack 编译会报错

	No configuration file found and no output filename configured via CLI option.
	A configuration file could be named 'webpack.config.js' in the current directory.
	Use --help to display the CLI options.

4.1 entry

	entry: 入口文件配置项  可以是字符串，可以是数组，也可以是对象，必填项

	entry: {
		index: __dirname + '/app/main.js'  //dirname是node.js中一个全局变量，它指向当前脚本所在的目录
	}

4.2 output

	output: 输出文件配置项 是一个对象，必填项

	output: {
		path: __dirname + '/public',
		filename: '[name].js'
	}

	其它选项如果值为空，则不能写，否则webpack编译会报错

	module: {},
	        ^^^^^^
	SyntaxError: Unexpected identifier


4.3 生成Source Maps（使调试更容易）

	devtool选项 	配置结果
	source-map 	在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度

	cheap-module-source-map 	在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便

	eval-source-map 	使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项

	cheap-module-eval-source-map 	这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点


4.4 使用webpack构建本地服务器

	npm install webpack-dev-server --save-dev

	devserver配置选项 	功能描述

	contentBase 	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，
	应该在这里设置其所在目录（本例设置到“public"目录）

	port 	设置默认监听端口，如果省略，默认为”8080“

	inline 	设置为true，当源文件改变时会自动刷新页面

	colors 	设置为true，使终端输出的文件为彩色的

	historyApiFallback 	在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html

	在webpack2中，devServer不能作为自定义属性，而是要放在plugins属性内的option中

4.5 Loaders

	Loaders需要单独安装并且需要在webpack.config.js下的modules关键字下进行配置，Loaders的配置选项包括以下几方面：

    test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）

    loader：loader的名称（必须）

    include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；

    query：为loaders提供额外的设置选项（可选）

    1)安装可以转换 JSON的loader

    npm install json-loader --save-dev

    在webpack2中有语法变化

    module: {
		// loader加载器
		rules: [
			{
				test: /\.json$/,  //test是正则表达式，不是字符串
				use: ['json-loader'] //webpack2中-loader不能省略
			}
		]
	},




    UglifyJsPlugin：压缩JS代码； 内置插件

    ExtractTextPlugin：分离CSS和JS文件

    npm install --save-dev extract-text-webpack-plugin

    plugins: [
	    new HtmlWebpackPlugin({
	      template: __dirname + "/app/index.tmpl.html"
	    }),
	    new webpack.optimize.UglifyJsPlugin(),
	    new ExtractTextPlugin("style.css")
	]

