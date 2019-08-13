<?php require("../common/tmpl/header.php"); ?>
    <div class="container-fluid">
          <h4 class="text-primary">Correspondencia Emitida</h4>
    </div>
    <div class="container-fluid" id="botonera">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-heading text-left">
                        <div class="btn-group" role="group" aria-label="...">
                            <button type="button" class="btn btn-default btn-sm text-center" id="btnCrear">
                                <i class="glyphicon glyphicon-plus"></i> <br>Crear
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


    <div class="container">
        <div class="row">
            <div class='col-sm-6'>
                <div class="form-group">
                    <div class='input-group date' id='datetimepicker1'>
                        <input type='text' class="form-control" />
                        <span class="input-group-addon">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>


    <div class="container-fluid" id="tablas2">
        
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-body">
                        
                        <table id="tblEmitidaInterna" class="table table-striped table-bordered" style="width:100%">
                            <thead>
                                <tr>
                                    <th data-priority="1" width="15"></th>
                                    <th>Evento</th>
                                    <th data-priority="2">Icono</th>
                                    <th data-priority="3">Numero</th>
                                    <th>Adjunto</th>
                                    <th>Fecha Documento</th>
                                    <th>Referencia</th>
                                    <th>Observacion</th>
                                    <th>Documento</th>
                                    <th>Funcionario Remitente</th>
                                    <th>Responde A</th>
                                    <th>Acciones</th>
                                    <th>Creado Por</th>
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
    <div class="modal fade" id="modalCrear" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formCrear" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Emitidas</h4>
                    </div>
                    <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Tipo correspondencia:</label>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control" name="asociar" value="interna" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">(*)Documento:</label>
                                        <div class="col-md-8">
                                            <select name="id_documento" class="form-control">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Fecha Documento:</label>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control" name="fecha_documento" readonly="readonly" value="08-03-2019">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Funcionario Remitente:</label>
                                        <div class="col-md-8">
                                            <select name="id_funcionario_cargo" class="form-control">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Referencia:</label>
                                        <div class="col-md-8">
                                            <textarea name="referencia" class="form-control" rows="3" ></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Observaciones:</label>
                                        <div class="col-md-8">
                                            <textarea name="observaciones" class="form-control" rows="3" ></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">(*)Nivel de Prioridad:</label>
                                        <div class="col-md-8">
                                            <select name="nivel_prioridad" class="form-control">
                                                <option value="alta">Alta</option>}
                                                <option value="media">Media</option>}
                                                <option value="baja">Baja</option>}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Clasificacion:</label>
                                        <div class="col-md-8">
                                            <select name="id_clasificador" class="form-control">
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="paterno" class="col-md-4 control-label">Asociar a?:</label>
                                        <div class="col-md-8">
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="asociar" value="Interna" >
                                                    Interna
                                                </label>
                                            </div>
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="asociar" value="Externa" >
                                                    Externa
                                                </label>
                                            </div>
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="asociar" value="No" >
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Responde A:</label>
                                        <div class="col-md-8">
                                            <select name="id_correspondencia_responder" class="form-control">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">(*)Funcionarios destino:</label>
                                        <div class="col-md-8">
                                            <select name="id_funcionario_destino" class="form-control" multiple="multiple">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">(*)Acciones:</label>
                                        <div class="col-md-8">
                                            <select name="id_accion" class="form-control" multiple="multiple">
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
    <div class="modal fade" id="modalCrearCustom" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formCrearUsuario" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">CREACION DE USUARIOS</h4>
                    </div>
                    <div class="modal-body">
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div id="treeview1" class=""></div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                                    <div class="form-group">
                                        <label for="nombres" class="col-md-4 control-label">Nombre:</label>
                                        <div class="col-md-8">
                                            <input type="email" class="form-control"  name="nombres" placeholder="Ej. Henry">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="paterno" class="col-md-4 control-label">Paterno:</label>
                                        <div class="col-md-8">
                                            <input type="password" class="form-control" name="paterno" placeholder="Ej. Perez">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="nacimiento" class="col-md-4 control-label">Fecha de Nacimiento:</label>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control"  name="nacimiento">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-md-offset-4 col-md-8">
                                            <div class="checkbox">
                                                <label>
                                                <input type="checkbox"> Soltero
                                                </label>
                                            </div>
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

<?php require("../common/tmpl/footer.php"); ?>

<script src="app/correspondencia/js/emitida-interna.js"></script>

<script type="text/javascript">
    jQuery(document).ready(function($) {

        $('#datetimepicker1').datetimepicker({
            format: "D/MM/YYYY",                        
        });
        
    });
</script>