

var ctnCategory            = new ContainerJS("#ctnCategory");
var ctnBotonera         = new ContainerJS("#ctnBotonera");
var ctnModalCrearCategory  = new ContainerJS("#modalCrearCategory");
var ctnModalEditarCategory = new ContainerJS("#modalEditarCategory");

var tblCategory = new CDataTable('#tblCategory');



ctnCategory.registerTable(tblCategory, 'tblCategory');

// ctnModalEditarCategory.registerId('formEditarCategory');
ctnModalCrearCategory.registerId('formCrearCategory', '$formCrearCategory');
ctnModalEditarCategory.registerElement('#formEditarCategory', 'formEditarCategory');


ctnCategory._iniciar = function(){
    this.llenarTabla();
};

ctnCategory.llenarTabla = function(res){

    var self = this;
	ctnCategory.tblCategory.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

    var url  = '/category/list';
    var data = '';

    CallRest.post(url, data, function(res){
        $.each(res.categorys, function(index, category) {
            var row = "";
            row += "<tr>";
            row += "    <td><input type='hidden'name='category_id' value='"+category.category_id+"' /></td>";
            row += "    <td>"+category.name+"</td>";
            row += "    <td>"+category.last_update+"</td>";
            row += "</tr>";

            ctnCategory.tblCategory.append(row);                 
        });

        ctnCategory.tblCategory.simpleSelect();
    });

};

ctnBotonera._iniciar = function(){
	var self = this;
	self.ele.find('#btnCrear').click(function(event) {
		ctnModalCrearCategory.ele.modal();
	});

    self.ele.find('#btnEditar').click(function(event) {
        ctnModalEditarCategory.obtenerCategory();
        ctnModalEditarCategory.ele.modal();
    });

    self.ele.find('#btnActualizar').click(function(event) {
        ctnCategory.llenarTabla();
    });

    self.ele.find('#btnEliminar').click(function(event) {
        bootbox.confirm("¿Desea elimnar este registro?", function(res){ 
            
            if(res){
                var self = this;
                var dataCategory = ctnCategory.tblCategory.getIds();
                var category_id  = dataCategory[0].category_id;   

                var url = '/category/delete' ;
                var data = {'category':{'category_id': category_id}};
                
                CallRest.post(url, data, function(res)
                {
                    if(res.result==1)
                    {
                        Notificacions.success();  
                        ctnCategory.llenarTabla();                  
                    }else{
                        Notificacions.errors();
                    }
                });
            }            

        });
    });
};

ctnModalCrearCategory._iniciar = function(){
	
    var self = this;	

	this.$formCrearCategory.validate({
        rules: {
            "category[name]": {
                required: true
            },
        }
    });

	ctnModalCrearCategory.insertarCategory();        
};

ctnModalEditarCategory._iniciar = function(){
    
    var self = this;    

    this.formEditarCategory.validate({
        rules: {
            "category[name]": {
                required: true
            },
            "category[category_id]": {
                required: true
            }
        }
    });

    self.editarCategory();        
};

ctnModalCrearCategory.insertarCategory = function(){

	var self = this;	

	this.$formCrearCategory.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/category/insert";            
            var data = self.$formCrearCategory.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    Notificacions.success();                    
                    ctnModalCrearCategory.limpiarFormulario();
                    ctnCategory.llenarTabla();
                }else{
                    Notificacions.errors();
                }
            });
        }

    });
};

ctnModalEditarCategory.obtenerCategory = function(){
    var self = this;
    var dataCategory = ctnCategory.tblCategory.getIds();
    var category_id  = dataCategory[0].category_id;   

    var url = '/category/get' 
    var data = {category:{category_id: category_id}};


    CallRest.post(url, data, function(res)
    {
        if(res.result==1)
        {            
            self.llenarFormularioEdicion(res.category);      
        }else{
            Notificacions.errors();
        }
    });
};

ctnModalEditarCategory.editarCategory = function(){    
    var self = this;    

    this.formEditarCategory.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/category/edit";            
            var data = self.formEditarCategory.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    self.limpiarFormulario();
                    Notificacions.success();  
                    ctnCategory.llenarTabla();                  
                }else{
                    Notificacions.errors();
                }
            });
        }

    });
};

ctnModalCrearCategory.limpiarFormulario = function(){
	this.$formCrearCategory.trigger("reset");
};

ctnModalEditarCategory.limpiarFormulario = function(){
    this.formEditarCategory.trigger("reset");
};

ctnModalEditarCategory.llenarFormularioEdicion = function(category){
    var self = this;
    self.limpiarFormulario();
    
    self.ele.find("input[name='category[name]']").val(category.name);    
    self.ele.find("input[name='category[category_id]']").val(category.category_id);
};




jQuery(document).ready(function($) {
	
	ctnCategory.init();
	ctnBotonera.init();
	ctnModalCrearCategory.init();
	ctnModalEditarCategory.init();
});