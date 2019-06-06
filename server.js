// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/*", (req,res) => {
  if(moment(req.params[0]).isValid()){
    
    res.json({"unix":moment(req.params[0],['X','YYYY-MM-DD'],true).unix(),
              "utc" : moment(req.params[0],['x','YYYY-MM-DD'],true).format('LLLL')         
             })
    
  }
  else if(req.params[0] === ""){
    res.json({"unix":new Date().getTime(),
              "utc" : moment().format("LLLL")            
             })
  }
  else{
    res.json({"error": "invalid date"})
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});