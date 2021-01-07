
 $(document).ready(function() {
    $('#save_close_button').hide();
    $('#upload_pic').hide();
 });

 function toggle_readonly(state){
    document.getElementById("email").disabled = state;
    document.getElementById("first_name").disabled = state;
    document.getElementById("last_name").disabled = state;
    document.getElementById("bio").disabled = state;
 }
 

 $(document).ready(function(){
// once login is set up this will be passed dynamically
    var userid = 1;

    $("#save_button").click(function(){

        var fname = document.getElementById('first_name').value
        var email = document.getElementById("email").disabled = state;
        var lname = document.getElementById("last_name").disabled = state;
        var bio = document.getElementById("bio").disabled = state;
        console.log("this will save information");
        console.log(fname);
        var requestbody ={
            "FirstName": document.getElementById('first_name').value
        }
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/Users/"+userid,
            contentType: 'application/json',
           // data: JSON.stringify(requestbody),
            data: JSON.stringify({
                "FirstName": fname
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
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });

    //Get Groups
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/Groups/"+userid,
        dataType: 'json', 
        crossDomain : true,
        success: function (res) {
            console.log("it worked");
            console.log(res.GroupName);
         
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });

});


// hiding and showing of edit, save and close buttons.
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
