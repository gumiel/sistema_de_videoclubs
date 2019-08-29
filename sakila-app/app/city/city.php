<?php require("../common/tmpl/head.php"); ?>
    <div class="container-fluid">
          <h4 class="text-primary">Ciudades</h4>
    </div>
    <div class="container-fluid" id="ctnBotonera">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-heading text-left">
                        <div class="btn-group" role="group" aria-label="...">
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnCrear">
                                <i class="glyphicon glyphicon-plus"></i> <br>Crear
                            </button>
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnEditar">
                                <i class="glyphicon glyphicon-pencil"></i> <br>Editar
                            </button>
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnEliminar">
                                <i class="glyphicon glyphicon-remove"></i> <br>Eliminar
                            </button>
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnActualizar"> 
                                <i class="glyphicon glyphicon-refresh"></i> <br>Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 

    <div class="container-fluid" id="ctnCity">
        
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-body">
                        
                        <table id="tblCity" class="table table-striped table-bordered" style="width:100%">
                            <thead>
                                <tr>
                                    <th data-priority="1" width="15"></th>                                    
                                    <th data-priority="2">Ciudad</th>
                                    <th data-priority="2">Pais</th>
                                    <th data-priority="3">Fecha Ultima Modificacion</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </div>

    </div><!-- /.container -->




    <!-- Modal -->
    <div class="modal fade" id="modalCrearCity" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formCrearCity" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">CREAR CIUDAD</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="city[city]" class="col-md-4 control-label">Nombre:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="city[city]" autofocus="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="city[country_id]" class="col-md-4 control-label">Pais:</label>
                                    <div class="col-md-8">
                                        <select name="city[country_id]" class="form-control">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>                        
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalEditarCity" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formEditarCity" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">EDITAR CIUDAD</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="city[city]" class="col-md-4 control-label">Nombre:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="city[city]" autofocus="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="city[country_id]" class="col-md-4 control-label">Pais:</label>
                                    <div class="col-md-8">
                                        <select name="city[country_id]" class="form-control">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                        <input type="hidden" name="city[city_id]" value="">
                    </div>
                </form>
            </div>
        </div>
    </div>








<?php require("../common/tmpl/footer.php"); ?>

<script src="app/city/js/city.js"></script>