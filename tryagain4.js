var later=require('later');

var https=require('https');


var appid='wx1d3765eb45497a18';
var appsecret='eFz8hO1igIFmzPG8NmJtlkpKJRSJUZovsZFYEqKwLgpXopsmO6WEV4fJgOnpAKxo';

var access_token;


later.date.localTime();

console.log("Now"+new Date());


var sched=later.parse.recur().every(1).hour();

next=later.schedule(sched).next(10);
console.log(next);

var timer=later.setInterval(test.sched);

setTimeout(test,2000);

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
            				"name": "welcome",
         			   	"sub_button": [
                			{
                    			"type": "click",
                    			"name": "hello",
                    			"key": "V1001_MY_ACCOUNT"
                			},
                			{
                    			"type": "click",
                   	 		"name": "guansiqi",
                    			"key": "V1002_BID_PROJECTS"
                			}       
            				]
        				},
        				{
            				"type": "view",
            				"name": "guanguan",
            				"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=120.25.238.144:5277&response_type=code&scope=snsapi_userinfo&agentid=90#wechat_redirect"
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
