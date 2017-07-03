var express=require('express');
var WXBizMsgCrypt=require('wechat-crypto');

var config={
    token:'ypgsq',
    encodingAESKey:'ghhwWa2XHrquoc6TXetQ7sA2SUQFhQxoWPwv3pipYGo',
    corpId:'wx1d3765eb4597a18'
};

var app=express();

app.get('/',function(req,res){
var msg_signature=req.query.msg_signature;
var timestamp=req.query.timestamp;
var nonce=req.query.nonce;
var echostr=req.query.echostr;
var cryptor=new WXBizMsgCrypt(config.token,config.encodingAESKey,config.corpId);
var s=cryptor.decrypt(echostr);
res.send(s.message);
});

app.listen(5277);
