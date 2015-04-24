var express = require("express");
var app = express();
// allows you to use static files like index.html
app.use(express.static("public"));
var request = require('request');
// allows you parse the body of the ?
var bodyParser = require("body-parser");
app.use(bodyParser.json({extended: false}));
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('wdinder.db');

app.get("/", function(req, res){
  res.render("index.html")
});

app.post('/date', function(req,res){
	// console.log(newDate);
	/*the JSON object is being created in scripts.js then being sent as req.body to the server */
	var newDate = req.body;
	console.log(newDate);
	db.run("INSERT INTO dates (user_name, address, password, phone_number, pic) VALUES (?, ?, ?, ?, ?);", 
		newDate.user_name, newDate.phone_number, 
		newDate.password, 
		newDate.phone_number, 
		newDate.pic, 
		function(err) {
  			db.all("SELECT * FROM dates", function (err, data) {
  				res.json(data);
  			});
  	});
});	


// this is received from ajaxGetQuote's xhr.open("GET", url);
// app.get("")

app.listen ('3000');