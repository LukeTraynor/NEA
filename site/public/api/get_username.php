<?php
include("../../includes/databaseconnection.php");

$sql = "SELECT * FROM `users` WHERE `UserID`=52";
//$sql = "SELECT * FROM `users`";


//if ($conn->query($sql) === TRUE) {
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
 //echo "id: " . $row["UserID"]. " - Name: " . $row["Username"]. " " . $row["Password"]. "<br>"; 
 echo " - Name: " . $row["Username"]; 
     }
} else {
  echo "0 results";
}

//} else {
  //echo "Error: " . $sql . "<br>" . $conn->error;
//}

$conn->close();
?>