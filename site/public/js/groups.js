// $('#myModal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('show');
//   })

$(document).ready(function(){
    $("#log_out").click(function(){
        document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "http://localhost:8000/login.html"
        console.log("log out button works")
    });
});

$(document).ready(function(){
    $("#create_group_button").click(function(){
    
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/NewGroup",
            data: {
            },
            crossDomain : true,
            success: function (res) {
                console.log("it worked");
                window.location.href = "http://localhost:8000/Group.html"
         
            },
            error: function (res, err) {
                console.log("it did not work");
            },
        });
    });
});