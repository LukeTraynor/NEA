<?php
include("../includes/databaseconnection.php");
$sql = "INSERT INTO `users` (`UserID`, `Username`, `Password`, `Timestamp`) VALUES (NULL, 'Luke', 'asdf', CURRENT_TIMESTAMP)";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>