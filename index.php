<?php 
   $saml_lib_path = '/simplesamlphp/lib/_autoload.php';  
    require_once($saml_lib_path);
    // Fuente de autenticacion definida en el authsources del SP ej, default-sp
	$SP_ORIGEN= 'desarrollo4sistemas';   
    // Se crea la instancia del saml, pasando como parametro la fuente de autenticacion.
	$saml = new SimpleSAML_Auth_Simple($SP_ORIGEN); 
	$saml ->requireAuth();
	$atributos=$saml->getAttributes();

	session_start();
	$_SESSION["uCorreo"]=$atributos["uCorreo"][0];
		

?><!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- <script src="js/FileSaver.js"></script> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-0evHe/X+R7YkIZDRv uzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
        crossorigin="anonymous"></script>
<link rel="manifest" href="./manifest.json">
    <!-- <link rel="stylesheet" href="/css/style.css"> -->

    
   
    <meta name="theme-color" content="#2F3BA2">
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    
    <link rel="apple-touch-icon" href="/images/img1.jpg" />
    <link rel="apple-touch-icon" href="/images/img2.jpg" />
    <link rel="apple-touch-icon" href="/images/img3.jpg" />
    <link rel="apple-touch-icon" href="/images/img4.jpg" />
    <link rel="apple-touch-icon" href="/images/img5.webp" />
    <link rel="apple-touch-icon" href="/images/img6.jpg" />
    <link rel="apple-touch-icon" href="/images/img7.jpg" />
    

    <meta name="apple-mobile-web-app-status-bar" content="#db4938" />




    <title> applitacion crud</title>
</head>

<body>
    <!-- �sta es la parte que no jala-->
<p>

</p>
	 
    <p id="uCorreo"> <?php echo $_SESSION["uCorreo"];?>  </p>

    <div class="contenedor">
        <input type="text" placeholder="Ingrese una tarea" class="entradaTex">
        <input type="submit" class="boton">
    </div>
    <div id="contenedor_input">
        
    </div>
    <div>
       <input  style="display: flex; margin-top: 2rem; margin-left: 3rem;" type="submit" class="extraer" value="Extraer">
    
   </div>
    <!-- �sta es la parte que jala pero debo pasarla a lo anterior-->
  
	<div class="cerrar">

	<a href="https://wayf.ucol.mx/module.php/saml/disco.php?entityID=https%3A%2F%2Fwayf.ucol.mx%2F&return=https%3A%2F%2Fwayf.ucol.mx%2Fmodule.php%2Fsaml%2Fsp%2Fdiscoresp.php%3FAuthID%3D_6c67a254baa379494784ad80600d20513426e5da1a%253Ahttps%253A%252F%252Fwayf.ucol.mx%252Fsaml2%252Fidp%252FSSOService.php%253Fspentityid%253Dhttps%25253A%25252F%25252Fsistemas.cruzperez.com%2526cookieTime%253D1656963992%2526RelayState%253Dhttps%25253A%25252F%25252Fsistemas.cruzperez.com%25252Fusiel%25252Findex.php&returnIDParam=idpentityid">Close session <?php session_destroy(); ?></a>


	</div>

        	
    <script src="./js/app.js"></script>

    
</script> 
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>
    <script src="./js/bootstrap.bundle.min.js"></script>
    <script src="./js/jquery-3.6.0.js"></script>
    <script src="./regist_serviceWorker.js">-->
    
 
</body>

</html>