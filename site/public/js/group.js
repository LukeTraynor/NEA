
 $(document).ready(function() {
    $('#save_close_button').hide();
    $('#upload_pic').hide();
 });

 function toggle_readonly(state){
    document.getElementById("group_name").disabled = state;
    document.getElementById("bio").disabled = state;
 }
 
 //this will be updated to save information to DB
 $(document).ready(function(){
    $("#save_button").click(function(){
        console.log("this will save information");
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
