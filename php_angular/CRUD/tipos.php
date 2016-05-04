<?php
$con = mysqli_connect("localhost", "root", "");
if (!$con) 
{
	die("No se puede conectar: " . mysqli_error());
}
mysqli_select_db($con,"crud");
$sql = mysqli_query($con,"SELECT nombre_tipo FROM tipo_usuario");
if (mysqli_num_rows($sql))
{
	$data = array();
	while ($row = mysqli_fetch_array($sql))
	{
		$data[] = array(
			'nombre' => $row['nombre_tipo']
		);
	}
	header('Context-type: application/json');
	echo json_encode($data);
}
mysqli_close($con);
?>