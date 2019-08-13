<?php require("../common/tmpl/header-sin.php"); ?>
    <div class="container-fluid">
        <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11">
            <h4 class="text-primary">Correspondencia Recibida</h4>
        </div>
        <div class="text-right" style="margin-top:5px">
            <button type="button" id="btnCerrarIframe" class="btn btn-danger btn-circle btn-sm"><i class="glyphicon glyphicon-remove"></i></button>
        </div>
    </div>
    <div class="container-fluid" id="botonera">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-heading text-left">
                        <div class="btn-group" role="group" aria-label="...">
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnFinalizar">
                                <i class="glyphicon glyphicon-ok"></i> <br>Finalizar
                            </button>
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnAdjuntos">
                                <i class="glyphicon glyphicon-folder-open"></i> <br>Adjuntos
                            </button>
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnVerDocumento"> 
                                <i class="glyphicon glyphicon-paperclip"></i> <br>Ver Documento
                            </button>
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnDerivar"> 
                                <i class="glyphicon glyphicon-chevron-right"></i> <br>Derivar
                            </button>
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnDetalleDerivacion"> 
                                <i class="glyphicon glyphicon-user"></i> <br>Detalle de Derivacion
                            </button>
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnActualizar"> 
                                <i class="glyphicon glyphicon-refresh"></i> <br>Actualizar
                            </button>
                        </div>
                        <a href="" id="linkVerDocumento" style="display: none">Descargar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container-fluid" id="buscador">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-heading"> 
                        <h3 class="panel-title">Buscador</h3>
                        <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-down"></i></span>

                    </div>
                    <div class="panel-body" class="collapse" id="collapseExample">
                        <div class="row">
                            <div class='col-md-6'>
                                <div class="form-group">
                                    <label class="col-md-4 control-label">Numero:</label>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <div class='input-group date' id='datetimepicker11'>
                                                <input type='text' class="form-control" />
                                                <span class="input-group-addon">
                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                        <label class="col-md-4 control-label">Estado:</label>
                                        <div class="col-md-8">
                                            <select name="selector" id="input" class="form-control" >
                                                <option value="">SELECCIONE</option>
                                                <option value="1">Recibido</option>
                                                <option value="2">Enviado</option>
                                                <option value="2">Pendiente de recepcion</option>
                                            </select>
                                        </div>
                                </div>
                                
                            </div>


                        </div>

                        <div class="col-md-6">
                            
                        </div>
                    </div>
                    <div class="panel-footer text-right">
                        <button type="button" class="btn btn-sm btn-default">Limpiar</button>
                        <button type="button" class="btn btn-sm btn-primary">Buscar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>





    


    <div class="container-fluid" id="tablas">
        
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-body preloadContainer">
                        
                        <table id="tblUsuarios" class="table table-striped table-bordered"  style="width:100%">
                            <thead>
                                <tr>
                                    <th data-priority="1" width="15"></th>
                                    <th>Evento</th>
                                    <th data-priority="3" >Icono</th>
                                    <th>Adjunto</th>
                                    <th data-priority="2" >Numero</th>
                                    <th>Fecha Documento</th>
                                    <th data-priority="4">Referencia</th>
                                    <th>Observacion</th>
                                    <th>Documento</th>
                                    <th>Funcionario Remitente</th>
                                    <th>Responde A</th>
                                    <th>Acciones</th>
                                    <th>Creado Por</th>
                                    <th>Funcionario Destino</th>
                                    <th>Fecha Derivacion</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th style="min-width: 50px"></th>
                                    <th>Evento</th>
                                    <th>Icono</th>
                                    <th>Adjunto</th>
                                    <th>Numero</th>
                                    <th>Fecha Documento</th>
                                    <th>Referencia</th>
                                    <th>Observacion</th>
                                    <th>Documento</th>
                                    <th>Funcionario Remitente</th>
                                    <th>Responde A</th>
                                    <th>Acciones</th>
                                    <th>Creado Por</th>
                                    <th>Funcionario Destino</th>
                                    <th>Fecha Derivacion</th>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>
            </div>
        </div>

    </div><!-- /.container -->

    
    <!-- Modal -->
    <div class="modal fade" id="modalAdjuntos" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formCrear" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Adjunto</h4>
                    </div>
                    <div class="modal-body">
                            <div class="panel panel-primary">
                                <div class="panel-body text-left">
                                    <button type="button" class="btn btn-default btn-sm text-center" id="btnNuevoAdjunto">
                                        <i class="glyphicon glyphicon-ok"></i> <br>Nuevo
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm text-center" id="btnEliminarAdjunto">
                                        <i class="glyphicon glyphicon-paperclip"></i> <br>Eliminar
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm text-center" id="btnVerAdjunto"> 
                                        <i class="glyphicon glyphicon-folder-open"></i> <br>Ver Adjunto
                                    </button>
                                    <a href="" id="linkDescargaAdjunto" style="display: none">Descargar</a>
                                </div>
                            </div>
                            <div class="panel panel-primary" id="panelInputFile" style="display: none">
                                <div class="panel-body" style="display: inline;">
                                    <div class="col-md-12">
                                        <span style="float: left; display: inline;">
                                            <input type="hidden" name="nuevo" value="otro">
                                            <input type="file" name="archivoAdjunto" value="Seleccione su imagen" style="float: left;">
                                        </span>
                                        <span style="float: right;">
                                            <input type="button" class="btn btn-success" id="btnSubirArchivo" name="subir" value="Subir Archivo" >
                                            <button type="button" class="btn btn-danger" id="btnCerrarSubirArchivo">X</button>
                                        </span>                                    
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-primary">
                                <div class="panel-body text-left">
                                    <div class="row">
                                        <div class="col-md-12 preloadContainer">
                                            <table id="tblAdjuntos" class="table table-striped table-bordered" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 50px"></th>
                                                        <th>Numero</th>
                                                        <th>Extension</th>
                                                        <th>Nombre de Archivo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th style="width: 50px"></th>
                                                        <th>Numero</th>
                                                        <th>Extension</th>
                                                        <th>Nombre de Archivo</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>                                
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>














    <!-- Modal -->
    <div class="modal fade" id="modalDetalleDerivacion" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formCrear" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Detalle de derivacion</h4>
                    </div>
                    <div class="modal-body">

                            <div class="panel panel-primary">
                                <div class="panel-body text-left">
                                    <button type="button" class="btn btn-default btn-sm text-center" id="btnNuevoDetalle">
                                        <i class="glyphicon glyphicon-ok"></i> <br>Nuevo
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm text-center" id="btnEliminarDetalle">
                                        <i class="glyphicon glyphicon-remove"></i> <br>Eliminar
                                    </button>
                                </div>
                            </div>

                            <div class="panel panel-primary">
                                <div class="panel-body text-left">
                                    <div class="row">
                                        <div class="col-md-12 preloadContainer">
                                            <table id="tblDetalleDerivacion" class="table table-striped table-bordered" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 50px"></th>
                                                        <th>Acciones</th>
                                                        <th>Funcionario Destino</th>
                                                        <th>Mensaje</th>
                                                        <th>Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th style="width: 50px"></th>
                                                        <th>Acciones</th>
                                                        <th>Funcionario Destino</th>
                                                        <th>Mensaje</th>
                                                        <th>Estado</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>                                
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>




    <!-- Modal -->
    <div class="modal fade" id="modalCrearDerivacion" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formCrearDerivacion" action="other"  method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Crear Derivacion</h4>
                    </div>
                    <div class="modal-body">
                        
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">Funcionarios Destino:</label>
                                    <div class="col-md-8">                                        
                                        <select name="id_funcionario" class="form-control" ></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label">Mensaje:</label>
                                    <div class="col-md-8">
                                        <textarea name="mensaje"  class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label">Acciones:</label>
                                    <div class="col-md-8">
                                        <select name="id_acciones" class="form-control" multiple="multiple"></select>
                                    </div>
                                </div>

                            </div>                                
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success">Guardar</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    

<?php require("../common/tmpl/footer-sin.php"); ?>

<script src="app/correspondencia/js/recibida-interna.js"></script>
