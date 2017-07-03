var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var crypto=require('crypto');
var fs=require('fs');
var https=require('https');
var http=require('http');
var app=express();
var code='';
var change='';
var userid=[];
var access_token=fs.readFileSync("access_token.txt","utf8");
console.log("accesstoken: "+access_token);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.render('course',{
	    title:'homepage'
	});
});
app.get('/course',function(req,res){
	/*res.render('course',{
	    title:'course list'
	});*/
	code=req.param('code');
	var post_options={
	host:'qyapi.weixin.qq.com',
	port:'443',
	rejectUnauthorized:false,
	path:'/cgi-bin/user/getuserinfo?access_token='+access_token+'&code='+code,
	method:'POST'
	};
	var post_req=https.request(post_options,function(response){
	    var responseText=[];
	    var size=0;
	    response.setEncoding('utf8');
	    response.on('data',function(data){
		responseText.push(data);
		size+=data.length;
	    });
	    response.on('end',function(){	
		console.log("userid: "+JSON.parse(responseText[0]).UserId);
		var userid=JSON.parse(responseText[0]).UserId;
	
		var postopt={
		    host:'api.mysspku.com',
		    path:'/index.php/V2/TeacherInfo/getDetail?teacherid='+userid+'&token=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		    method:'GET',
		    rejectUnauthorized:false		
		   };

		console.log("hi ask sspku api!!");
		https.get(postopt,function(response){
		    var responsecontent=[];
		    var size=0;
			console.log("ask more details!");
		    response.setEncoding('utf8');
		    response.on('data',function(data){
			responsecontent.push(data);
			//responsecontent+=data;
			size+=data.length;
			console.log(responsecontent);
			});
		    response.on('end',function(){
			//if(err){
			//    console.log(err);
			//}
			//console.log("userdetail: "+JSON.parse(responsecontent[0]).data);
			console.log("responsecontent data part: "+JSON.parse(responsecontent[0]).data.teacherid);
			res.render('course',{
	   			 title:'course list',
				teacherid:JSON.parse(responsecontent[0]).data.teacherid
			});
			
   		    });
		});

		//postrequest.end();
		//Undefined:console.log("hi this is userid !: "+JSON.parse(responseText[0]).UserId);
	    });
	});

	post_req.end();

	console.log("code : "+code); 
});
//setTimeout(function(){console.log(userid)},5000);
app.get('/practice',function(req,res){
	res.render('practice',{
	    title:'comprehensice practice'
	});

});
app.get('/thesis',function(req,res){
	res.render('thesis',{
	    title:'thesis'
	});

});
app.get('/graduatestudent',function(req,res){
	res.render('graduate',{
	    title:'graduate student'
	});

});
/*app.get('/schoolstudent',function(req,res){
	res.render('schoolstudent',{
	    title:'school student'
	});

});*/
app.get('/schoolstudent',function(req,res){

	code=req.param('code');
	var post_options={
	host:'qyapi.weixin.qq.com',
	port:'443',
	rejectUnauthorized:false,
	path:'/cgi-bin/user/getuserinfo?access_token='+access_token+'&code='+code,
	method:'POST'
	};
	var post_req=https.request(post_options,function(response){
	    var responseText=[];
	    var size=0;
	    response.setEncoding('utf8');
	    response.on('data',function(data){
		responseText.push(data);
		size+=data.length;
	    });
	    response.on('end',function(){	
		console.log("userid: "+JSON.parse(responseText[0]).UserId);
		var userid=JSON.parse(responseText[0]).UserId;
	
		var postopt={
		    host:'api.mysspku.com',
		    path:'/index.php/V2/TeacherInfo/getStudents?teacherid='+userid+'&token=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		    method:'GET',
		    rejectUnauthorized:false		
		   };

		console.log("hi ask sspku api!!");
		https.get(postopt,function(response){
		    var responsecontent='';
		    var size=0;
		
		    response.setEncoding('utf8');
		    response.on('data',function(data){
			//responsecontent.push(data);
			responsecontent+=data;
			size+=data.length;
			
			});
		    response.on('end',function(){
						
			//console.log("student is :"+JSON.parse(responsecontent).data.students);
		//	console.log("responsecontent data part: "+JSON.parse(responsecontent[0]).data.teacherid);
			res.render('schoolstudent',{
	   			 
	   			 title:'school student',
				students:JSON.parse(responsecontent).data.students
		//		teacherid:JSON.parse(responsecontent[0]).data.teacherid,
		//		name:JSON.parse(responsecontent[0]).data.name,
		//		gender:JSON.parse(responsecontent[0]).data.gender,
		//		title:JSON.parse(responsecontent[0]).data.title,
		//		telephone:JSON.parse(responsecontent[0]).data.telephone,
		//		mail:JSON.parse(responsecontent[0]).data.mail,
		//		imgurl:JSON.parse(responsecontent[0]).data.imgurl
			});
			
   		    });
		});

		//postrequest.end();
		//Undefined:console.log("hi this is userid !: "+JSON.parse(responseText[0]).UserId);
	    });
	});

	post_req.end();

	console.log("code : "+code); 
});
app.get('/schoolstudent/:_stuid',function(req,res){
	code=req.param('code');
	console.log("req in here is : "+req.param('_stuid'));	

	    var postopt={
		    host:'api.mysspku.com',
		    path:'/index.php/V2/StudentInfo/getDetail?stuid='+req.param('_stuid')+'&token=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		    method:'GET',
		    rejectUnauthorized:false		
		   };

		https.get(postopt,function(response){
		    var responsecontent='';
		    var size=0;
		
		    response.setEncoding('utf8');
		    response.on('data',function(data){
			//responsecontent.push(data);
			responsecontent+=data;
			size+=data.length;
			
			});
		    response.on('end',function(){
						
			console.log("student is :"+JSON.stringify(JSON.parse(responsecontent).data));
		//	console.log("responsecontent data part: "+JSON.parse(responsecontent[0]).data.teacherid);
			res.render('schooldetail',{
	   	
	   			 title:JSON.parse(responsecontent).data.name+' Info',
				studentinfo:JSON.parse(responsecontent).data
			});
			
   		    });
		}).end();
		

	console.log("code : "+code); 
});
app.get('/personalcenter',function(req,res){
	/*res.render('course',{
	    title:'course list'
	});*/
	code=req.param('code');
	var post_options={
	host:'qyapi.weixin.qq.com',
	port:'443',
	rejectUnauthorized:false,
	path:'/cgi-bin/user/getuserinfo?access_token='+access_token+'&code='+code,
	method:'POST'
	};
	var post_req=https.request(post_options,function(response){
	    var responseText=[];
	    var size=0;
	    response.setEncoding('utf8');
	    response.on('data',function(data){
		responseText.push(data);
		size+=data.length;
	    });
	    response.on('end',function(){	
		console.log("userid: "+JSON.parse(responseText[0]).UserId);
		var userid=JSON.parse(responseText[0]).UserId;
	
		var postopt={
		    host:'api.mysspku.com',
		    path:'/index.php/V2/TeacherInfo/getDetail?teacherid='+userid+'&token=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		    method:'GET',
		    rejectUnauthorized:false		
		   };

		console.log("hi ask sspku api!!");
		https.get(postopt,function(response){
		    var responsecontent=[];
		    var size=0;
			console.log("ask more details!");
		    response.setEncoding('utf8');
		    response.on('data',function(data){
			responsecontent.push(data);
			size+=data.length;
			console.log(responsecontent);
			});
		    response.on('end',function(){
			//if(err){
			//    console.log(err);
			//}
			//console.log("userdetail: "+JSON.parse(responsecontent[0]).data);
			console.log("responsecontent data part: "+JSON.parse(responsecontent[0]).data.teacherid);
			res.render('personal',{
	   			 title:'personal center',
				teacherid:JSON.parse(responsecontent[0]).data.teacherid,
				name:JSON.parse(responsecontent[0]).data.name,
				gender:JSON.parse(responsecontent[0]).data.gender,
				title:JSON.parse(responsecontent[0]).data.title,
				telephone:JSON.parse(responsecontent[0]).data.telephone,
				mail:JSON.parse(responsecontent[0]).data.mail,
				imgurl:JSON.parse(responsecontent[0]).data.imgurl
			});
			
   		    });
		});

		//postrequest.end();
		//Undefined:console.log("hi this is userid !: "+JSON.parse(responseText[0]).UserId);
	    });
	});

	post_req.end();

	console.log("code : "+code); 
});
/*app.get('/personalcenter',function(req,res){
	res.render('personal',{
	    title:'personal center'
	});

});*/
app.get('/wxstyle',function(req,res){
	res.render('wxstyle',{
	    title:'weixinstyle'
	});

});
app.listen(5277);
