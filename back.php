<?php
$entityBody = file_get_contents('php://input');
echo file_put_contents('./datos/prueba.txt', $entityBody);

echo $entityBody;

?>
