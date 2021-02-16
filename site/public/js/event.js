//creating a function to be used to disable and enable the text boxes without reusing code
function toggle_readonly(state){
    document.getElementById("event_name").disabled = state;
    document.getElementById("date_of_event").disabled = state;
    document.getElementById("bio").disabled = state;
}

//Checks to make sure the user has a cookie and logs them out if they dont
$(document).ready(function() {
    if (getCookie("UserID") < 1){
        window.location.href = "http://localhost:8000/login.html"
    }

 });


//this puts the database information into the page 
$(document).ready(function() {
    $('#save_close_button').hide();
 });

 var eventid = 1;
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/Events/"+eventid,
        dataType: 'json', 
        crossDomain : true,
        success: function (res) {
            console.log("it worked");
            console.log(res.EventName);
            document.getElementById('event_name').value = res.EventName;
            //fix date of event sql table datafield
            document.getElementById('bio').value = res.Bio;
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });

// when 
$(document).ready(function(){
    // once login is set up this will be passed dynamically
        var EventID = 1;
        
        $("#save_button").click(function(){
        
            var eventname = document.getElementById('event_name').value;
            var bio = document.getElementById("bio").value;
            var dateofevent = document.getElementById("date_of_event").value;
            console.log("this will save information");
            console.log(eventname);
            var requestbody ={
                "Groupname": document.getElementById('event_name').value,
                "Bio" : document.getElementById("bio").value,
                //"DateOfEvent" : document.getElementById("date_of_event").value,
            }
            $.ajax({
                type: "PUT",
                url: "http://localhost:3000/Events/"+EventID,
                contentType: 'application/json',
                // data: JSON.stringify(requestbody),
                data: JSON.stringify({
                    "EventName": eventname,
                    "Bio": bio,
                    //"DateOfEvent" : dateofevent,
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
      toggle_readonly(false);
    });
    $("#close_button").click(function(){
        $("#edit_button").show();
        $("#save_close_button").hide();
        toggle_readonly(true);
      });
});