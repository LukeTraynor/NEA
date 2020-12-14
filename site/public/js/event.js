function toggle_readonly(state){
    document.getElementById("Event_name").disabled = state;
    document.getElementById("date_of_event").disabled = state;
    document.getElementById("bio").disabled = state;
}

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
            console.log(res.FirstName);
            document.getElementById('Event_name').value = res.EventName;
            //fix date of event sql table datafield
            document.getElementById('bio').value = res.Bio;
        },
        error: function (res, err) {
            console.log("it did not work");
        },
    });

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