<?php
$con =mysqli_connect("localhost", "root", "");
$data = json_decode(file_get_contents("php://input"));
$email = mysqli_real_escape_string($con,$data->email);
$nombres = mysqli_real_escape_string($con,$data->nombres);
$apellidos = mysqli_real_escape_string($con,$data->apellidos);
$genero = mysqli_real_escape_string($con,$data->genero);
$pass = mysqli_real_escape_string($con,$data->pass);
$tipo = mysqli_real_escape_string($con,$data->tipo);


mysqli_select_db($con,"crud");
mysqli_query($con,"INSERT INTO usuario(email, nombres, apellidos, genero, pass, id_tipousuario) VALUES ('".$email ."', '".$nombres."','".$apellidos."','".$genero."','".$pass."', (SELECT id FROM tipo_usuario WHERE nombre_tipo = '".$tipo."'))");
mysqli_close($con);
?>