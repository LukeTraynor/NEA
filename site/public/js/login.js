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
         
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });
    });
});

$(document).ready(function(){
    $("#sign_in_button").click(function(){
        var Username = document.getElementById('inputEmail').value
        var User_Password = document.getElementById('inputPassword').value
        console.log(Username);
    
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/Login",
            data: {
                "Username": Username,
                "User_Password": User_Password
            },
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
         
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });
    });
});