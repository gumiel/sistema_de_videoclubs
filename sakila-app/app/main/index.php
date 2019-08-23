<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="Plantilla de prueba para movil">
    <meta name="author" content="Henry Perez Gumiel">
    <meta name="theme-color" content="#162A75" />
    
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">



    <title>Sistema de Video Clubs</title>

    <!-- Bootstrap core CSS -->
    <link href="../../public/libs/boostrap/css/bootstrap.min.css" rel="stylesheet">    

    <!-- Estilos propios  -->
    <link rel="stylesheet" type="text/css" href="../../public/css/style.css">

  </head>

  <body id="paginaPrincipal">

<nav class="navbar fixed-top navbar-default navbar-static-top" >
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle navbar-toggle-sidebar collapsed">
            MENU
            </button>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
                Sistema de Video Clubs
            </a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">      
            <!-- <form class="navbar-form navbar-left" method="GET" role="search">
                <div class="form-group">
                    <input type="text" name="q" class="form-control" placeholder="Buscar...">
                </div>
                <button type="submit" class="btn btn-default"><i class="glyphicon glyphicon-search"></i></button>
            </form> -->
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown ">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    Perfil<span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li class="dropdown-header">Configuracion</li>
                        <li class=""><a href="#">Cambiar Perfil</a></li>
                        <li class="divider"></li>
                        <li><a href="#cerrarSession">Cerrar Session</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right" id="listBtnMenu">
                <!-- <li><a href="http://www.pingpong-labs.com" target="_blank">Inicio</a></li> -->
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>      
<div class="container-fluid main-container" id="menuGeneral">
    <div class="col-md-2 sidebar">
        <div class="row">
            <!-- uncomment code for absolute positioning tweek see top comment in css -->
            <div class="absolute-wrapper"></div>
            <!-- Menu -->
            <div class="side-menu">
                <nav class="navbar navbar-default" role="navigation" >
                    <!-- Main Menu -->
                    <div class="side-menu-container">
                        <ul class="nav navbar-nav" id="listaMenu">
                            <li class="active"><a href="#"><span class="glyphicon glyphicon-dashboard"></span> Panel de Control</a></li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </nav>
            </div>
        </div>          
    </div>
    <div class="col-md-10" id="contenedorIframes">
        <iframe id="ifrm" width="100%" src="http://192.168.56.2/kerp/movil/recibida-interna-sin.php" frameborder="0" allowfullscreen ></iframe>
    </div>
    <footer class="pull-left footer">
        <p class="col-md-12">
            <hr class="divider">
            Copyright &COPY; 2019 <a href="#">Sistema de Video Clubs</a>
        </p>
    </footer>
</div>
    

    
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="../../public/configurations/config.js"></script>


    <!-- <script src="../../public/libs/jquery/jquery-3.3.1.min.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script> -->
    <script type="text/javascript" src="../../public/libs/jquery/jquery-2.2.5.min.js"></script>
    <script type="text/javascript" src="../../public/libs/moment/js/moment.min.js"></script>

    <!-- Bootstrap JS -->
    <script src="../../public/libs/boostrap/js/transition.js"></script>
    <script src="../../public/libs/boostrap/js/collapse.js"></script>
    <script src="../../public/libs/boostrap/js/bootstrap.min.js"></script>


    
    

    
    <!-- Jquery validation JS-->
    <script type="text/javascript" src="../../public/libs/jquery-validation/js/jquery.validate.min.js"></script>

    <!-- Select2 JS -->
    <script src="../../public/libs/select2/js/select2.min.js"></script>


    <!-- Componentes -->
    <script src="../../public/components/ContainerJS.js" type="text/javascript"></script>
    <script src="../../public/components/CallRest.js" type="text/javascript"></script>
    <script src="../../public/components/CorrectorIframe.js" type="text/javascript"></script>

  </body>
</html>

<script src="js/index.js"></script>

<script>




</script>