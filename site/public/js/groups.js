//if the cookie for the userID doesnt exist at any time the user is redirected to the login page
$(document).ready(function() {
    if (getCookie("UserID") < 1){
        window.location.href = "http://localhost:8000/login.html"
    }

 });

//Checks to make sure the user has a cookie and logs them out if they dont
$(document).ready(function(){
    $("#log_out").click(function(){
        document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "http://localhost:8000/login.html"
        console.log("log out button works")
    });
});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

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

//creates a new group when the create group button is pressed then redirects the user to the newest group created page
$(document).ready(function(){
    $("#create_group_button").click(function(){

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/NewGroup",
            data: {
            },
            crossDomain : true,
            success: function (res) {
                console.log("new group made");
         
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/NewestGroup",
            data: {
            },
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
                console.log(res)
                setCookie("GroupID", res.GroupID, 2)
                console.log(getCookie("GroupID"))
                window.location.href = "http://localhost:8000/Group.html"
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });

        
    });
});

//displays all the groups in a table form
$(document).ready(function(){
    
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/AllGroups",
        data: {
        },
        crossDomain : true,
        success: function (res) {
            console.log("it worked");
            console.log(res[0])
            var trHTML = '';
    $.each(res, function (i, Group) {
        trHTML += '<tr><td>' + Group.GroupID + '</td><td>' + Group.GroupName + '</td><td>' + Group.Bio + '</td></tr>';
    });
    $('#groups_table').append(trHTML);
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });
});

$(document).ready(function(){
    $("#reset_button").click(function(){
        location.reload();

    });
});

// displays all the groups in a table form that Group Name begin with whatever the user searched
$(document).ready(function(){
    $("#search_button").click(function(){
        var search = document.getElementById('search_box').value
        console.log(search)
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/SearchGroups/" +search,
            data: {
                //"Search" : search,
            },
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
                console.log(res)
                var trHTML = '';
                $('td').remove();
    $.each(res, function (i, Group) {
        trHTML += '<tr><td>' + Group.GroupID + '</td><td>' + Group.GroupName + '</td><td>' + Group.Bio + '</td></tr>';
        // if there is only one result then go to the groups page
        if (res.length == 1){
            setCookie("GroupID", Group.GroupID, 2)
            window.location.href = "http://localhost:8000/Group.html"
    }
    });
    $('#groups_table').append(trHTML);
    
    
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });
    });
});
