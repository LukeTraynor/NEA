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

// gets all the events and displays them in a table
$(document).ready(function(){
    
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/AllEvents",
        data: {
        },
        crossDomain : true,
        success: function (res) {
            console.log("it worked");
            console.log(res[0])
            var trHTML = '';
    $.each(res, function (i, event) {
        trHTML += '<tr><td>' + event.EventID + '</td><td>' + event.EventName + '</td><td>' + event.DateOfEvent + '</td><td>' + event.Bio + '</td></tr>';
    });
    $('#events_table').append(trHTML);
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });
});

//Checks to make sure the user has a cookie and logs them out if they dont
$(document).ready(function() {
    if (getCookie("UserID") < 1){
        window.location.href = "http://localhost:8000/login.html"
    }

 });

 //when log out is clicked the user is sent to the login screen
$(document).ready(function(){
    $("#log_out").click(function(){
        document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "http://localhost:8000/login.html"
        console.log("log out button works")
    });
});

//when the reset button is pressed the page is reloaded
$(document).ready(function(){
    $("#reset_button").click(function(){
        location.reload();

    });
});

//gets all the groups according to the search then puts them in a table form
$(document).ready(function(){
    $("#search_button").click(function(){
        var search = document.getElementById('search_box').value
        console.log(search)
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/SearchEvents/" +search,
            data: {
            },
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
                console.log(res)
                var trHTML = '';
                $('td').remove();
    $.each(res, function (i, event) {
        trHTML += '<tr><td>' + event.EventID + '</td><td>' + event.EventName + '</td><td>' + event.DateOfEvent + '</td><td>' + event.Bio + '</td></tr>';
        //if there is only one result then go to that events page
        if (res.length == 1){
            setCookie("EventID", event.EventID, 2)
            window.location.href = "http://localhost:8000/Event.html"
    }
    });
    $('#events_table').append(trHTML);
    
    
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });
    });
});

//pressing the add event button creates a new event then goes to the event page of the newest event made
$(document).ready(function(){
    $("#add_button").click(function(){

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/NewEvent",
            data: {
            },
            crossDomain : true,
            success: function (res) {
                console.log("new event made");
         
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/NewestEvent",
            data: {
            },
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
                console.log(res)
                setCookie("EventID", res.EventID, 2)
                console.log(getCookie("EventID"))
                window.location.href = "http://localhost:8000/Event.html"
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });

        
    });
});