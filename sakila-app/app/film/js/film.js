/*
Creación de contenedores
 */
var ctnFilm            = new ContainerJS("#ctnFilm");
var ctnBotonera         = new ContainerJS("#ctnBotonera");
var ctnModalCrearFilm  = new ContainerJS("#modalCrearFilm");
var ctnModalEditarFilm = new ContainerJS("#modalEditarFilm");
var ctnModalFilmActor = new ContainerJS("#modalFilmActor");

/*
Creación de tablas y registrar a los contenedores
 */
var tblFilm = new CDataTable('#tblFilm');
ctnFilm.registerTable(tblFilm, 'tblFilm');

var tblActor = new CDataTable('#tblActor');
ctnModalFilmActor.registerTable(tblActor, 'tblActor');

var tblFilmActor = new CDataTable('#tblFilmActor');
ctnModalFilmActor.registerTable(tblFilmActor, 'tblFilmActor');


/*
Registrar Elementos a los contenedores
 */
ctnModalCrearFilm.registerId('formCrearFilm', '$formCrearFilm');
ctnModalEditarFilm.registerElement('#formEditarFilm', '$formEditarFilm');


/*
Variables Globales
 */
var configSel2 = {
                    // data: { text: 'name', id: 'language_id', },
                    ajax: {
                        url: Config.rest_base_url+'/language/list',
                        data: function (params) {
                            var query = {
                                search: params.term,
                                type: 'public'
                            };
                            // Query parameters will be ?search=[term]&type=public
                            return query;
                        },
                        processResults: function (data) {
                                                
                            return {                    
                                results: $.map(data.languages, function(item) {
                                    return {                            
                                        id: item.language_id,                            
                                        text: item.name,
                                    };
                                })
                            };
                        }
                    }
                };

var configValidate = {
                        rules: {
                            "film[title]": {
                                required: true
                            },
                            "film[description]": {
                                required: true
                            },
                            "film[release_year]": {
                                required: true,
                                digits: true
                            },
                            "film[language_id]": {
                                required: true
                            },
                            "film[original_language_id]": {
                                required: true
                            },
                            "film[rental_duration]": {
                                required: true,
                                digits: true,
                            },
                            "film[rental_rate]": {
                                required: true,
                                number: true
                            },
                            "film[length]": {
                                required: true,
                                digits: true
                            },
                            "film[replacement_cost]": {
                                required: true,
                                number: true,
                            },
                            "film[rating]": {
                                required: true
                            },
                            "film[special_features]": {
                                required: true
                            },
                        }
                    };




ctnFilm._iniciar = function(){
    this.llenarTabla();
};

ctnFilm.llenarTabla = function(res){

    var self = this;
    ctnFilm.tblFilm.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

    var url  = '/film/list';
    var data = '';

    CallRest.post(url, data, function( res ){        
        
        res = ModelJS.removeNull(res);
        
        $.each(res.films, function(index, film) {
            var row = "";
            row += "<tr>";
            row += "    <td><input type='hidden'name='film_id' value='"+film.film_id+"' /></td>";
            row += "    <td>"+film.title+"</td>";
            row += "    <td>"+film.description+"</td>";
            row += "    <td>"+film.release_year+"</td>";
            row += "    <td>"+film.name_language+"</td>";
            row += "    <td>"+film.name_original_language+"</td>";            
            row += "    <td>"+film.rental_duration+"</td>";
            row += "    <td>"+film.rental_rate+"</td>";
            row += "    <td>"+film.length+"</td>";
            row += "    <td>"+film.replacement_cost+"</td>";
            row += "    <td>"+film.rating+"</td>";
            row += "    <td>"+film.special_features+"</td>";
            row += "    <td>"+film.last_update+"</td>";
            row += "</tr>";

            ctnFilm.tblFilm.append(row);                 
        });

        ctnFilm.tblFilm.simpleSelect();
    });
};






