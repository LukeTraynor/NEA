
 $(document).ready(function() {
    $('#save_close_delete_button').hide();
    $('#upload_pic').hide();
 });

 function toggle_readonly(state){
    document.getElementById("email").disabled = state;
    document.getElementById("first_name").disabled = state;
    document.getElementById("last_name").disabled = state;
    document.getElementById("bio").disabled = state;
 }

 //Checks to make sure the user has a cookie and logs them out if they dont
 $(document).ready(function() {
    if (getCookie("UserID") < 1){
        window.location.href = "http://localhost:8000/login.html"
    }

 });
 

 $(document).ready(function(){

    var userid = getCookie("UserID");
    console.log(userid)


    $("#save_button").click(function(){

        var fname = document.getElementById('first_name').value
        var email = document.getElementById("email").value;
        var lname = document.getElementById("last_name").value;
        var bio = document.getElementById("bio").value;
        console.log("this will save information");
        console.log(fname);
        var requestbody ={
            "FirstName": document.getElementById('first_name').value,
            "Email" : document.getElementById("email").value,
            "LastName" : document.getElementById("last_name").value,
            "Bio" : document.getElementById("bio").value
        }
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/Users/"+userid,
            contentType: 'application/json',
           // data: JSON.stringify(requestbody),
            data: JSON.stringify({
                "FirstName": fname,
                "Email": email,
                "LastName": lname,
                "Bio": bio
            }),
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
            },
            error: function (res, err) {
                console.log("it did not work:"+ err+ "res:"+res);
            },
        });

    });



// ajax call to put database data into the page
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users/"+userid,
        dataType: 'json', 
        crossDomain : true,
        success: function (res) {
            console.log("it worked");
            console.log(res.FirstName);
            document.getElementById('first_name').value = res.FirstName;
            document.getElementById('last_name').value = res.LastName;
            document.getElementById('email').value = res.Email;
            document.getElementById('bio').value = res.Bio;
            document.getElementById('username').value = res.Username;
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });

    //Get Groups
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/Users/Groups/"+userid,
        dataType: 'json', 
        crossDomain : true,
        success: function (res) {
            console.log("it worked");
            console.log(res.GroupName);
            document.getElementById('group_name').value = res.GroupName;
            document.getElementById('group_bio').value = res.Bio;
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });

});

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

$(document).ready(function(){
    $("#see_cookie").click(function(){
        console.log(getCookie("UserID"))
        console.log("hell23o")
    });
});

$(document).ready(function(){
    $("#log_out").click(function(){
        document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "http://localhost:8000/login.html"
        console.log("log out button works")
        console.log("cookie has been deleted")
    });
});

//Delete User Ajax call
$(document).ready(function(){
    // once login is set up this will be passed dynamically
        var UserID = getCookie("UserID");;
    
        $("#delete_button").click(function(){
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/DeleteUser/"+UserID,
                dataType: 'json', 
                crossDomain : true,
                success: function (res) {
                    console.log("it worked");
                    //delete the cookie then go to the login page
                    document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    console.log("cookie has been deleted")
                    //window.location.href = "http://localhost:8000/login.html"
                },
                error: function (res, err) {
                    console.log("it did not work");
                },
            });
            window.location.href = "http://localhost:8000/login.html"

    });
}); 

// hiding and showing of edit, save and close buttons.
 $(document).ready(function(){
    $("#edit_button").click(function(){
        console.log("hide");
      $("#edit_button").hide();
      $("#save_close_delete_button").show();
      $("#upload_pic").show();
      toggle_readonly(false);
    });
    $("#close_button").click(function(){
        $("#edit_button").show();
        $("#save_close_delete_button").hide();
        $("#upload_pic").hide();
        toggle_readonly(true);
      });
});
