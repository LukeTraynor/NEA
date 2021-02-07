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
        setCookie("Username", "luke", 2);
        console.log(getCookie("Username"))
    });
});

$(document).ready(function(){
    $("#see_cookie").click(function(){
        console.log(getCookie("Username"))
        console.log("working")
    });
});

$(document).ready(function(){
    $("#delete_cookie").click(function(){
        console.log("this button works")
        document.cookie = "Username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
});