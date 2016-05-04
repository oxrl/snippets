<?php
/*
* Datos de conexión a MySQL
*/
$db_database = 'test';
$db_hostname = 'localhost';
$db_username = 'root';
$db_password = '';

/*
* Creación del objeto mysqli
*/
$mysqli = new mysqli($db_hostname, $db_username, $db_password, $db_database);

/*
* Buscamos posibles errores en la conexión
*/
if (mysqli_connect_errno()) {
    printf("Falló la conexión: %s\n", mysqli_connect_error());
    exit();
}

/*
* Creación de la consulta SQL
*/
$query = "SELECT * FROM empleado";

/*
* Guardamos el resultado que devuelve MySQL
*/
$resultado = $mysqli->query($query);

/*
* Iteramos sobre el resultado y mostramos los datos
*/
$data[]=array();
$i=0;
while ($producto = $resultado->fetch_assoc()) {

    $data[$i] = array( "id" => $producto["id"],"nombre" => utf8_encode($producto["Nombre"]),"apellido" =>utf8_encode($producto["Apellido"]));
   $i++;
}
//print_r($data);
/*
* Liberamos los recursos reservados
*/

$resultado->free();
$mysqli->close();

echo json_encode($data);

?>