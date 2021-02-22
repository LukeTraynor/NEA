$(document).ready(function() {
    $('#registered').hide();
    $('#incorrect').hide();
 });

 //inputing correct data then pressing the register button inserts a new user into the users table
$(document).ready(function(){
    $("#register_button").click(function(){
        var Username = document.getElementById('inputEmail').value
        var User_Password = document.getElementById('inputPassword').value
        console.log(Username);
    
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/Register",
            data: {
                "Username": Username,
                "User_Password": User_Password
            },
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
                $('#registered').show();

         
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });
    });
});

//function to get whats stored inside the cookie
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

//prototype data when first using cookies
$(document).ready(function(){
    $("#create_cookie").click(function(){
        setCookie("UserID", 1, 2);
        console.log(getCookie("UserID"))
    });
});

// checking the inputted username and password that the user entered to the data in the database then letting the user into their profile if the data is correct
$(document).ready(function(){
    $("#sign_in_button").click(function(){
        var Username = document.getElementById('inputEmail').value
        var User_Password = document.getElementById('inputPassword').value
        console.log(Username);
        
        
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/Login2/" + Username ,
            dataType: 'json', 
            crossDomain : true,
            data: {
            },
            success: function (res) {
                console.log("it worked");
                if (res.loggedin == "false") {
                    
                    console.log("fail")
                    //displays the incorrect message to the user if they have entered the wrong username or password
                    $('#registered').hide();
                    $('#incorrect').show();
                  } else {
                    if (res.Plaintext == User_Password) {  
                        console.log("success")
                        setCookie("UserID", res.UserID, 2);
                        $('#registered').hide();
                        $('#incorrect').hide();
                        window.location.href = "http://localhost:8000/profile.html"
                    } else{
                        $('#incorrect').show();
                    }
                  }
            },
            error: function (res, err) {
                console.log("it did not work");
                console.log(res);
                console.log(err);
                

            },
        });
    });
});