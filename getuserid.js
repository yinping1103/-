var express = require('express');

app = express();
var config = {
  token: 'yinping',
  appid: 'wx88f3e6f3f3425db2',
  //encodingAESKey: 'encodinAESKey',
};
app.use(express.query());
/*
app.use('/', wechat(config, function (req, res, next) {
	  var message = req.weixin;
	  if (message.Content === 'hi') {
	    res.reply('hello');
	  } else if (message.MsgType === 'text') {
	    res.reply({
	      content: 'text object',
	      type: 'text'
		    });
		  } else if (message.FromUserName === 'music') {
				    res.reply({
				      type: "music",
				      content: {
				        title: "试听",
				        description: "曾经的你",
				        musicUrl: "http://music.163.com/#/song?id=167975",
				        hqMusicUrl: "http://music.163.com/#/song?id=167975",
				        thumbMediaId: "thisThumbMediaId"
				      }
				    });
				  } else {
				    res.reply('我只会这些了。。。');
				  }
				}));
*/
app.use('/',function(req,res,next){
console.log(JSON.stringify(res.body));
});
			app.listen(5277);
