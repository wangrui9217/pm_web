var koa = require('koa');
var app = new koa();
var path= require('path');
const koaStatic = require('koa-static'),
co = require('co'),
koaBody = require('koa-body'),
axios = require('axios'),
svgCaptcha = require('svg-captcha'),
Router = require('koa-router');


function* s_request(options){
	return new Promise((resolve, reject) => {
		axios(options).then((res)=>{
			resolve(res);
		}).catch((err)=>{
			console.log("error ###:",err);
			reject(err);
		})
	});
}

module.exports=function(config){
	var router = new Router();
	router.post(/\/proxyApi\//,async(ctx)=>{
		var url=config.baseURL + ctx.path
		url=url.replace("/proxyApi","")
		console.log("@@@ request url===>"+url);
		console.log("@@@ request headers===>"+ JSON.stringify(ctx.req.headers));
		var options={
			url:url,
			method:ctx.req.method,
			headers:{cookie:ctx.req.headers.cookie?ctx.req.headers.cookie:""},
			params:ctx.request.body,
			data:ctx.request.body
		};
		await axios(options).then((res)=>{
			if(response.headers.hasOwnProperty('set-cookie')){
				ctx.response.set({"set-cookie":response.headers["set-cookie"]})
			}
			ctx.body=res.data
		}).catch((err)=>{
			console.log("error ###>",err);
		})
		
		
	});
	router.get(/\/proxyApi\//,async(ctx)=>{
		var url=config.baseURL + ctx.path
		url=url.replace("/proxyApi","")
		var options={
			url:url,
			method:ctx.req.method,
			headers:ctx.req.headers,
			data:ctx.request.body
		};
		console.log("@@@ request url ==>",url);
		await axios(options).then((res)=>{
			if(response.headers.hasOwnProperty('set-cookie')){
				ctx.response.set({"set-cookie":response.headers["set-cookie"]})
			}
			ctx.body=res.data
		}).catch((err)=>{
			console.log("error ###>",err);
		})

	});
	app.use(koaBody());

	app
	.use(router.routes())
	.use(router.allowedMethods());
	app.use(koaStatic('../static'));
	app.use(koaStatic('./'));

	app.listen(2000);
	return app;
}
