//hides the  save+close and the upload pic button
 $(document).ready(function() {
    $('#save_close_button').hide();
    $('#upload_pic').hide();
 });

 function toggle_readonly(state){
    document.getElementById("group_name").disabled = state;
    document.getElementById("bio").disabled = state;
 }
 
 //this will be updated to save information to DB
 $(document).ready(function(){
    $("#save_button").click(function(){
        console.log("this will save information");
    });
});

//ajax call to put the groups data into the page
var groupid = 1;
$.ajax({
    type: "GET",
    url: "http://localhost:3000/Groups/"+groupid,
    dataType: 'json', 
    crossDomain : true,
    success: function (res) {
        console.log("it worked");
        console.log(res.EventName);
        document.getElementById('group_name').value = res.GroupName;
        document.getElementById('bio').value = res.Bio;
    },
    error: function (res, err) {
        console.log("it did not work");
    },
});

$(document).ready(function(){
    // once login is set up this will be passed dynamically
        var GroupID = 1;
    
        $("#save_button").click(function(){
    
            var groupname = document.getElementById('group_name').value;
            var bio = document.getElementById("bio").value;
            console.log("this will save information");
            console.log(groupname);
            var requestbody ={
                "Groupname": document.getElementById('group_name').value,
                "Bio" : document.getElementById("bio").value,
            }
            $.ajax({
                type: "PUT",
                url: "http://localhost:3000/Groups/"+GroupID,
                contentType: 'application/json',
               // data: JSON.stringify(requestbody),
                data: JSON.stringify({
                    "GroupName": groupname,
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
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/Groups/Users/"+GroupID,
            dataType: 'json', 
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
                console.log(res.GroupName);
                document.getElementById('users_name').value = res.Username;
                document.getElementById('users_bio').value = res.Bio;
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });
});

// when the log out button is clicked the cookie is set to be expired therefore deleting the cookie
$(document).ready(function(){
    $("#log_out").click(function(){
        document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "http://localhost:8000/login.html"
        console.log("log out button works")
    });
});

//when the edit button is clicked the save and close buttons appear while the edit button disapears vice verser when clicking the close button
 $(document).ready(function(){
    $("#edit_button").click(function(){
        console.log("hide");
      $("#edit_button").hide();
      $("#save_close_button").show();
      $("#upload_pic").show();
      toggle_readonly(false);
    });
    $("#close_button").click(function(){
        $("#edit_button").show();
        $("#save_close_button").hide();
        $("#upload_pic").hide();
        toggle_readonly(true);
      });
});
