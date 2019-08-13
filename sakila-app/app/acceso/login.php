<?php require("../common/tmpl/head.php"); ?>
    <div class="container" id="contenedorLogin">
        <div class="col-md-12">
            <div class="modal-dialog">
                <h1 >Sistema de Video Clubs</h1>
                <div class="modal-content">                
                    <div class="panel-body">
                        <form id="formLogin" action="POST" action="#" method="POST">
                            <div class="form-group">
                                <label>USUARIO:</label>
                                <input class="form-control" name="login" type="text" autofocus="" >
                            </div>
                            <div class="form-group">
                                <label>CONTRASEÑA:</label>
                                <input class="form-control" name="password" type="password" value="">
                            </div>
                            <button type="submit" class="btn btn-sm btn-success pull-right">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php require("../common/tmpl/foot.php"); ?>