var express = require('express')
var app = express()
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser')
var express = require('express');
var session = require('express-session');
var path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 3;

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

// connecting to the sql database
var con = mysql.createConnection({
  host: "localhost",
  port:"32768",
  user: "root",
  password: "my-secret-pw",
  database: "group_calendar"
});

//quick function to test if successful connection
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//using the usersID to grab the rest of their data
app.get('/Users/:UserID', function(request, response, next) {
    con.query('SELECT * FROM Users WHERE UserID = ' + request.params.UserID, function(err, result, fields) 
    {
      if (err) throw err;
      return response.send(result[0]);
    });
});

const jwtkey = "insertprivatekeyhere";
const jwtexpiry = 35000;

// the login which also hashes the users plaintext password and compares the hash to the database
app.post('/Login', function(request, response) {
	var Username = request.body.Username;
  var User_Password = request.body.User_Password;
  //bcrypt.compare(InputPassword, hash, function(err, res) {
    bcrypt.hash(User_Password, saltRounds, (err, hash) => {
        con.query('SELECT * FROM Users WHERE Username = \''+Username+'\'  AND User_Password = \''+hash+'\'', function(err, res, fields) {
  
            request.session.loggedin = true;
            request.session.username = Username;
            const token = jwt.sign({
            Username}, jwtkey,{
            algorithm: "HS256", 
            expiresIn: jwtexpiry
          });
            console.log(token)
            console.log(verify(token))
            
            response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true", "token": token}))

        });
    });
});

// the login which also hashes the users plaintext password and compares the hash to the database
app.get('/Login2/:Username', function(request, response) {
  var Username = request.body.Username;
  var User_Password = request.body.User_Password;
  con.query('SELECT * FROM `Users` WHERE Username = \''+request.params.Username+'\'', function(err, result, fields) 
  {
    if (err) throw err;
    console.log(result[0])
    if (result.length > 0) {
      return response.send(result[0]);
      console.log(result[0])
    
      response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true", "result": result}))
      return response.send(result);
    } else {
      response.send(JSON.stringify({"message": "Incorrect Username and/or Password!", "loggedin": "false"}));
    }	
    
  });
});

    
//function to verify the jwt token 
    function verify(token){
      var verifiedJwt
      try {
        verifiedJwt = jwt.verify(token,jwtkey);
      } catch(err) {
        //change this to catch specific errors
        return  res.status(400).send('invalid token')
      }
      return verifiedJwt.Username
};

	
    
function GetID2(Username){
  var result
  con.query('SELECT UserID FROM `Users` WHERE Username = \''+Username+'\'', function(err, result, fields) 
  {
    if (err) throw err;
    
    console.log("UserID2:"+parseInt(result[0].UserID));

    return (result[0]);
    
     

  });
}

function GetID(Username){
  var result
  
      console.log('Slow function done')
      
   
      con.query('SELECT UserID FROM `Users` WHERE Username = \''+Username+'\'', function(err, result, fields) 
      {
        if (err) throw err;
        setTimeout(function () {
          console.log("UserID2:"+parseInt(result[0].UserID));
          test = (result[0].UserID);
          return (result[0].UserID); 
      
            }, 300)
        });
}

// async function operation() {
//   return new Promise(function(resolve, reject) {
//     con.query('SELECT UserID FROM `Users` WHERE Username = "Luke"', function(err, result, fields) 
//     {
//       if (err) throw err;
//       console.log(result[0].UserID)
//       var a = 5
//       // may be a heavy db call or http request?
//       resolve(a); // successfully fill promise
//   });
// })
// }

// async function app() {
//   var a = await operation() // a is 5
// }

// async function operation() {
//   return new Promise(function(resolve, reject) {
//       var a = 0;
//       var b = 1;
//       a = a + b;
//       a = 5;
//       console.log(a)
//       // may be a heavy db call or http request?
//       resolve(a) // successfully fill promise
//   })
// }

// async function app() {
//   var a = await operation() // a is 5
// }




//register api that adds the users username and password into the database - also hashes the password and saves the hash
app.post('/Register', function(request, response, next) {
  var Username = request.body.Username;
  var User_Password = request.body.User_Password;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(User_Password, salt, (err, hash) => {
        // Now we can store the password hash in db.
        console.log(hash)
        if (Username == "") {
          return response.send("There has been an error in your username")
        }
        con.query('INSERT INTO `Users` (`Username`, `User_Password`, `FirstName`, `LastName`, `email`, `bio`, `Plaintext`, `created_at`) VALUES ( \''+Username+'\', \''+hash+'\', NULL , NULL, NULL, NULL, \''+User_Password+'\', CURRENT_TIMESTAMP);', function(err, result, fields) 
        {
          console.log(err)
          if (err) throw err;
          return response.send(result[0]);
          
      
        });
        console.log("error!!!!!!!!!!!");
        
      });
    });
});

app.post('/NewGroup', function(request, response, next) {
    con.query('INSERT INTO `Groups` ( `GroupName`, `bio`, `ImgLoc`, `created_at`) VALUES ( "placeholder", NULL, NULL, CURRENT_TIMESTAMP);', function(err, result, fields) 
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
var LastName = request.body.LastName;
var Email = request.body.Email;
var Bio = request.body.Bio;

// if(profileBody["FirstName"]!= null){
//   FirstName = profileBody["FirstName"];
// }

  con.query('UPDATE Users SET FirstName = \''+FirstName+'\', Lastname = \''+LastName+'\',Email = \''+Email+'\', Bio= \''+Bio+'\' WHERE UserID = '+ request.params.UserID +';', function(err, result, fields) 
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

//GET all users in a group
app.get('/Groups/Users/:GroupID', function(request, response, next) {
  con.query('SELECT Users.Username, Users.Bio, Users.ImgLoc, Users.UserID FROM `Users`, `Groups` WHERE GroupID = ' + request.params.GroupID, function(err, result, fields) 
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

app.put('/Events/:EventID', function(request, response) {

  var EventName = request.body.EventName;
  var Bio = request.body.Bio;
  var DateOfEvent = request.body.DateOfEvent;
  var LocationOfEvent = request.body.LocationOfEvent;
  
    con.query('UPDATE Events SET EventName = \''+EventName+'\', Bio= \''+Bio+'\' WHERE EventID = '+ request.params.EventID +';', function(err, result, fields) 
    {
      if (err) throw err;
      //return response.send(result[0]);
      return response.send("success");
     });
  });

//UPDATING GROUP INFORMATION
app.put('/Groups/:GroupID', function(request, response) {

var GroupName = request.body.GroupName;
var Bio = request.body.Bio;

  con.query('UPDATE `Groups` SET GroupName = \''+GroupName+'\', Bio= \''+Bio+'\' WHERE GroupID = '+ request.params.GroupID +';', function(err, result, fields) 
  {
    if (err) throw err;
    //return response.send(result[0]);
    return response.send("success");
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