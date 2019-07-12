var express = require('express');
var path = require('path');
var history = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');
var appconfig = require('./app-config');

var app = express();

var options = {
	target: appconfig.service.httpOpenApi.url, // target host
	//pathRewrite: function (path) {
		// var str = path.replace(/^\//, '');

		// console.log(str);

		//return str;
	//},
	//logLevel: 'debug',
	changeOrigin: true               // needed for virtual hosted sites
};

app.use(history({verbose: true}));

// if (app.get('env') == 'development') {
//   app.use('/', proxy(options));
// }

// if (app.get('env') == 'production') {
// 	app.use('/', proxy(options));
//   }

app.use(express.static(path.join(__dirname, 'dist')));

module.exports = app;
