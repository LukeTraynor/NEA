
 $(document).ready(function() {
    $('#save_close_button').hide();
    $('#upload_pic').hide();
 });

 function toggle_readonly(state){
    document.getElementById("exampleInputEmail").disabled = state;
    document.getElementById("first_name").disabled = state;
    document.getElementById("second_name").disabled = state;
    document.getElementById("bio").disabled = state;
 }
 
 //this will be updated to save information to DB
 $(document).ready(function(){
    $("#save_button").click(function(){
        console.log("this will save information");
    });
var userid = 1;
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
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });

});

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
