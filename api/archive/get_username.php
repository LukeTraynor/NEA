<?php
include("../../includes/databaseconnection.php");

$sql = "SELECT * FROM `users` WHERE `UserID`=52";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {

 echo " - Name: " . $row["Username"]; 
     }
} else {
  echo "0 results";
}



$conn->close();
?>