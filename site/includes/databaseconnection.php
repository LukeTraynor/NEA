<?php
$servername = "localhost";
$username = "server_access";
//this is a local database and a strong password would be used when it's remote
$password = "12345";
$dbname = "group_calendar";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>