ctnBotonera._iniciar = function(){
    var self = this;
    self.ele.find('#btnCrear').click(function(event) {
        ctnModalCrearFilm.ele.modal();
    });

    self.ele.find('#btnEditar').click(function(event) {
        ctnModalEditarFilm.obtenerFilm();
        ctnModalEditarFilm.ele.modal();
    });

    self.ele.find('#btnActualizar').click(function(event) {
        ctnFilm.llenarTabla();
    });

    self.ele.find('#btnEliminar').click(function(event) {
        bootbox.confirm("¿Desea elimnar este registro?", function(res){ 
            
            if(res){
                var self = this;
                var dataFilm = ctnFilm.tblFilm.getIds();
                var id  = dataFilm[0].film_id;   

                var url = '/film/delete';
                var data = {film:{film_id: id}};
                
                CallRest.post(url, data, function(res)
                {
                    if(res.result==1)
                    {
                        Notificacions.success();  
                        ctnFilm.llenarTabla();                  
                    }else{
                        Notificacions.errors();
                    }
                });
            }            

        });
    });

    self.ele.find('#btnAgregarActores').click(function(event) {

        if(ctnFilm.tblFilm.getIds().length>0){
            ctnModalFilmActor.ele.modal();
            ctnModalFilmActor.ele.find("#txtNombrePelicula").val(ctnFilm.tblFilm.getData()[1]);
            ctnModalFilmActor.llenarTablaActors();
            ctnModalFilmActor.llenarTablaFilmActors();
        }else{
            Notificacions.warning("Seleccione una pelicula");
        }
    });
};






ctnModalCrearFilm._iniciar = function(){

    var self = this;    

    self.ele.find('select[name="film[language_id]"]').select2(configSel2);
    self.ele.find('select[name="film[original_language_id]"]').select2(configSel2);
    self.ele.find('select[name="film[rating]"]').select2();
    self.ele.find('select[name="film[special_features]"]').select2();

    self.$formCrearFilm.validate(configValidate);

    ctnModalCrearFilm.insertarFilm();        

};

ctnModalCrearFilm.insertarFilm = function(){
    var self = this;    

    self.$formCrearFilm.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/film/insert";            
            var data = self.$formCrearFilm.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    Notificacions.success();                    
                    ctnModalCrearFilm.limpiarFormulario();
                    ctnFilm.llenarTabla();
                }else{
                    Notificacions.errors();
                }
            });
        }

    });
};

ctnModalCrearFilm.limpiarFormulario = function(){
    this.$formCrearFilm.trigger("reset");
};

ctnModalEditarFilm._iniciar = function(){
    // alert(this._prueba.html());
    var self = this;    

    self.$formEditarFilm.validate(configValidate);




    self.ele.find('select[name="film[language_id]"]').select2(configSel2);
    self.ele.find('select[name="film[original_language_id]"]').select2(configSel2);
    self.ele.find('select[name="film[rating]"]').select2();
    self.ele.find('select[name="film[special_features]"]').select2();


    self.editarFilm();
};









ctnModalEditarFilm.obtenerFilm = function(){
    var self = this;
    var dataFilm = ctnFilm.tblFilm.getIds();
    var film_id  = dataFilm[0].film_id;   

    var url = '/film/get';
    var data = {film:{'film_id': film_id}};


    CallRest.post(url, data, function(res)
    {
        if(res.result==1)
        {            
            self.llenarFormularioEdicion(res.film);      
        }else{
            Notificacions.errors();
        }
    });
};

ctnModalEditarFilm.editarFilm = function(){    
    var self = this;    

    this.$formEditarFilm.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/film/edit";            
            var data = self.$formEditarFilm.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    self.limpiarFormulario();
                    Notificacions.success();  
                    ctnFilm.llenarTabla();                  
                }else{
                    Notificacions.errors();
                }
            });
        }

    });
};

ctnModalEditarFilm.limpiarFormulario = function(){
    this.$formEditarFilm.trigger("reset");
};

