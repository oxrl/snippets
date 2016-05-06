<?php
$data = json_decode(file_get_contents("php://input"));
$email = mysqli_real_escape_string($data->email);

$con = mysqli_connect("localhost", "root", "");
mysqli_select_db($con,"crud");
mysqli_query($con,"DELETE FROM usuario WHERE email = '".$email."'", $con);
mysqli_query("commit");
mysqli_close($con);
?>