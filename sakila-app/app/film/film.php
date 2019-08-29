<?php require("../common/tmpl/head.php"); ?>
    <div class="container-fluid">
          <h4 class="text-primary">Peliculas</h4>
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

    <div class="container-fluid" id="ctnFilm">
        
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-body">
                        
                        <table id="tblFilm" class="table table-striped table-bordered" style="width:100%">
                            <thead>
                                <tr>
                                    <th data-priority="1" width="15"></th>                                    
                                    <th data-priority="2">Titulo</th>
                                    <th data-priority="3">Descripcion</th>
                                    <th>Año Lanzamiento</th>
                                    <th data-priority="4">Idioma</th>
                                    <th>Idioma Original</th>
                                    <th>Duracion del alquiler</th>
                                    <th>Monto del alquiler</th>
                                    <th>Duracion</th>
                                    <th>Costo de remplazo</th>
                                    <th>Clasificacion</th>
                                    <th>Caracteristica especial</th>
                                    <th>Ultimo Cambio</th>
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
    <div class="modal fade" id="modalCrearFilm" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formCrearFilm" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">CREAR PELICULA</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="film[title]" class="col-md-4 control-label">Titulo:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[title]" autofocus>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[description]" class="col-md-4 control-label">Descripción:</label>
                                    <div class="col-md-8">                                        
                                        <textarea name="film[description]" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[release_year]" class="col-md-4 control-label">Año de Lanzamiento:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[release_year]">
                                    </div>
                                </div>                                
                                <div class="form-group">
                                    <label for="film[language_id]" class="col-md-4 control-label">Idioma:</label>
                                    <div class="col-md-8">                                        
                                        <select name="film[language_id]" class="form-control">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[original_language_id]" class="col-md-4 control-label">Idioma Original:</label>
                                    <div class="col-md-8">                                        
                                        <select name="film[original_language_id]" class="form-control">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[rental_duration]" class="col-md-4 control-label">Duración del alquiler:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[rental_duration]">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[rental_rate]" class="col-md-4 control-label">Monto del alquiler:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[rental_rate]">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[length]" class="col-md-4 control-label">Duracion:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[length]">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[replacement_cost]" class="col-md-4 control-label">Costo de remplazo:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[replacement_cost]">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[rating]" class="col-md-4 control-label">Clasificación:</label>
                                    <div class="col-md-8">                                        
                                        <select name="film[rating]" class="form-control">
                                            <option value="">Seleccione</option>
                                            <option value="G">G</option>
                                            <option value="PG">PG</option>
                                            <option value="PG-13">PG-13</option>
                                            <option value="R">R</option>
                                            <option value="NC-17">NC-17</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[special_features]" class="col-md-4 control-label">Caracteristica Especial:</label>
                                    <div class="col-md-8">                                        
                                        <select name="film[special_features]" class="form-control" multiple="">
                                            <option value="">Seleccione</option>
                                            <option value="Trailers">Trailers</option>
                                            <option value="Commentaries">Commentaries</option>
                                            <option value="Deleted Scenes">Deleted Scenes</option>
                                            <option value="Behind the Scenes">Behind the Scenes</option>
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
    <div class="modal fade" id="modalEditarFilm" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
                <form id="formEditarFilm" action="index_submit" method="post" class="form-horizontal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">EDITAR PELICULA</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="film[title]" class="col-md-4 control-label">Titulo:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[title]" autofocus>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[description]" class="col-md-4 control-label">Descripción:</label>
                                    <div class="col-md-8">                                        
                                        <textarea name="film[description]" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[release_year]" class="col-md-4 control-label">Año de Lanzamiento:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[release_year]">
                                    </div>
                                </div>                                
                                <div class="form-group">
                                    <label for="film[language_id]" class="col-md-4 control-label">Idioma:</label>
                                    <div class="col-md-8">                                        
                                        <select name="film[language_id]" class="form-control">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[original_language_id]" class="col-md-4 control-label">Idioma Original:</label>
                                    <div class="col-md-8">                                        
                                        <select name="film[original_language_id]" class="form-control">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[rental_duration]" class="col-md-4 control-label">Duración del alquiler:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[rental_duration]">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[rental_rate]" class="col-md-4 control-label">Monto del alquiler:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[rental_rate]">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[length]" class="col-md-4 control-label">Duracion:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[length]">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[replacement_cost]" class="col-md-4 control-label">Costo de remplazo:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control"  name="film[replacement_cost]">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[rating]" class="col-md-4 control-label">Clasificación:</label>
                                    <div class="col-md-8">                                        
                                        <select name="film[rating]" class="form-control">
                                            <option value="">Seleccione</option>
                                            <option value="G">G</option>
                                            <option value="PG">PG</option>
                                            <option value="PG-13">PG-13</option>
                                            <option value="R">R</option>
                                            <option value="NC-17">NC-17</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="film[special_features]" class="col-md-4 control-label">Caracteristica Especial:</label>
                                    <div class="col-md-8">                                        
                                        <select name="film[special_features]" class="form-control" multiple="">
                                            <option value="">Seleccione</option>
                                            <option value="Trailers">Trailers</option>
                                            <option value="Commentaries">Commentaries</option>
                                            <option value="Deleted Scenes">Deleted Scenes</option>
                                            <option value="Behind the Scenes">Behind the Scenes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>         
                        <input type="hidden" name="film[film_id]" value="">               
                    </div>
                </form>
            </div>
        </div>
    </div>








<?php require("../common/tmpl/footer.php"); ?>

<script src="app/film/js/film.js"></script>