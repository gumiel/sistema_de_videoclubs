

var ctnCity            = new ContainerJS("#ctnCity");
var ctnBotonera         = new ContainerJS("#ctnBotonera");
var ctnModalCrearCity  = new ContainerJS("#modalCrearCity");
var ctnModalEditarCity = new ContainerJS("#modalEditarCity");

var tblCity = new CDataTable('#tblCity');



ctnCity.registerTable(tblCity, 'tblCity');

ctnModalCrearCity.registerId('formCrearCity', '$formCrearCity');
ctnModalEditarCity.registerElement('#formEditarCity', '$formEditarCity');


var configSel2 = {
                    // data: { text: 'name', id: 'language_id', },
                    ajax: {
                        url: Config.rest_base_url+'/country/list',
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
                                results: $.map(data.countries, function(item) {
                                    return {                            
                                        id: item.country_id,                            
                                        text: item.country,
                                    };
                                })
                            };
                        }
                    }
                };


ctnCity._iniciar = function(){
    this.llenarTabla();
};

ctnCity.llenarTabla = function(res){

    var self = this;
    ctnCity.tblCity.clean(); // Limpia primeramente la tabla si es que tiene algun dato           

    var url  = '/city/list';
    var data = '';

    CallRest.post(url, data, function(res){
        $.each(res.cities, function(index, city) {
            var row = "";
            row += "<tr>";
            row += "    <td><input type='hidden'name='city_id' value='"+city.city_id+"' /></td>";
            row += "    <td>"+city.city+"</td>";
            row += "    <td>"+city.country+"</td>";
            row += "    <td>"+city.last_update+"</td>";
            row += "</tr>";

            ctnCity.tblCity.append(row);                 
        });

        ctnCity.tblCity.simpleSelect();
    });

};

ctnBotonera._iniciar = function(){
    var self = this;
    self.ele.find('#btnCrear').click(function(event) {
        ctnModalCrearCity.ele.modal();
    });

    self.ele.find('#btnEditar').click(function(event) {
        ctnModalEditarCity.obtenerCity();
        ctnModalEditarCity.ele.modal();
    });

    self.ele.find('#btnActualizar').click(function(event) {
        ctnCity.llenarTabla();
    });

    self.ele.find('#btnEliminar').click(function(event) {
        bootbox.confirm("¿Desea elimnar este registro?", function(res){ 
            
            if(res){
                var self = this;
                var dataCity = ctnCity.tblCity.getIds();
                var city_id  = dataCity[0].city_id;   

                var url = '/city/delete' ;
                var data = {'city':{'city_id': city_id}};
                
                CallRest.post(url, data, function(res)
                {
                    if(res.result==1)
                    {
                        Notificacions.success();  
                        ctnCity.llenarTabla();                  
                    }else{
                        Notificacions.errors();
                    }
                });
            }            

        });
    });
};

ctnModalCrearCity._iniciar = function(){

    var self = this;    

    self.$formCrearCity.find('select[name="city[country_id]"]').select2(configSel2);

    this.$formCrearCity.validate({
        rules: {
            "city[city]": {
                required: true
            },
            "city[country_id]": {
                required: true
            },
        }
    });

    ctnModalCrearCity.insertarCity();        
};

ctnModalEditarCity._iniciar = function(){
    
    var self = this;    

    self.$formEditarCity.find('select[name="city[country_id]"]').select2(configSel2);

    self.$formEditarCity.validate({
        rules: {
            "city[city_id]": {
                required: true
            },"city[city]": {
                required: true
            },
            "city[country_id]": {
                required: true
            },
        }
    });

    self.editarCity();        
};

ctnModalCrearCity.insertarCity = function(){

    var self = this;    

    this.$formCrearCity.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/city/insert";            
            var data = self.$formCrearCity.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    Notificacions.success();                    
                    ctnModalCrearCity.limpiarFormulario();
                    ctnCity.llenarTabla();
                }else{
                    Notificacions.errors();
                }
            });
        }

    });
};

ctnModalEditarCity.obtenerCity = function(){
    var self = this;
    var dataCity = ctnCity.tblCity.getIds();
    var city_id  = dataCity[0].city_id;   

    var url = '/city/get' 
    var data = {city:{city_id: city_id}};


    CallRest.post(url, data, function(res)
    {
        if(res.result==1)
        {            
            self.llenarFormularioEdicion(res.city);      
        }else{
            Notificacions.errors();
        }
    });
};

ctnModalEditarCity.editarCity = function(){    
    var self = this;    

    this.$formEditarCity.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var url  = "/city/edit";            
            var data = self.$formEditarCity.serialize();
            
            CallRest.post(url, data, function(res)
            {
                if(res.result==1)
                {
                    self.ele.modal("hide");
                    self.limpiarFormulario();
                    Notificacions.success();  
                    ctnCity.llenarTabla();                  
                }else{
                    Notificacions.errors();
                }
            });
        }

    });
};

ctnModalCrearCity.limpiarFormulario = function(){
    this.$formCrearCity.trigger("reset");
};

ctnModalEditarCity.limpiarFormulario = function(){
    this.$formEditarCity.trigger("reset");
};

ctnModalEditarCity.llenarFormularioEdicion = function(city){
    var self = this;
    self.limpiarFormulario();
    
    self.ele.find("input[name='city[city]']").val(city.city);    
    self.ele.find("input[name='city[city_id]']").val(city.city_id);

    var dato = CallRest.postReturn('/country/get', {'country': {'country_id': city.country_id}});

    var option = new Option(dato.country.country, dato.country.country_id, true, true);
    self.ele.find("select[name='city[country_id]']").append(option).trigger('change');

    // manually trigger the `select2:select` event
    self.ele.find("select[name='city[country_id]']").trigger({
        type: 'select2:select',
        params: {
            data: {id: dato.country.country_id, text: dato.country.country}
        }
    }); 
};




jQuery(document).ready(function($) {
    
    ctnCity.init();
    ctnBotonera.init();
    ctnModalCrearCity.init();
    ctnModalEditarCity.init();
});