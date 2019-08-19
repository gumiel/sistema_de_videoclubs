var ctnTablaPais       = new ContainerJS("#ctnTablaPais");
var ctnBotonera          = new ContainerJS("#ctnBotonera");
var ctnModalCrearPais  = new ContainerJS("#modalCrearPais");
var ctnModalEditarPais = new ContainerJS("#modalEditarPais");

var tblPais = new CDataTable('#tblPais');



ctnTablaPais.registerTable(tblPais, 'tblPais');

ctnModalCrearPais.registerId('formCrearPais', '$formCrearPais');
ctnModalEditarPais.registerElement('#formEditarPais', 'formEditarPais');


ctnTablaPais._iniciar = function(){
    this.llenarTabla();
};

ctnTablaPais.llenarTabla = function(res){

    var self = this;
	self.tblPais.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

    var url  = 'http://localhost/sistema_de_videoclubs/sakila-ci/index.php/country/list';
    var data = '';

    CallRest.post(url, data, function(res){
        $.each(res.countrys, function(index, country) {
            var row = "";
            row += "<tr>";
            row += "    <td><input type='hidden'name='country_id' value='"+country.country_id+"' /></td>";
            row += "    <td>"+country.country+"</td>";
            row += "    <td>"+country.last_update+"</td>";
            row += "</tr>";

            self.tblPais.append(row);                 
        });

        self.tblPais.simpleSelect();
    });

};

ctnBotonera._iniciar = function(){
	var self = this;
	self.ele.find('#btnCrear').click(function(event) {
		ctnModalCrearPais.ele.modal();
	});

    self.ele.find('#btnEditar').click(function(event) {
        ctnModalEditarPais.obtenerPais();
        ctnModalEditarPais.ele.modal();
    });

    self.ele.find('#btnActualizar').click(function(event) {
        ctnTablaPais.llenarTabla();
    });

    self.ele.find('#btnEliminar').click(function(event) {
        bootbox.confirm("¿Desea elimnar este registro?", function(res){ 
            
            if(res){
                var self = this;
                var dataCountry = ctnTablaPais.tblPais.getIds();
                var id  = dataCountry[0].country_id;   

                var url = 'http://localhost/sistema_de_videoclubs/sakila-ci/index.php/country/delete' 
                var data = {country:{country_id: id}};
                
                CallRest.post(url, data, function(res)
                {
                    if(res.result==1)
                    {
                        Notificacions.success();  
                        ctnTablaPais.llenarTabla();                  
                    }else{
                        Notificacions.errors()
                    }
                });
            }            

        });
    });
}

ctnModalCrearPais._iniciar = function(){
	
    var self = this;	

	this.$formCrearPais.validate({
        rules: {
            "country[country]": {
                required: true
            }
        }
    });

	ctnModalCrearPais.insertarPais();        

}

ctnModalEditarPais._iniciar = function(){
    // alert(this._prueba.html());
    var self = this;    

    this.formEditarPais.validate({
        rules: {
            "country[country]": {
                required: true
            },
            "country[country_id]": {
                required: true
            }
        }
    });

    self.editarPais();        

}

ctnModalCrearPais.insertarPais = function(){

	var self = this;	

	this.$formCrearPais.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "http://localhost/sistema_de_videoclubs/sakila-ci/index.php/country/insert";            
            var data = self.$formCrearPais.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    Notificacions.success();                    
                    ctnModalCrearPais.limpiarFormulario();
                    ctnTablaPais.llenarTabla();
                }else{
                    Notificacions.errors()
                }
            });
        }

    });
}

ctnModalEditarPais.obtenerPais = function(){
    var self = this;
    var dataPais = ctnTablaPais.tblPais.getIds();
    var id  = dataPais[0].country_id;   

    var url = 'http://localhost/sistema_de_videoclubs/sakila-ci/index.php/country/get' 
    var data = {country:{country_id: id}};


    CallRest.post(url, data, function(res)
    {
        if(res.result==1)
        {            
            self.llenarFormularioEdicion(res.country);      
        }else{
            Notificacions.errors()
        }
    });
}

ctnModalEditarPais.editarPais = function(){    
    var self = this;    

    this.formEditarPais.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "http://localhost/sistema_de_videoclubs/sakila-ci/index.php/country/edit";            
            var data = self.formEditarPais.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    self.limpiarFormulario();
                    Notificacions.success();  
                    ctnTablaPais.llenarTabla();                  
                }else{
                    Notificacions.errors()
                }
            });
        }

    });
}

ctnModalCrearPais.limpiarFormulario = function(){
	this.$formCrearPais.trigger("reset");
}

ctnModalEditarPais.limpiarFormulario = function(){
    this.formEditarPais.trigger("reset");
}

ctnModalEditarPais.llenarFormularioEdicion = function(country){
    var self = this;
    self.limpiarFormulario();
    
    self.ele.find("input[name='country[country]']").val(country.country);    
    self.ele.find("input[name='country[country_id]']").val(country.country_id);
}




jQuery(document).ready(function($) {
	
	ctnTablaPais.init();
	ctnBotonera.init();
	ctnModalCrearPais.init();
	ctnModalEditarPais.init();
});