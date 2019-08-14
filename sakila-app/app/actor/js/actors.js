

var ctnActor            = new ContainerJS("#ctnActor");
var ctnBotonera         = new ContainerJS("#ctnBotonera");
var ctnModalCrearActor  = new ContainerJS("#modalCrearActor");
var ctnModalEditarActor = new ContainerJS("#modalEditarActor");

var tblActor = new CDataTable('#tblActor');


ctnModalCrearActor.$formCrearActor   = ctnModalCrearActor.ele.find('#formCrearActor');
ctnModalEditarActor.$formEditarActor = ctnModalCrearActor.ele.find('#formEditarActor');


ctnActor._iniciar = function(){
    this.llenarTabla();
};

ctnActor.llenarTabla = function(res){

    var self = this;
	tblActor.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

    var url  = 'http://localhost/sistema_de_videoclubs/sakila-ci/index.php/actor/list';
    var data = '';

    CallRest.post(url, data, function(res){
        $.each(res.actors, function(index, actor) {
            var row = "";
            row += "<tr>";
            row += "    <td><input type='hidden'name='actor_id' value='"+actor.actor_id+"' /></td>";
            row += "    <td>"+actor.first_name+"</td>";
            row += "    <td>"+actor.last_name+"</td>";
            row += "    <td>"+actor.last_update+"</td>";
            row += "</tr>";

            tblActor.append(row);                 
        });

        tblActor.simpleSelect();
    });

};

ctnBotonera._iniciar = function(){
	var self = this;
	self.ele.find('#btnCrear').click(function(event) {
		ctnModalCrearActor.ele.modal();
	});

    self.ele.find('#btnEditar').click(function(event) {
        ctnModalEditarActor.llenarFormulario();
        ctnModalEditarActor.ele.modal();
    });
}

ctnModalCrearActor._iniciar = function(){
	
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

	ctnModalCrearActor.enviarDatos();    
}

ctnModalCrearActor.enviarDatos = function(){

	var self = this;	

	this.$formCrearActor.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "http://localhost/sistema_de_videoclubs/sakila-ci/index.php/actor/insert";            
            var data = self.$formCrearActor.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    Notificacions.success();                    
                    ctnModalCrearActor.limpiarFormulario();
                }else{
                    Notificacions.errors()
                }
            });
        }

    });
}

ctnModalCrearActor.limpiarFormulario = function(){
	this.$formCrearActor.trigger("reset");
}

ctnModalEditarActor.llenarFormulario = function(){
    var dataActor = tblActor.getIds();
    var actor_id  = dataActor[0].actor_id;   

    var url = '' 
    var data = {actor:{actor_id: actor_id}};


    CallRest.post(url, data, function(res)
    {
        if(res.result==1)
        {
            self.ele.modal("hide");
            Notificacions.success();                    
            ctnModalCrearActor.limpiarFormulario();
        }else{
            Notificacions.errors()
        }
    });
}




jQuery(document).ready(function($) {
	console.log("/*-*/-*/-*/");
	ctnActor.init();
	ctnBotonera.init();
	ctnModalCrearActor.init();
	ctnModalEditarActor.init();
});