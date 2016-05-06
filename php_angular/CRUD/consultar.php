<?php
$con = mysqli_connect("localhost", "root", "");
if (!$con) 
{
	die("No se puede conectar: " . mysqli_error());
}
mysqli_select_db($con,"crud");
$sql = mysqli_query($con,"SELECT email, nombres, apellidos, genero, pass, nombre_tipo FROM usuario INNER JOIN tipo_usuario ON id_tipousuario = id");
if (mysqli_num_rows($sql))
{
	$data = array();
	while ($row = mysqli_fetch_array($sql))
	{
		$data[] = array(
			'email' => $row['email'],
			'nombre' => $row['nombres'],
			'apellido' => $row['apellidos'],
			'genero' => $row['genero'],
			'pass' => $row['pass'],
			'tipo_usuario' => $row['nombre_tipo']
		);
	}
	header('Context-type: application/json');
	echo json_encode($data);
}
mysqli_close($con);
?>