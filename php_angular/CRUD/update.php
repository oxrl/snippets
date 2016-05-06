<?php

$data = json_decode(file_get_contents("php://input"));
$email = mysqli_real_escape_string($data->email);
$nombres = mysqli_real_escape_string($data->nombres);
$apellidos = mysqli_real_escape_string($data->apellidos);
$genero = mysqli_real_escape_string($data->genero);
$pass = mysqli_real_escape_string($data->pass);
$tipo = mysqli_real_escape_string($data->tipo);

$con = mysqli_connect("localhost", "root", "");
mysqli_select_db($con,"crud");
mysqli_query($con,"UPDATE usuario set nombres = '".$nombres."', apellidos = '".$apellidos."', genero = '".$genero."', pass = '".$pass."', id_tipousuario = (SELECT id FROM tipo_usuario WHERE nombre_tipo = '".$tipo."') WHERE email = '".$email."'");
mysqli_close($con);
?>