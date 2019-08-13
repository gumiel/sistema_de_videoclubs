var configDataTableEI = { select: false };
var tblEmitidaInterna = new CDataTablePxp('#tblEmitidaInterna', configDataTableEI);

var tablas      = new ContainerJS("#tablas");
var botonera    = new ContainerJS("#botonera");
var modalCrear  = new ContainerJS("#modalCrear");









/**
 * METODOS DEL OBJETO DE LA BOTORENA
 */
botonera._init = function()
{

    var self = this;
    self.ele.find('#btnCrear').click(function(event){
        modalCrear.openModal();  
    });

    self.ele.find('#btnActualizar').click(function(event){
        tablas.llenarTabla();
    });

};

















/**
 * METODOS DEL OBJETO DEL MODAL
 */
modalCrear._init = function()
{
    var self = this;
    this.validacion();   

    self.ele.find("input[name='asociar']").click(function(event) {
        var url = "";
        var data = "";
        switch ($(this).val()) {
            case 'Interna':
                url = "../../sis_correspondencia/control/Correspondencia/listarCorrespondenciaSimplificada";
                data = '{"start":"0","limit":"10000","sort":"id_correspondencia","dir":"DESC","par_filtro":"cor.numero#cor.referencia#funcionario.desc_funcionario1#insti.nombre","tipo":"interna","query":""}';
                break;
            case 'Externa':
                url = "../../sis_correspondencia/control/Correspondencia/listarCorrespondenciaSimplificada";
                data = '{"start":"0","limit":"10000","sort":"id_correspondencia","dir":"DESC","par_filtro":"cor.numero#cor.referencia#funcionario.desc_funcionario1#insti.nombre","tipo":"externa","query":""}';
                break;
            case 'No':
                self.ele.find('select[name="id_correspondencia_responder"]').html('');
                break;
            default:
                alert("ninguna");
                break;
        }

        if( url!='' && data!='' )
        {
            CallRest.post(url, data, function(res)
            {
                var row = '<option value="">Seleccione</option>';
                $.each(res.datos, function(index, correspondencia) {
                    row += "<option value='"+correspondencia.id_correspondencia+"''>"+correspondencia.numero+"-"+correspondencia.referencia+"-"+correspondencia.desc_funcionario+"</option>";
                });
                self.ele.find('select[name="id_correspondencia_responder"]').html(row);
                self.ele.find('select[name="id_correspondencia_responder"]').select2();
            });            
        }

    });

};

modalCrear.openModal = function()
{
    
    var self = this;
    self.ele.modal("show");

    var urlD = '../../sis_parametros/control/Documento/listarDocumento';
    var dataD = '{"start":"0","limit":"10000","sort":"codigo","dir":"ASC","par_filtro":"DOCUME.codigo#DOCUME.descripcion","tipo":"interna","query":""}';

    CallRest.post(urlD, dataD, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, documento) {
            row += "<option value='"+documento.id_documento+"''>"+documento.descripcion+"</option>";
        });
        self.ele.find('select[name="id_documento"]').html(row);
        // self.ele.find('select[name="id_documento"]').select2();
    });

    var urlF = '../../sis_organigrama/control/Funcionario/listarFuncionarioCargo';
    var dataF = '{"start":"0","limit":"10000","sort":"desc_funcionario1","dir":"ASC","par_filtro":"desc_funcionario1#email_empresa#codigo#nombre_cargo","es_combo_solicitud":"si","fecha":"08-03-2019","query":""}';

    CallRest.post(urlF, dataF, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, funcionario_cargo) {
            row += "<option value='"+funcionario_cargo.id_funcionario+"''>"+funcionario_cargo.desc_funcionario1+"-"+funcionario_cargo.codigo+"-"+funcionario_cargo.descripcion_cargo+"-"+funcionario_cargo.email_empresa+"-"+funcionario_cargo.oficina_nombre+"-"+funcionario_cargo.lugar_nombre+"</option>";
        });
        self.ele.find('select[name="id_funcionario_cargo"]').html(row);
        self.ele.find('select[name="id_funcionario_cargo"]').select2(); // fix taxindex of modal   
    });

    var urlC = '../../sis_seguridad/control/Clasificador/listarClasificador';
    var dataC = '{"start":"0","limit":"100000","sort":"prioridad","dir":"ASC","par_filtro":"codigo#descripcion","query":""}';

    CallRest.post(urlC, dataC, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, clasificador) {
            row += "<option value='"+clasificador.id_clasificador+"''>"+clasificador.descripcion+"</option>";
        });
        self.ele.find('select[name="id_clasificador"]').html(row);
    });

    var urlFD = '../../sis_organigrama/control/Funcionario/listarFuncionarioCargo';
    var dataFD = '{"start":"0","limit":"10000","sort":"desc_funcionario1","dir":"ASC","par_filtro":"desc_funcionario1#email_empresa#codigo#nombre_cargo","estado_reg_asi":"activo","query":""}';

    CallRest.post(urlFD, dataFD, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, funcionario_cargo) {
            row += "<option value='"+funcionario_cargo.id_funcionario+"''>"+funcionario_cargo.desc_funcionario1+"-"+funcionario_cargo.codigo+"-"+funcionario_cargo.descripcion_cargo+"-"+funcionario_cargo.email_empresa+"-"+funcionario_cargo.oficina_nombre+"-"+funcionario_cargo.lugar_nombre+"</option>";
        });
        self.ele.find('select[name="id_funcionario_destino"]').html(row);
        self.ele.find('select[name="id_funcionario_destino"]').select2(); // fix taxindex of modal          
        
    });

    var urlA = '../../sis_correspondencia/control/Accion/listarAccion';
    var dataA = '{"start":"0","limit":"20000","sort":"nombre","dir":"ASC","par_filtro":"acco.nombre","query":""}';

    CallRest.post(urlA, dataA, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, accion) {
            row += "<option value='"+accion.id_accion+"''>"+accion.nombre+"</option>";
        });
        self.ele.find('select[name="id_accion"]').html(row);
        // self.ele.find('select[name="id_accion"]').select2();
    });
};


