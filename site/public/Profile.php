

<!doctype html>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<?php
include("../includes/databaseconnection.php");
$userID = "52";
$sql = "SELECT * FROM `users` WHERE `UserID`='$userID'";
$result = $conn->query($sql);
$username = "";
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
 //echo "id: " . $row["UserID"]. " - Name: " . $row["Username"]. " " . $row["Password"]. "<br>"; 
 $username= $row["Username"]; 
     }
} else {
  echo "0 results";
}

?>
<form class="form-update">
  <div class="form-group">
    <label for="emailInput">Username:</label>
    <input type="email" class="form-control" placeholder="Enter Username" id="usernameInput" value="<?php echo htmlspecialchars($username); ?>">
  </div>
  <button type="submit" class="btn btn-primary">Update</button>
</form>


      <script type="text/javascript">
      document.querySelector('form.form-update').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();
    userID = '<?php echo $userID ;?>'
   $.ajax({
        type: "POST",
        url: "./api/update_user.php",
        data: { 'newemailInput': usernameInput.value, 'userIDInput': userID },
        //dataType: 'json', this breaks everything look into why
        success: function () {
            console.log("it worked");
        },
        error: function () {
            console.log("it did not work");
        },
    });
});</script>
</html>

