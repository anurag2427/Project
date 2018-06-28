var express = require('express');
var app=express();
var path = require('path');
const request = require('request');
 
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extented:true}));
app.use(bodyParser.json());

app.use(express.static('./public'))

app.set('port',(process.env.PORT || 5000));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.post('/', (req, res1)=>{
    let longURL = req.body.bigURL;
    console.log(longURL);
    request.get('http://tinyurl.com/api-create.php?url='+longURL+'', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      result = {
          shortURL : body
      }
      console.log(result)
      res1.json(result);
 
    });
})



app.listen(app.get('port'),function(){
    console.log('App running on port',app.get('port'));
});

