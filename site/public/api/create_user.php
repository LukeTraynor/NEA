<?php
include("../../includes/databaseconnection.php");

$email = $_POST['emailInput'];
$password = $_POST['passwordInput'];
$sql = "INSERT INTO `users` (`UserID`, `Username`, `Password`, `Timestamp`) VALUES (NULL, '$email', '$password', CURRENT_TIMESTAMP)";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>