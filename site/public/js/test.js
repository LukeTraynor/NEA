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
        setCookie("UserID", 1, 2);
        console.log(getCookie("UserID"))
    });
});

$(document).ready(function(){
    $("#see_cookie").click(function(){
        console.log(getCookie("UserID"))
        console.log("working")
        var x = getCookie("UserID")
        console.log(x)
    });
});

$(document).ready(function(){
    $("#delete_cookie").click(function(){
        console.log("this button works")
        document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
});


// // the login which also hashes the users plaintext password and compares the hash to the database
// app.post('/Login', function(request, response) {
// 	var Username = request.body.Username;
//   var User_Password = request.body.User_Password;
//   //bcrypt.compare(InputPassword, hash, function(err, res) {
//     bcrypt.hash(User_Password, saltRounds, (err, hash) => {
//       if (Username && User_Password) {
//         con.query('SELECT * FROM Users WHERE Username = \''+Username+'\'  AND User_Password = \''+hash+'\'', function(err, res, fields) {
          
          
//           if (res.length > 0) {
//             request.session.loggedin = true;
//             request.session.username = Username;
//             const token = jwt.sign({
//             Username}, jwtkey,{
//             algorithm: "HS256", 
//             expiresIn: jwtexpiry
//           });
//             console.log(token)
//             console.log(verify(token))
//             var test = '';
//             GetID(Username, function(result){
//               test = result;
//             });
//             console.log(test);
//             response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true", "token": token}))
//           } else {
//             response.send(JSON.stringify({"message": "Incorrect Username and/or Password!", "loggedin": "false"}));
//           }			
//           response.end();
//         });
//       } else {
//         response.send(JSON.stringify({"message": "Please enter Username and Password!", "loggedin": "false"}));
//         response.end();
//       }
//     });
// });


// // the login which also hashes the users plaintext password and compares the hash to the database
// app.post('/Login2', function(request, response) {
//     var Username = request.body.Username;
//     var test = ""
//     con.query('SELECT UserID FROM `Users` WHERE Username = \''+Username+'\'', function(err, result, fields) 
//     {
//       if (err) throw err;
//       console.log("UserID2:"+parseInt(result[0].UserID));
  
//       test = (result[0].UserID);
      
       
  
//     });
//     response.send(JSON.stringify({"message": "You are logged in", "loggedin": "true", "ID": test}))
  
//   });

  function addRow() {
          
    var GroupID = document.getElementById("groupid");
    var GroupName = document.getElementById("groupname");
    var Bio = document.getElementById("bio");
    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 
    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= GroupID.value;
    row.insertCell(2).innerHTML= GroupName.value;
    row.insertCell(2).innerHTML= Bio.value;
 
}
 
function deleteRow(obj) {
      
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    
}
 
function addTable() {
      
    var myTableDiv = document.getElementById("myDynamicTable");
      
    var table = document.createElement('TABLE');
    table.border='1';
    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
      
    for (var i=0; i<3; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       
       for (var j=0; j<4; j++){
           var td = document.createElement('TD');
           td.width='75';
           td.appendChild(document.createTextNode("Cell " + i + "," + j));
           tr.appendChild(td);
       }
    }
    myTableDiv.appendChild(table);
    
}
 
function load() {
    
    console.log("Page load finished");
 
}