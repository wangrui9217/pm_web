var webpack = require('webpack');
var webpackConfig = require("../build/webpack.dev.conf.js");
var koa_webpack_middleware = require('koa-webpack-middleware');
var devMiddleware=koa_webpack_middleware.devMiddleware;
var hotMiddleware=koa_webpack_middleware.hotMiddleware;
var compile = webpack(webpackConfig);
var serverCreater = require('./serverCreater.js');
var browserSync = require('browser-sync');
var config =require('./config.js');

console.log(config.baseURL);

var app= serverCreater({baseURL:config.baseURL})

app.use(devMiddleware(compile, {
	stats: {
		colors: true
	}
}));

app.use(hotMiddleware(compile,{
	log: console.log,
	//path: '/__webpack_hmr',
	//heartbeat: 10 * 1000
}));


