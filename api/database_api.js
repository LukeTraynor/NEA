var express = require('express')
var app = express()
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser')
var express = require('express');
var session = require('express-session');
var path = require('path');

var app = express();
app.use(cors())
const Connection = require('mysql/lib/Connection');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var con = mysql.createConnection({
  host: "localhost",
  port:"32768",
  user: "root",
  password: "my-secret-pw",
  database: "group_calendar"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get('/Users/:UserID', function(request, response, next) {
    con.query('SELECT * FROM Users WHERE UserID = ' + request.params.UserID, function(err, result, fields) 
    {
      if (err) throw err;
      return response.send(result[0]);
    });
});

app.post('/Login', function(request, response) {
	var Username = request.body.Username;
	var User_Password = request.body.User_Password;
	if (Username && User_Password) {
		con.query('SELECT * FROM Users WHERE Username = \''+Username+'\'  AND User_Password = \''+User_Password+'\'', function(err, res, fields) {
      if (res.length > 0) {
				request.session.loggedin = true;
				request.session.username = Username;
        response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true"}))
			} else {
				response.send(JSON.stringify({"message": "Incorrect Username and/or Password!", "loggedin": "false"}));
			}			
			response.end();
		});
	} else {
		response.send(JSON.stringify({"message": "Please enter Username and Password!", "loggedin": "false"}));
		response.end();
	}
});


app.post('/Register', function(request, response, next) {
  var Username = request.body.Username;
  var User_Password = request.body.User_Password;
  if (Username == "") {
    return response.send("There has been an error in your username")
  }
  con.query('INSERT INTO `Users` (`Username`, `User_Password`, `FirstName`, `LastName`, `email`, `bio`, `created_at`) VALUES ( \''+Username+'\', \''+User_Password+'\', NULL , NULL, NULL, NULL, CURRENT_TIMESTAMP);', function(err, result, fields) 
  {
    console.log(err)
    if (err) throw err;
    return response.send(result[0]);
    

  });
  console.log("error!!!!!!!!!!!");
  
});




//UPDATING USER INFORMATION
app.put('/Users/:UserID', function(request, response) {

  //var profileBody = request.body;
var FirstName = request.body.FirstName;

// if(profileBody["FirstName"]!= null){
//   FirstName = profileBody["FirstName"];
// }

  con.query('UPDATE Users SET FirstName = \''+FirstName+'\' WHERE UserID = '+ request.params.UserID +';', function(err, result, fields) 
  {
    if (err) throw err;
    //return response.send(result[0]);
    return response.send("success");
   });
});

//GET all groups a users is in
app.get('/Users/Groups/:UserID', function(request, response, next) {
  con.query('SELECT Groups.GroupName, Groups.GroupID, Groups.Bio, Groups.ImgLoc FROM `Users`, `Groups` WHERE UserID = ' + request.params.UserID, function(err, result, fields) 
  {
    if (err) throw err;
    return response.send(result[0]);
  });
});


app.get('/Events/:EventID', function(request, response, next) {
  con.query('SELECT * FROM Events WHERE EventID = ' + request.params.EventID, function(err, result, fields) 
  {
    if (err) throw err;
    return response.send(result[0]);
  });
});



app.get('/Groups/:GroupID', function(request, response, next) {
  con.query('SELECT * FROM `Groups` WHERE GroupID = ' + request.params.GroupID, function(err, result, fields) 
  {
    if (err) throw err;
    return response.send(result[0]);
  });
});

//ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';


//DEBUG=myapp:* npm start
app.listen(3000, function () {
  console.log("Listening on port 3000. Go to http://localhost:3000");
});