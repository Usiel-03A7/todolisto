<?php

$entityBody = file_get_contents('php://input');
$datos=json_decode($entityBody,true); 
var_dump($datos);

$ruta="./datos/".$datos["correo"];
echo $ruta;
echo file_put_contents($ruta, $datos["archi"]);

// $fileAr = fopen($datos["correo"],a)
// fwrite($fileAr,$datos["archi"])
// fclose(fileAr);
//
//
//
//
//
//
//
?>