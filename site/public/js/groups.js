// $('#myModal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('show');
//   })

$(document).ready(function(){
    $("#log_out").click(function(){
        document.cookie = "Username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "http://localhost:8000/login.html"
        console.log("log out button works")
    });
});