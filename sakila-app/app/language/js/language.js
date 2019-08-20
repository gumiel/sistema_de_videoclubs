var ctnTablaIdioma       = new ContainerJS("#ctnTablaIdioma");
var ctnBotonera          = new ContainerJS("#ctnBotonera");
var ctnModalCrearIdioma  = new ContainerJS("#modalCrearIdioma");
var ctnModalEditarIdioma = new ContainerJS("#modalEditarIdioma");

var tblIdioma = new CDataTable('#tblIdioma');



ctnTablaIdioma.registerTable(tblIdioma, 'tblIdioma');

ctnModalCrearIdioma.registerId('formCrearIdioma', '$formCrearIdioma');
ctnModalEditarIdioma.registerElement('#formEditarIdioma', 'formEditarIdioma');


ctnTablaIdioma._iniciar = function(){
    this.llenarTabla();
};

ctnTablaIdioma.llenarTabla = function(res){

    var self = this;
	self.tblIdioma.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

    var url  = '/language/list';
    var data = '';

    CallRest.post(url, data, function(res){
        $.each(res.languages, function(index, language) {
            var row = "";
            row += "<tr>";
            row += "    <td><input type='hidden'name='language_id' value='"+language.language_id+"' /></td>";
            row += "    <td>"+language.name+"</td>";
            row += "    <td>"+language.last_update+"</td>";
            row += "</tr>";

            self.tblIdioma.append(row);                 
        });

        self.tblIdioma.simpleSelect();
    });

};

ctnBotonera._iniciar = function(){
	var self = this;
	self.ele.find('#btnCrear').click(function(event) {
		ctnModalCrearIdioma.ele.modal();
	});

    self.ele.find('#btnEditar').click(function(event) {
        ctnModalEditarIdioma.obtenerIdioma();
        ctnModalEditarIdioma.ele.modal();
    });

    self.ele.find('#btnActualizar').click(function(event) {
        ctnTablaIdioma.llenarTabla();
    });

    self.ele.find('#btnEliminar').click(function(event) {
        bootbox.confirm("¿Desea elimnar este registro?", function(res){ 
            
            if(res){
                var self = this;
                var dataLanguage = ctnTablaIdioma.tblIdioma.getIds();
                var id  = dataLanguage[0].language_id;   

                var url = '/language/delete' 
                var data = {language:{language_id: id}};
                
                CallRest.post(url, data, function(res)
                {
                    if(res.result==1)
                    {
                        Notificacions.success();  
                        ctnTablaIdioma.llenarTabla();                  
                    }else{
                        Notificacions.errors()
                    }
                });
            }            

        });
    });
}

ctnModalCrearIdioma._iniciar = function(){
	
    var self = this;	

	this.$formCrearIdioma.validate({
        rules: {
            "language[name]": {
                required: true
            }
        }
    });

	ctnModalCrearIdioma.insertarIdioma();        

}

ctnModalEditarIdioma._iniciar = function(){
    // alert(this._prueba.html());
    var self = this;    

    this.formEditarIdioma.validate({
        rules: {
            "language[name]": {
                required: true
            },
            "language[language_id]": {
                required: true
            }
        }
    });

    self.editarIdioma();        

}

ctnModalCrearIdioma.insertarIdioma = function(){

	var self = this;	

	this.$formCrearIdioma.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/language/insert";            
            var data = self.$formCrearIdioma.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    Notificacions.success();                    
                    ctnModalCrearIdioma.limpiarFormulario();
                    ctnTablaIdioma.llenarTabla();
                }else{
                    Notificacions.errors()
                }
            });
        }

    });
}

ctnModalEditarIdioma.obtenerIdioma = function(){
    var self = this;
    var dataIdioma = ctnTablaIdioma.tblIdioma.getIds();
    var id  = dataIdioma[0].language_id;   

    var url = '/language/get' 
    var data = {language:{language_id: id}};


    CallRest.post(url, data, function(res)
    {
        if(res.result==1)
        {            
            self.llenarFormularioEdicion(res.language);      
        }else{
            Notificacions.errors()
        }
    });
}

ctnModalEditarIdioma.editarIdioma = function(){    
    var self = this;    

    this.formEditarIdioma.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/language/edit";            
            var data = self.formEditarIdioma.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    self.limpiarFormulario();
                    Notificacions.success();  
                    ctnTablaIdioma.llenarTabla();                  
                }else{
                    Notificacions.errors()
                }
            });
        }

    });
}

ctnModalCrearIdioma.limpiarFormulario = function(){
	this.$formCrearIdioma.trigger("reset");
}

ctnModalEditarIdioma.limpiarFormulario = function(){
    this.formEditarIdioma.trigger("reset");
}

ctnModalEditarIdioma.llenarFormularioEdicion = function(language){
    var self = this;
    self.limpiarFormulario();
    console.log("aqui");
    self.ele.find("input[name='language[name]']").val(language.name);    
    self.ele.find("input[name='language[language_id]']").val(language.language_id);
}




jQuery(document).ready(function($) {
	
	ctnTablaIdioma.init();
	ctnBotonera.init();
	ctnModalCrearIdioma.init();
	ctnModalEditarIdioma.init();
});