<?php
$entityBody = file_get_contents('php://input');
echo file_put_contents('./datos/prueda.json', $entityBody);

echo $entityBody;

?>
