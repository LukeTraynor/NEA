function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

$(document).ready(function(){
    $("#create_cookie").click(function(){
        setCookie("UserID", 1, 2);
        console.log(getCookie("UserID"))
    });
});

$(document).ready(function(){
    $("#create_cookie2").click(function(){
        setCookie("GroupID", 3, 2);
        console.log(getCookie("GroupID"))
    });
});


$(document).ready(function(){
    $("#see_cookie").click(function(){
        console.log(getCookie("UserID"))
        console.log("working")
        var x = getCookie()
        console.log(x)
    });
});

$(document).ready(function(){
    $("#delete_cookie").click(function(){
        console.log("this button works")
        document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
});

// $(document).ready(function() {
//     if (getCookie("UserID") < 1){
//         window.location.href = "http://localhost:8000/login.html"
//     }

//  });


// // the login which also hashes the users plaintext password and compares the hash to the database
// app.post('/Login', function(request, response) {
// 	var Username = request.body.Username;
//   var User_Password = request.body.User_Password;
//   //bcrypt.compare(InputPassword, hash, function(err, res) {
//     bcrypt.hash(User_Password, saltRounds, (err, hash) => {
//       if (Username && User_Password) {
//         con.query('SELECT * FROM Users WHERE Username = \''+Username+'\'  AND User_Password = \''+hash+'\'', function(err, res, fields) {
          
          
//           if (res.length > 0) {
//             request.session.loggedin = true;
//             request.session.username = Username;
//             const token = jwt.sign({
//             Username}, jwtkey,{
//             algorithm: "HS256", 
//             expiresIn: jwtexpiry
//           });
//             console.log(token)
//             console.log(verify(token))
//             var test = '';
//             GetID(Username, function(result){
//               test = result;
//             });
//             console.log(test);
//             response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true", "token": token}))
//           } else {
//             response.send(JSON.stringify({"message": "Incorrect Username and/or Password!", "loggedin": "false"}));
//           }			
//           response.end();
//         });
//       } else {
//         response.send(JSON.stringify({"message": "Please enter Username and Password!", "loggedin": "false"}));
//         response.end();
//       }
//     });
// });


// // the login which also hashes the users plaintext password and compares the hash to the database
// app.post('/Login2', function(request, response) {
//     var Username = request.body.Username;
//     var test = ""
//     con.query('SELECT UserID FROM `Users` WHERE Username = \''+Username+'\'', function(err, result, fields) 
//     {
//       if (err) throw err;
//       console.log("UserID2:"+parseInt(result[0].UserID));
  
//       test = (result[0].UserID);
      
       
  
//     });
//     response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true", "ID": test}))
  
//   });

$(document).ready(function(){
    
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/AllGroups",
            data: {
            },
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
                console.log(res)
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });
});