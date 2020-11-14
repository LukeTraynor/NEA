
$(document).ready(function(){
    $("#edit_button").click(function(){
        console.log("hide");
      $("#edit_button").hide();
    });
    $("#upload_pic").click(function(){
        $("#edit_button").show();
      });
});

// function myfunction(){
//     console.log("hide");
//        $("#edit_button").hide();

// }

// $("#edit_button").click(function(){
//     console.log("hide");
//     $("#edit_button").toggle();
//   });

// $(document).ready(function(){
//     $("#hide").click(function(){
//       $("p").hide();
//     });
//     $("#show").click(function(){
//       $("p").show();
//     });
//   });