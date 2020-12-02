var express = require('express')
var app = express()
var mysql = require('mysql');
var cors = require('cors')
app.use(cors())
const Connection = require('mysql/lib/Connection');

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


//ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';


//DEBUG=myapp:* npm start
app.listen(3000, function () {
  console.log("Listening on port 3000. Go to http://localhost:3000");
});