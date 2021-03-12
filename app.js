const express = require('express');
const app=express();
const request = require('request');
const bodyParser = require('body-parser');
const token = 'EAAGJqAQlpGoBAIhvNr2TxCxNyklMzWiQH8O0NECdEGZBbZA6c4ubARkbXecL05jGACmQ1xTkZAF2RiZCLqOK90VkijSOJTKqh6BvLJmTMj1Necf8LWACdub47hlFXq7qJ6jjOSiyzDH3o5y10ZCZBRjwnLgD5LBRpndzZCKFfQ4LAZDZD';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/webhook/',function(req,res){
	//console.log(req);
    if (req.query['hub.verify_token'] === 'SocialMediaBot') {
        res.send(req.query['hub.challenge']);
		loginSend(1866625796884165,"Sample notification from user");
    }else
		res.send('Error when we try to validating your token.');
	
}); 

app.post('/webhook/',function(req, res){
    res.sendStatus(200);
    console.log('this is post request');
	console.log(req);
  //console.log(JSON.stringify(req.body));
        for (let i = 0; i < req.body.entry[0].messaging.length; i++) {
                        //console.log('error occured');
                        loginSend(req.body.entry[0].messaging[i].sender.id, "Sample notification from user from post");     
					
                    }
});						
function loginSend(id,text){
	console.log(id);
   var dataPost = {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: id },
            message:{
                text:text
            }
        }
    };
    requestFun(dataPost);
	
}

   
function requestFun(dataPost){
	//console.log(dataPost);
    
    request(dataPost, (error, response, body) => {
		//console.log(body);
        if (error) {
            console.log('Error when we try to sending message: ', error);
        } /* else if (response.body.error) {
            console.log('Error: ', response.body.error);
        } */
		//console.log(response);
		console.log(body);
    });

}
app.listen(6000,function(){
	
	
	console.log("Server is running at 6000");
});
