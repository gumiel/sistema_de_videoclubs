<?php require("../common/tmpl/head.php"); ?>
    <div class="container-fluid">
          <h4 class="text-primary">Categoria</h4>
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

    <div class="container-fluid" id="ctnCategory">
        
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-body">
                        
                        <table id="tblCategory" class="table table-striped table-bordered" style="width:100%">
                            <thead>
                                <tr>
                                    <th data-priority="1" width="15"></th>                                    
                                    <th data-priority="2">Nombre</th>
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
    <div class="modal fade" id="modalCrearCategory" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formCrearCategory" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">CREAR CATEGORIA</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="category[name]" class="col-md-4 control-label">Nombre:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="category[name]" autofocus="">
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
    <div class="modal fade" id="modalEditarCategory" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formEditarCategory" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">EDITAR CATEGORIA</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="category[name]" class="col-md-4 control-label">Nombre:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control prueba" name="category[name]" autofocus="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                        <input type="hidden" name="category[category_id]" value="">
                    </div>
                </form>
            </div>
        </div>
    </div>








<?php require("../common/tmpl/footer.php"); ?>

<script src="app/category/js/category.js"></script>