ctnModalEditarFilm.llenarFormularioEdicion = function(film){
    console.log("llenarFormularioEdicion");
    var self = this;
    self.limpiarFormulario();
    
    self.ele.find("input[name='film[title]']").val(film.title);
    self.ele.find("textArea[name='film[description]']").val(film.description);
    self.ele.find("input[name='film[release_year]']").val(film.release_year);
    
    // self.ele.find("select[name='film[language_id]']").val(film.language_id).trigger("change");
    // manually trigger the `select2:select` event
    
    var dato = CallRest.postReturn('/language/get', {language:{language_id: film.language_id}});
    
    var option = new Option(dato.language.name, dato.language.language_id, true, true);
    self.ele.find("select[name='film[language_id]']").append(option).trigger('change');

    // manually trigger the `select2:select` event
    self.ele.find("select[name='film[language_id]']").trigger({
        type: 'select2:select',
        params: {
            data: {id:dato.language.language_id, text:dato.language.name}
        }
    }); 

    var dato2 = CallRest.postReturn('/language/get', {language:{language_id: film.original_language_id}});
    
    if(dato2.language!=null)
    {
        var option2 = new Option(dato2.language.name, dato2.language.language_id, true, true);
        self.ele.find("select[name='film[original_language_id]']").append(option2).trigger('change');

        // manually trigger the `select2:select` event
        self.ele.find("select[name='film[original_language_id]']").trigger({
            type: 'select2:select',
            params: {
                data: {id: dato2.language.language_id, text: dato2.language.name}
            }
        }); 
    }
    
    self.ele.find("input[name='film[rental_duration]']").val(film.rental_duration);
    self.ele.find("input[name='film[rental_rate]']").val(film.rental_rate);
    self.ele.find("input[name='film[length]']").val(film.length);
    self.ele.find("input[name='film[replacement_cost]']").val(film.replacement_cost);

    self.ele.find("select[name='film[rating]']").val(film.rating).trigger("change");
    // self.ele.find('select[name="film[special_features]"]').select2();

    var feactures = film.special_features.split(',');    
    self.ele.find("select[name='film[special_features]']").val(feactures).trigger('change');    
    
    
    self.ele.find("input[name='film[film_id]']").val(film.film_id);
};









ctnModalFilmActor._iniciar = function(){
    
    var self = this;
    self.ele.on('click', '.btnAgregarActor', function(event) {
        var actor_id = $(this).data('id');
        
        var dataFilm = ctnFilm.tblFilm.getIds();
        var film_id  = dataFilm[0].film_id;

        var url  = "/filmActor/insert";            
        var data = { 'film_actor': { 'actor_id': actor_id, 'film_id': film_id}};
        
        CallRest.post(url, data, function(res)
        {
            if(res.result==1)
            {                
                Notificacions.success();                                    
                self.llenarTablaFilmActors();
            }else{
                Notificacions.errors();
            }
        });


    });

    self.ele.on('click', '.btnQuitarActor', function(event){
        var actor_id = $(this).data('id');
        
        var dataFilm = ctnFilm.tblFilm.getIds();
        var film_id  = dataFilm[0].film_id;

        var url  = "/filmActor/delete";            
        var data = { 'film_actor': { 'actor_id': actor_id, 'film_id': film_id}};
        
        CallRest.post(url, data, function(res)
        {
            if(res.result==1)
            {                
                Notificacions.success();                                    
                self.llenarTablaFilmActors();
            }else{
                Notificacions.errors();
            }
        });
    });
};

ctnModalFilmActor.llenarTablaActors = function(res){

    var self = this;
    self.tblActor.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

    var url  = '/actor/list';
    var data = '';

    CallRest.post(url, data, function(res){
        $.each(res.actors, function(index, actor) {
            var row = "";
            row += "<tr>";            
            row += "    <td>"+actor.first_name+" "+actor.last_name+"</td>";
            row += '    <td><button type="button" class="btn btn-sm btn-info btnAgregarActor" data-id="'+actor.actor_id+'">Agregar</button></td>';
            row += "</tr>";

            self.tblActor.append(row);                 
        });

        self.tblActor.simple();
    });

};

ctnModalFilmActor.llenarTablaFilmActors = function(res){

    var self = this;
    self.tblFilmActor.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

    var url  = '/filmActor/list';
    var data = { film:{ film_id: ctnFilm.tblFilm.getIds()[0].film_id } };

    CallRest.post(url, data, function(res){
        $.each(res.actors, function(index, actor) {
            var row = "";
            row += "<tr>";            
            row += "    <td>"+actor.first_name+" "+actor.last_name+"</td>";
            row += '    <td><button type="button" class="btn btn-sm btn-danger btnQuitarActor" data-id="'+actor.actor_id+'">Quitar</button></td>';
            row += "</tr>";

            self.tblFilmActor.append(row);                 
        });

        self.tblFilmActor.simple();
    });

};







jQuery(document).ready(function($) {
	
	ctnFilm.init();
	ctnBotonera.init();
	ctnModalCrearFilm.init();
	ctnModalEditarFilm.init();
    ctnModalFilmActor.init();

});