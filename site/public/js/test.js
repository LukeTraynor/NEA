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
    $("#see_cookie").click(function(){
        console.log(getCookie("UserID"))
        console.log("working")
        var x = getCookie("UserID")
        console.log(x)
    });
});

$(document).ready(function(){
    $("#delete_cookie").click(function(){
        console.log("this button works")
        document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
});

$(document).ready(function(){
    loadAccountList();
});

function loadAccountList() {

$.ajax({
    /*url: "../srtdash/php_functions/account_list.php",
    type: "POST", 
    dataType: "JSON",
    data: {}, //this is data you send to your server*/
        type: 'POST',
        url: '../srtdash/php_functions/account_list.php',
        dataType: 'json',
        data: {},
        contentType: 'application/json; charset=utf-8',
    success: function(res)
    {   
            for (var i = 0; i < res.length; i++) {

                    var lst;

                    if (res[i]['status'] == 1 ){
                        lst = '<h4><a href="#" class="badge badge-primary">Pending</a></h4>';
                    }else if (res[i]['status'] == 2 ){
                        lst = '<h4><a href="#" class="badge badge-secondary">For Approval</a></h4>';
                    }else if (res[i]['status'] == 3 ) {
                        lst = '<h4><a href="#" class="badge badge-success">For CAD</a></h4>';
                    }else if (res[i]['status'] == 4 ){
                        lst = '<h4><a href="#" class="badge badge-danger">For Appraisal</a></h4>';
                    }else if (res[i]['status'] == 5 ){
                        lst = '<h4><a href="#" class="badge badge-info">Release</a></h4>';
                    }

              $('#tableBody').append('<tr><td hidden>' + res[i]['account_id'] 
                + '</td><td>' + res[i]['bvcsi_control'] 
                + '</td><td>' + res[i]['account_name'] 
                + '</td><td>' + res[i]['date_inspection'] 
                + '</td><td>' + res[i]['date_report'] 
                + '</td><td>' + res[i]['act_useof_prop'] 
                + '</td><td>' + res[i]['landmark']
                + '</td><td>' + res[i]['reg_owner']     
                + '</td><td>' + lst
                + '</td></tr>')
            }
    }       
});
}


// the login which also hashes the users plaintext password and compares the hash to the database
app.post('/Login', function(request, response) {
	var Username = request.body.Username;
  var User_Password = request.body.User_Password;
  //bcrypt.compare(InputPassword, hash, function(err, res) {
    bcrypt.hash(User_Password, saltRounds, (err, hash) => {
      if (Username && User_Password) {
        con.query('SELECT * FROM Users WHERE Username = \''+Username+'\'  AND User_Password = \''+hash+'\'', function(err, res, fields) {
          
          
          if (res.length > 0) {
            request.session.loggedin = true;
            request.session.username = Username;
            const token = jwt.sign({
            Username}, jwtkey,{
            algorithm: "HS256", 
            expiresIn: jwtexpiry
          });
            console.log(token)
            console.log(verify(token))
            var test = '';
            GetID(Username, function(result){
              test = result;
            });
            console.log(test);
            response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true", "token": token}))
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
});


// the login which also hashes the users plaintext password and compares the hash to the database
app.post('/Login2', function(request, response) {
    var Username = request.body.Username;
    var test = ""
    con.query('SELECT UserID FROM `Users` WHERE Username = \''+Username+'\'', function(err, result, fields) 
    {
      if (err) throw err;
      console.log("UserID2:"+parseInt(result[0].UserID));
  
      test = (result[0].UserID);
      
       
  
    });
    response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true", "ID": test}))
  
  });