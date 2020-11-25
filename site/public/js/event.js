function toggle_readonly(state){
    document.getElementById("Event_name").disabled = state;
    document.getElementById("date_of_event").disabled = state;
    document.getElementById("bio").disabled = state;
}

$(document).ready(function() {
    $('#save_close_button').hide();
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