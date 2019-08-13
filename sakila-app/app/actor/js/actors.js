

var ctnActor         = new ContainerJS("#ctnActor");
var ctnBotonera      = new ContainerJS("#ctnBotonera");
var modalCrearActor  = new ContainerJS("#modalCrearActor");
var modalEditarActor = new ContainerJS("#modalEditarActor");

var tblActor = new CDataTable('#tblActor');

ctnActor._iniciar = function(){
	var self = ctnActor;
	var url  = 'http://localhost/sistema_de_videoclubs/sakila-ci/index.php/actor/list';
	var data = '';

    CallRest.post(url, data, function(res){
        self.llenarTabla1(res);
    });

};

ctnActor.llenarTabla1 = function(res){

	tblActor.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

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

    tblActor.simple();

};

ctnBotonera._iniciar = function(){
	var self = this;
	self.ele.find('#btnCrear').click(function(event) {
		modalCrearActor.ele.modal();
	});
}

modalCrearActor._iniciar = function(){
	var self = this;
	var formCrearActor = self.ele.find('#formCrearActor');

	formCrearActor.validate({
        rules: {
            "actor[first_name]": {
                required: true
            },
            "actor[last_name]": {
                required: true
            }
        }
    });

	modalCrearActor.enviarDatos();    
}

modalCrearActor.enviarDatos = function(){

	var self = this;
	var formCrearActor = self.ele.find('#formCrearActor');	

	formCrearActor.submitValidation(function(resultado){
        
        if(resultado) 
        {
                        
            var url  = "http://localhost/sistema_de_videoclubs/sakila-ci/index.php/actor/insert";            
            var data = formCrearActor.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.restul==1)
                {
                    self.ele.modal("hide");
                    Notificacions.success();                    
                    modalCrearActor.limpiarFormulario();
                }
            });
        }

    });
}

modalCrearActor.limpiarFormulario = function(){
	this.ele.find("#formCrearActor").reset();
}




jQuery(document).ready(function($) {
	console.log("/*-*/-*/-*/");
	ctnActor.init();
	ctnBotonera.init();
	modalCrearActor.init();
	modalEditarActor.init();
});