var ctnFilm            = new ContainerJS("#ctnFilm");
var ctnBotonera         = new ContainerJS("#ctnBotonera");
var ctnModalCrearFilm  = new ContainerJS("#modalCrearFilm");
var ctnModalEditarFilm = new ContainerJS("#modalEditarFilm");

var tblFilm = new CDataTable('#tblFilm');



ctnFilm.registerTable(tblFilm, 'tblFilm');

ctnModalCrearFilm.registerId('formCrearFilm', 'formCrearFilm');
ctnModalEditarFilm.registerElement('#formEditarFilm', 'formEditarFilm');


ctnFilm._iniciar = function(){
    this.llenarTabla();
};

ctnBotonera._iniciar = function(){
    var self = this;
    self.ele.find('#btnCrear').click(function(event) {
        ctnModalCrearFilm.ele.modal();
    });

    self.ele.find('#btnEditar').click(function(event) {
        ctnmodalEditarFilm.obtenerActor();
        ctnmodalEditarFilm.ele.modal();
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

                var url = '/film/delete' 
                var data = {film:{film_id: id}};
                
                CallRest.post(url, data, function(res)
                {
                    if(res.result==1)
                    {
                        Notificacions.success();  
                        ctnFilm.llenarTabla();                  
                    }else{
                        Notificacions.errors()
                    }
                });
            }            

        });
    });
}

ctnModalCrearFilm.iniciar = function(){
    
    var self = this;    

    this.$formCrearActor.validate({
        rules: {
            "actor[first_name]": {
                required: true
            },
            "actor[last_name]": {
                required: true
            }
        }
    });

    ctnModalCrearFilm.insertarActor();        

}

ctnModalEditarFilm.iniciar = function(){
    // alert(this._prueba.html());
    var self = this;    

    this.formEditarActor.validate({
        rules: {
            "actor[first_name]": {
                required: true
            },
            "actor[last_name]": {
                required: true
            },
            "actor[actor_id]": {
                required: true
            }
        }
    });

    self.editarActor();        

}

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





ctnModalCrearFilm.insertarActor = function(){

	var self = this;	

	this.$formCrearActor.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/actor/insert";            
            var data = self.$formCrearActor.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    Notificacions.success();                    
                    ctnModalCrearFilm.limpiarFormulario();
                    ctnActor.llenarTabla();
                }else{
                    Notificacions.errors()
                }
            });
        }

    });
}

ctnModalEditarFilm.obtenerActor = function(){
    var self = this;
    var dataActor = ctnActor.tblActor.getIds();
    var actor_id  = dataActor[0].actor_id;   

    var url = '/actor/get' 
    var data = {actor:{actor_id: actor_id}};


    CallRest.post(url, data, function(res)
    {
        if(res.result==1)
        {            
            self.llenarFormularioEdicion(res.actor);      
        }else{
            Notificacions.errors()
        }
    });
}

ctnModalEditarFilm.editarActor = function(){    
    var self = this;    

    this.formEditarActor.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/actor/edit";            
            var data = self.formEditarActor.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    self.limpiarFormulario();
                    Notificacions.success();  
                    ctnActor.llenarTabla();                  
                }else{
                    Notificacions.errors()
                }
            });
        }

    });
}

ctnModalCrearFilm.limpiarFormulario = function(){
	this.$formCrearActor.trigger("reset");
}

ctnModalEditarFilm.limpiarFormulario = function(){
    this.formEditarActor.trigger("reset");
}

ctnModalEditarFilm.llenarFormularioEdicion = function(actor){
    var self = this;
    self.limpiarFormulario();
    console.log("aqui");
    self.ele.find("input[name='actor[first_name]']").val(actor.first_name);
    self.ele.find("input[name='actor[last_name]']").val(actor.last_name);
    self.ele.find("input[name='actor[actor_id]']").val(actor.actor_id);
}




jQuery(document).ready(function($) {
	
	ctnFilm.init();
	ctnBotonera.init();
	ctnModalCrearFilm.init();
	ctnModalEditarFilm.init();
});