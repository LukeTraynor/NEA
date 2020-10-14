<?php
include("../../includes/databaseconnection.php");

$newemail = $_POST['newemailInput'];
$userID = $_POST['userIDInput'];
$sql = "UPDATE `users` SET `Username` = '$newemail' WHERE `users`.`UserID` = '$userID'";

if ($conn->query($sql) === TRUE) {
  echo "New record updated successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>