modalCrear.validacion = function()
{
    var self = this;
    var formCrear = self.ele.find("#formCrear");
    
    formCrear.validate({
        rules: {
            "nivel_prioridad": {
                required: true
            },
            "id_clasificador": {
                required: true
            },
            "id_documento": {
                required: true
            },
            "id_funcionario_destino": {
                required: true
            },
            "asociar": {
                required: true
            },
            "id_accion": {
                required: true
            },
        }
    });

    formCrear.submitValidation(function(res){
        if(res) {
            
            var formData = formCrear.serializeJSON();

            var url  = '../../sis_correspondencia/control/Correspondencia/insertarCorrespondencia';
            // var data = '"id_correspondencia":"","cite":"","fecha_documento":"22-03-2019","id_institucion_remitente":"","id_persona_remitente":"","referencia":"","otros_adjuntos":"","nro_paginas":"","mensaje":"","nivel_prioridad":"2media","id_clasificador":"1","tipo":"interna","id_documento":"23","fecha_creacion_documento":"","id_funcionario":"","id_uo":"","id_funcionario_saliente":"","id_institucion_destino":"","id_persona_destino":"","id_funcionarios":"1126,1099","asociar":"No","id_correspondencias_asociadas":"","id_acciones":"15,16","tipo_documento":"carta_recibida","vista":"CorrespondenciaInterna"}';
            var data = {
                        "id_correspondencia":"",
                        "cite":"",
                        "fecha_documento":"22-03-2019",
                        "id_institucion_remitente":"",
                        "id_persona_remitente":"",
                        "referencia":"",
                        "otros_adjuntos":"",
                        "nro_paginas":"",
                        "mensaje":"",
                        "nivel_prioridad": formData.nivel_prioridad,
                        "id_clasificador": formData.id_clasificador.toString(),
                        "tipo":"interna",
                        "id_documento": formData.id_documento.toString(),
                        "fecha_creacion_documento":"",
                        "id_funcionario":"",
                        "id_uo":"",
                        "id_funcionario_saliente":"",
                        "id_institucion_destino":"",
                        "id_persona_destino":"",
                        "id_funcionarios": formCrear.find("select[name='id_funcionario_destino']").val().join(','),
                        "asociar": formData.asociar,
                        "id_correspondencias_asociadas":"",
                        // "id_acciones":"15,16",
                        "id_acciones": formCrear.find("select[name='id_accion']").val().join(','),
                        "tipo_documento":"carta_recibida",
                        "vista":"CorrespondenciaInterna"
                        };
            

            CallRest.post(url, JSON.stringify(data), function(res){
                alert(res);                
            });
        }
    });
};















































/**
 * METODOS DEL OBJETO TABLA
 */
tablas._init = function()
{
    
    this.llenarTabla();

};


tablas.llenarTabla = function()
{
    tblEmitidaInterna.clean();
    
    var renderNivelPrioridad = function(data, type, full, meta)
    {
        var prioridad = '';
        var iconoPrioridad = data + '.png';
        if (data=='1alta')
            prioridad='Alta';
        else if (data=='2media')
            prioridad='Media';
        else
            prioridad='Baja';
        
        return "<img title='"+prioridad+"' src = 'public/images/" + iconoPrioridad + "' align='center' width='10' height='25'/>"; 
    };

    var renderEstado = function(data, type, full, meta)
    {  
        var estado = '';
        var iconoEstado = data + '.png';
        switch (data){
            case 'borrador_recepcion_externo': estado='Borrador'; 
                break;
            case 'pendiente_recepcion_externo': estado='Pendiente Externo'; 
                break;
            case 'enviado': estado='Enviado'; 
                break;
            case 'borrador_envio':  estado='Borrador'; 
                break;
            case 'pendiente_recibido': estado='Pendiente de Recepción'; 
                break;
            case 'recibido': estado='Recibido'; 
                break;
            case 'anulado': estado='Anulado'; 
                break;
        }
        
        return "<img title='"+estado+"' src='public/images/" + iconoEstado + "' align='center' width='40' height='40'>"; 
    };

    
    var columns = [
                { "data": null },
                { "data": "nivel_prioridad" ,
                    "render": renderNivelPrioridad
                },
                { "data": "estado" , 
                    "render": renderEstado
                },
                { "data": "numero" },
                { "data": "adjunto" },
                { "data": "fecha_documento" },
                { "data": "referencia" },
                { "data": "observaciones_estado" },
                { "data": "desc_documento" },
                { "data": "desc_funcionario" },
                { "data": "desc_correspondencias_asociadas" },
                { "data": "acciones" },
                { "data": "usr_reg" },
            ];
    var search = ["cor.numero","cor.cite","cor.fecha_documento","insti.nombre","persona.nombre_completo1","cor.referencia","cor.fecha_creacion_documento","persona.nombre_completo1"];
    tblEmitidaInterna.ajax(null, "../../sis_correspondencia/control/Correspondencia/listarCorrespondencia", columns, search );
};







$(document).ready(function() {

    botonera.init();
    tablas.init();
    modalCrear.init();
    
    $('.panel-heading span.clickable').trigger("click");
    
});