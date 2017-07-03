var later=require('later');

var https=require('https');
var express=require('express');
var app=express();

var appid='wx1d3765eb45497a18';
var appsecret='eFz8hO1igIFmzPG8NmJtlkpKJRSJUZovsZFYEqKwLgpXopsmO6WEV4fJgOnpAKxo';

var fs=require('fs');




var access_token;


later.date.localTime();

console.log("Now"+new Date());


var sched=later.parse.recur().every(1).hour();

next=later.schedule(sched).next(10);
console.log(next);

var timer=later.setInterval(test.sched);

setTimeout(test,2000);
setTimeout(writefile,4000);

function writefile(){
fs.writeFile("access_token.txt",access_token,function(err){
if(err){
return console.log(err);
}
});
}


app.get('/',function(req,res){
res.send("req.body");
var reqbody='';
reqbody=JSON.stringify(req.code);
console.log(reqbody);
});
app.listen(5277);

function test(){
console.log(new Date());
 
	var options={
	
		hostname:'qyapi.weixin.qq.com',
	
		path:'/cgi-bin/gettoken?corpid='+appid+'&corpsecret='+appsecret

	};
		

	var req=https.get(options,function(res){
	
			var bodyChunks='';
	
			res.on('data',function(chunk){
	
			bodyChunks+=chunk;
	
	
			});
	
			res.on('end',function(){
	
			var body=JSON.parse(bodyChunks);

	
			if(body.access_token){
	

				access_token=body.access_token;
	

				var menu = {
    					"button": [
        				{
					"name":"info",
					"sub_button":[
					{
					"type":"view",
					"name":"course list",
					"url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http://120.25.238.144:5277/course&response_type=code&scope=snsapi_userinfo&agentid=90#wechat_redirect"
					//"url":"http://120.25.238.144:5277/course"
					},
					{
					"type":"view",
					"name":"comprehensice practice",
					"url":"http://120.25.238.144:5277/practice"
					}
					]
					},
					{
					"name":"student training",
					"sub_button":[
					{
					"type":"view",
					"name":"school student",
					"url":"http://120.25.238.144:5277/schoolstudent"
					},
					{
					"type":"view",
					"name":"graduate",
					"url":"http://120.25.238.144:5277/graduatestudent"
					},
					{
					"type":"view",
					"name":"thesis",
					"url":"http://120.25.238.144:5277/thesis"
					}
					]
					},
        				{
            				"type": "view",
            				"name": "personal center",
            				"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=120.25.238.144:5277/personalcenter&response_type=code&scope=snsapi_userinfo&agentid=90#wechat_redirect"
        				}
					]        				
					};

			var post_str = new Buffer(JSON.stringify(menu));
//var post_str = JSON.stringify(menu);
console.log(post_str.toString());
console.log(post_str.length);

			var post_options = {
			    host: 'qyapi.weixin.qq.com',
			    port: '443',
			    path: '/cgi-bin/menu/create?access_token=' + access_token+'&agentid=90',
			    method: 'POST',
			    headers: {
			        'Content-Type': 'application/x-www-form-urlencoded',
			        'Content-Length': post_str.length
			    }	

			};
			var post_req = https.request(post_options, function (response) {
		        		var responseText = [];
    					var size = 0;
    					response.setEncoding('utf8');
   		       		        response.on('data', function (data) {
       		        			responseText.push(data);
        					size += data.length;
    					});
    					response.on('end', function () {
        				console.log(responseText);
    					});
					});

// post the data
				post_req.write(post_str);
				post_req.end();

				}
});
});
}
