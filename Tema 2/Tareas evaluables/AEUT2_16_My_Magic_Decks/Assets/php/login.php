<?php
if (isset($_GET)) {
    $datosRecibidos = $_GET;
    
    if ($datosRecibidos['usuario'] == 'Ruben' && $datosRecibidos['password'] == '1234') {
        $respuesta = '{ "validation" : "true" }';
    } else {
        $respuesta = '{ "validation" : "false" }';
    }
    echo $respuesta;
}
?>