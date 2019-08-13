var tblRecibidaInterna   = new CDataTable('#tblRecibidaInterna');
var tblAdjuntos          = new CDataTable('#tblAdjuntos');
var tblDetalleDerivacion = new CDataTable('#tblDetalleDerivacion');


var botonera    = new ContainerJS("#botonera");
var buscador    = new ContainerJS("#buscador");
var tablas      = new ContainerJS("#tablas");


var modalCrear             = new ContainerJS("#modalCrear");
var modalEditar            = new ContainerJS("#modalEditar");
var modalAdjuntos          = new ContainerJS("#modalAdjuntos");
var modalDetalleDerivacion = new ContainerJS("#modalDetalleDerivacion");
var modalCrearDerivacion   = new ContainerJS("#modalCrearDerivacion");




modalAdjuntos._accionesBotonera = function()
{

    var self = this;

    self.ele.find("#btnNuevoAdjunto").click(function(event) {
        self.ele.find("#panelInputFile").show('slow');
    });

    self.ele.find("#btnCerrarSubirArchivo").click(function(event) {
        self.ele.find("#panelInputFile").hide('slow');
    });


    self.ele.find("#btnSubirArchivo").click(function(event) {

        var correspondencia = tblRecibidaInterna.getIds();
        if( correspondencia.length >0 )
        {
            if( self.ele.find("input[name='archivoAdjunto']")[0].files.length ){

                var archivo = self.ele.find("input[name='archivoAdjunto']")[0].files[0];
                
                formData = new FormData();
                formData.append('archivo[]', archivo);
                formData.append('id_adjunto', '');
                formData.append('x', "../../sis_correspondencia/control/Adjunto/insertarAdjunto");
                formData.append('p', '{"id_adjunto":"","archivo[]":"C:\\\\fakepath\\\\'+archivo.name+'","id_correspondencia_origen":"'+correspondencia[0].id_origen+'","id_correspondencia":"'+correspondencia[0].id_correspondencia+'","numero":"'+correspondencia.numero+'"}');
                
                $.ajax({
                       url : Config.baseUrl()+'/lib/lib_control/Intermediario.php',
                       type : 'POST',
                       data : formData,
                       processData: false,  // tell jQuery not to process the data
                       // contentType: 'multipart/form-data',
                       contentType: false,
                       success : function(res) {
                            res = JSON.parse(res);
                            if(res.ROOT && res.ROOT.error==false)
                            {
                                Notificacions.success("Se logro subir el archivo");                            
                            }else{
                                Notificacions.error(res.ROOT.detalle.mensaje);
                            }

                            modalAdjuntos.llenarTabla();
                       }
                });
            } else {
                Notificacions.info("Seleccione un archivo para subir");    
            }
        }else{
            Notificacions.info("Seleccione un registro");
        }
    });

    

    self.ele.find("#btnEliminarAdjunto").click(function(event) 
    {
        if(tblAdjuntos.getIds().length>0){
            var valSelect = tblAdjuntos.getIds()[0];
            var row = { "0":{
                                    "id_adjunto":valSelect.id_adjunto.toString(),
                                    "_fila":2,
                                    "id_correspondencia_origen":valSelect.id_correspondencia_origen.toString(),
                                    "id_correspondencia":"2552",
                                    "numero":valSelect.numero}
                                };
            row = JSON.stringify(row);        
            row = row.replace(/"/g, '\"');
            var data = {
                        "_tipo":"matriz",
                        "row":row
                    };
            data = JSON.stringify(data);
            console.log(data);
            CallRest.post('../../sis_correspondencia/control/Adjunto/eliminarAdjunto', data, function(res){
                
                if(res.ROOT && res.ROOT.error==false)
                {
                    Notificacions.success("Se elimino el registro");                    
                    modalAdjuntos.llenarTabla();
                }

            }, 1);
        }else {
            Notificacions.info("Seleccione un adjunto");
        }
    });

    

    self.ele.find("#btnVerAdjunto").click(function(event) {

        if(tblAdjuntos.getIds().length>0){
            var valSelect = tblAdjuntos.getIds()[0];
            
            
            $("#linkDescargaAdjunto").attr({target: '_blank', 
                    href  : "/kerp"+valSelect.ruta_archivo.substr(10)});
            document.getElementById("linkDescargaAdjunto").click();
            $("#linkDescargaAdjunto").attr({target: '', 
                    href  : ''});

        }else {
            Notificacions.info("Seleccione un adjunto");
        }
    });
};

modalAdjuntos.mostrarModal = function()
{
    var self = this;
    if(tblRecibidaInterna.getIds()[0])
    {
        self.ele.modal("show");
        self.llenarTabla();
    }else{
        Notificacions.info("Seleccione una fila");
    }
};

modalAdjuntos.llenarTabla = function()
{
    var self = this;
       
    var valSeleccionado = tblRecibidaInterna.getIds()[0];
    var data = {
                "start":0,
                "limit":50,
                "id_origen":valSeleccionado.id_origen,
                "estado":"recibido",
                "sort":"id_adjunto",
                "dir":"ASC",
                };
    CallRest.post('../../sis_correspondencia/control/Adjunto/listarAdjunto', JSON.stringify(data), 
    function(res)
    {
        
        tblAdjuntos.clean(); 
        $.each(res.datos, function(index, adjunto) {
            var row = "";
            row += "<tr>";
            row += "    <td>";
            row += "<input type='hidden' name='id_adjunto' value='"+adjunto.id_adjunto+"' />";
            row += "<input type='hidden' name='id_correspondencia_origen' value='"+adjunto.id_correspondencia_origen+"' />";
            row += "<input type='hidden' name='numero' value='"+adjunto.numero+"' />";
            row += "<input type='hidden' name='id_correspondencia' value='"+valSeleccionado.id_origen+"' />";
            row += "<input type='hidden' name='ruta_archivo' value='"+adjunto.ruta_archivo+"' />";
            row += "    </td>";
            row += "    <td>"+adjunto.numero+"</td>";
            row += "    <td>"+adjunto.extension+"</td>";
            row += "    <td>"+adjunto.nombre_archivo+"</td>";                
            row += "</tr>";                
            tblAdjuntos.append(row);
        });
        tblAdjuntos.simpleSelect();
    }); 
};










/**
 * METODOS DEL OBJETO DE LA BOTORENA
 */
botonera._init = function()
{
    var self = this;



    self.ele.find('#btnFinalizar').click(function(event){
        

        if(tblRecibidaInterna.getIds().length>0)
        {
            var correspondencia = tblRecibidaInterna.getIds()[0];

            var msg = "¿Desea finalizar la recepcion?";
            Notificacions.confirm(msg, function(res)
            {   
                if(res)
                {
                    var id_correspondencia = correspondencia.id_correspondencia;
                    var estado             = (correspondencia.estado=='pendiente_recibido')? 'recivido': '';
                    var dataRow            = tblRecibidaInterna.getIds()[0];
                    
                    var url = "../../sis_correspondencia/control/Correspondencia/finalizarRecepcionExterna";
                    var data = JSON.stringify({"id_correspondencia":id_correspondencia,"estado":estado});

                    CallRest.post(url, data, function(res){
                        if(res.ROOT.error==false){
                            Notificacions.success("La transacción se ha ejecutado con éxito");
                            tablas.llenarTabla();
                        }
                    }); 
                }
            });    


        } else {
            Notificacions.info("Seleccione una fila");
        }

    });



    self.ele.find('#btnAdjuntos').click(function(event){
        modalAdjuntos.mostrarModal();  
    });


    self.ele.find('#btnEditar').click(function(event){
        modalEditar.llenarModal(tblRecibidaInterna.getIds()[0]);      
    });

    self.ele.find("#btnVerDocumento").click(function(event) {
        
        if(tblRecibidaInterna.getIds().length>0)
        {
            var dataRow = tblRecibidaInterna.getIds()[0];
            
            var url = "../../sis_correspondencia/control/Correspondencia/verCorrespondencia";
            var data = '{"id_origen":"'+dataRow.id_origen+'"}';

            CallRest.post(url, data, function(res){
                if(res.total>0){
                    var ruta_archivo = res.datos[0].ruta_archivo;

                    $("#linkVerDocumento").attr({target: '_blank', href  : "/kerp"+ruta_archivo.substr(10)});
                    document.getElementById("linkVerDocumento").click();
                    $("#linkVerDocumento").attr({target: '', href  : ''});

                }
            });        
        }else{
            Notificacions.info("Seleccione una fila");
        }

    });


    self.ele.find("#btnDetalleDerivacion").click(function(event) {

        modalDetalleDerivacion.abrirModal();

    });



    self.ele.find('#btnDerivar').click(function(event){
        


        if(tblRecibidaInterna.getIds().length>0)
        {
            var correspondencia = tblRecibidaInterna.getIds()[0];

            var msg = "¿Esta seguro de DERIVAR el documento "+correspondencia.numero+"?";
            Notificacions.confirm(msg, function(res)
            {   
                if(res)
                {
                    var id_correspondencia = correspondencia.id_correspondencia;
                    var id_origen = correspondencia.id_origen;
                    var dataRow = tblRecibidaInterna.getIds()[0];
                    
                    var url = "../../sis_correspondencia/control/Correspondencia/derivarCorrespondencia";
                    var data = JSON.stringify({"id_correspondencia":id_correspondencia.toString(), "id_origen":id_origen.toString()});

                    CallRest.post(url, data, function(res){
                        if(res.ROOT.error==false){
                            
                            tablas.llenarTabla();

                        }
                    }); 
                }
            });    


        } else {
            Notificacions.info("Seleccione una fila");
        }

    }); 

    self.ele.find("#btnActualizar").click(function(event) {

        tablas.llenarTabla();

    });
};

botonera.habilitar = function(data)
{
    

    var btnFinalizar    = this.ele.find("#btnFinalizar");
    var btnAdjuntos     = this.ele.find("#btnAdjuntos");
    var btnVerDocumento = this.ele.find("#btnVerDocumento");
    var btnDerivar      = this.ele.find("#btnDerivar");

    btnFinalizar.prop('disabled','disabled');
    btnAdjuntos.prop('disabled','');
    btnVerDocumento.prop('disabled','');
    btnDerivar.prop('disabled','');

    if( data.estado=='pendiente_recibido' )
    {
        btnFinalizar.prop('disabled','');
        btnAdjuntos.prop('disabled','disabled');
        btnVerDocumento.prop('disabled','disabled');
        btnDerivar.prop('disabled','disabled');
    } else if( data.estado=='enviado' )
    {
        btnFinalizar.prop('disabled','disabled');
        btnAdjuntos.prop('disabled','');
        btnVerDocumento.prop('disabled','');
        btnDerivar.prop('disabled','disabled');
    }
};

botonera.limpiar = function(){
    this.ele.find('button').prop('disabled', '');
};











/**
 * METODOS DEL OBJETO BUSCADOR
 */
buscador._init = function()
{ 
    var self = this;
    self.ele.find('#input').select2();
    self.ele.find('#input2').select2();
    self.ele.find('input[name="fechaNacimiento"]').mask("00/00/0000", {placeholder: "__/__/____"});
};

buscador._buscadorFormulario = function(){
    var self = this;
    var formBuscador = self.ele.find("#formBuscador");
    formBuscador.submitValidation(function(res){
        
        if(res)
        {
            alert("entro");
        }
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
            case 'interna':
                url = "../../sis_correspondencia/control/Correspondencia/listarCorrespondenciaSimplificada";
                data = '{"start":"0","limit":"10","sort":"id_correspondencia","dir":"DESC","par_filtro":"cor.numero#cor.referencia#funcionario.desc_funcionario1#insti.nombre","tipo":"interna","query":""}';
                break;
            case 'externa':
                url = "../../sis_correspondencia/control/Correspondencia/listarCorrespondenciaSimplificada";
                data = '{"start":"0","limit":"10","sort":"id_correspondencia","dir":"DESC","par_filtro":"cor.numero#cor.referencia#funcionario.desc_funcionario1#insti.nombre","tipo":"externa","query":""}';
                break;
            case 'no':
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
    var dataD = '{"start":"0","limit":"10","sort":"codigo","dir":"ASC","par_filtro":"DOCUME.codigo#DOCUME.descripcion","tipo":"interna","query":""}';

    CallRest.post(urlD, dataD, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, documento) {
            row += "<option value='"+documento.id_documento+"''>"+documento.descripcion+"</option>";
        });
        self.ele.find('select[name="id_documento"]').html(row);
        self.ele.find('select[name="id_documento"]').select2();
    });

    var urlF = '../../sis_organigrama/control/Funcionario/listarFuncionarioCargo';
    var dataF = '{"start":"0","limit":"10","sort":"desc_funcionario1","dir":"ASC","par_filtro":"desc_funcionario1#email_empresa#codigo#nombre_cargo","es_combo_solicitud":"si","fecha":"08-03-2019","query":""}';

    CallRest.post(urlF, dataF, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, funcionario_cargo) {
            row += "<option value='"+funcionario_cargo.id_funcionario+"''>"+funcionario_cargo.desc_funcionario1+"-"+funcionario_cargo.codigo+"-"+funcionario_cargo.descripcion_cargo+"-"+funcionario_cargo.email_empresa+"-"+funcionario_cargo.oficina_nombre+"-"+funcionario_cargo.lugar_nombre+"</option>";
        });
        self.ele.find('select[name="id_funcionario_cargo"]').html(row);
        self.ele.find('select[name="id_funcionario_cargo"]').select2();        
    });

    var urlC = '../../sis_seguridad/control/Clasificador/listarClasificador';
    var dataC = '{"start":"0","limit":"10","sort":"prioridad","dir":"ASC","par_filtro":"codigo#descripcion","query":""}';

    CallRest.post(urlC, dataC, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, clasificador) {
            row += "<option value='"+clasificador.id_clasificador+"''>"+clasificador.descripcion+"</option>";
        });
        self.ele.find('select[name="id_clasificador"]').html(row);
    });

    var urlFD = '../../sis_organigrama/control/Funcionario/listarFuncionarioCargo';
    var dataFD = '{"start":"0","limit":"10","sort":"desc_funcionario1","dir":"ASC","par_filtro":"desc_funcionario1#email_empresa#codigo#nombre_cargo","estado_reg_asi":"activo","query":""}';

    CallRest.post(urlFD, dataFD, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, funcionario_cargo) {
            row += "<option value='"+funcionario_cargo.id_funcionario+"''>"+funcionario_cargo.desc_funcionario1+"-"+funcionario_cargo.codigo+"-"+funcionario_cargo.descripcion_cargo+"-"+funcionario_cargo.email_empresa+"-"+funcionario_cargo.oficina_nombre+"-"+funcionario_cargo.lugar_nombre+"</option>";
        });
        self.ele.find('select[name="id_funcionario_destino"]').html(row);
        self.ele.find('select[name="id_funcionario_destino"]').select2();        
    });

    var urlA = '../../sis_correspondencia/control/Accion/listarAccion';
    var dataA = '{"start":"0","limit":"20","sort":"nombre","dir":"ASC","par_filtro":"acco.nombre","query":""}';

    CallRest.post(urlA, dataA, function(res)
    {
        var row = '<option value="">Seleccione</option>';
        $.each(res.datos, function(index, accion) {
            row += "<option value='"+accion.id_accion+"''>"+accion.nombre+"</option>";
        });
        self.ele.find('select[name="id_accion"]').html(row);
        self.ele.find('select[name="id_accion"]').select2();
    });
};

modalCrear.validacion = function()
{
    var self = this;
    var formCrear = self.ele.find("#formCrear");
    
    formCrear.validate({
        rules: {
            "nombres": {
                required: true,
                minlength: 2
            },
            "paterno": {
                required: true,
                minlength: 5
            },
            "materno": {
                required: true,
                minlength: 5
            },
        }
    });

    formCrear.submitValidation(function(res){
        if(res) {

            console.log(formCrear.serializeJSON());
        }
    });
};




















/**
 * 
 */
modalEditar.llenarModal = function(id)
{
    var data = '{"start":"0","limit":"50","sort":"id_correspondencia","dir":"DESC","interface":"interna"}';
    var url = '../../sis_correspondencia/control/Correspondencia/listarCorrespondencia';

    CallRest.post(url, data, function(res)
    {
        if(res.result==1)
        {
            console.log(res.usuario);
        }
    });
};
















/**
 * METODOS DEL OBJETO TABLA
 */
tablas._init = function()
{
    var self = this;
    self.llenarTabla();

    // setTimeout (function(){ self.llenarTabla(); }, 3000);
    
};

tablas.llenarTabla = function(){

    var self = this;
    var data = '{"start":"0","limit":"50","sort":"id_correspondencia","dir":"DESC","interface":"recibida","tipo":"interna"}';
    var url = '../../sis_correspondencia/control/Correspondencia/listarCorrespondenciaRecibida';
    
    tblRecibidaInterna.clean();

    CallRest.post(url, data, function(res)
    {
        
        var row = "";
        $.each(res.datos, function(index, correspondencia) {

            botonera.limpiar();
            
            var prioridad = '';
            var iconoPrioridad = correspondencia.nivel_prioridad + '.png';
            if (correspondencia.nivel_prioridad=='1alta')
                prioridad='Alta';
            else if (correspondencia.nivel_prioridad=='2media')
                prioridad='Media';
            else
                prioridad='Baja';

            var estado = '';
            var iconoEstado = correspondencia.estado + '.png';
            switch (correspondencia.estado){
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
            
            
            row += "<tr>";
            row += "    <td>";
            row += "<input type='hidden' name='id_origen' value='"+correspondencia.id_origen+"' />";
            row += "<input type='hidden' name='id_correspondencia' value='"+correspondencia.id_correspondencia+"' />";
            row += "<input type='hidden' name='id_correspondencia_fk' value='"+correspondencia.id_correspondencia_fk+"' />";
            row += "<input type='hidden' name='numero' value='"+correspondencia.numero+"' />";
            row += "<input type='hidden' name='estado' value='"+correspondencia.estado+"' />";
            row += "    </td>";
            row += "    <td><img title='"+prioridad+"' src = 'public/images/" + iconoPrioridad + "' align='center' width='10' height='25'/></td>";
            row += "    <td><img title='"+estado+"' src='public/images/" + iconoEstado + "' align='center' width='40' height='40'></td>";
            row += "    <td>"+correspondencia.adjunto+"</td>";
            row += "    <td>"+correspondencia.numero+"</td>";
            row += "    <td>"+correspondencia.fecha_documento+"</td>";
            row += "    <td>"+correspondencia.referencia+"</td>";
            row += "    <td>"+correspondencia.observaciones_estado+"</td>";
            row += "    <td>"+correspondencia.observaciones_estado+"</td>";
            row += "    <td>"+correspondencia.desc_funcionario+"</td>";            
            row += "    <td>"+correspondencia.desc_correspondencias_asociadas+"</td>";
            row += "    <td>"+correspondencia.acciones+"</td>";
            row += "    <td>"+correspondencia.usr_reg+"</td>";
            row += "    <td>"+correspondencia.desc_funcionario_origen+"</td>";
            row += "    <td>"+correspondencia.fecha_creacion_documento+"</td>";
            row += "</tr>";
            
        });

        tblRecibidaInterna.html(row);
        tblRecibidaInterna.simpleSelectExport();    

        tblRecibidaInterna.OnSelect(function(data){
            botonera.habilitar(data);
        }); 

    });
};





































modalCrearDerivacion.abrirModal = function()
{
    var self = this;
    self.ele.modal("show");

    var url = "../../sis_organigrama/control/Funcionario/listarFuncionarioCargo";
    var data = '{"start":"0","limit":"1000","sort":"desc_funcionario1","dir":"ASC","par_filtro":"desc_funcionario1#email_empresa#codigo#nombre_cargo","estado_reg_asi":"activo","query":""}';
    CallRest.post(url, data, function(res){
        if( res.total>0 )
        {
            var option  = "<option value=''>Seleccione</option>";
            self.ele.find('select[name="id_funcionario"]').append(option);
            res.datos.forEach( function(funcionario, index) {
                option = "<option value='"+funcionario.id_funcionario+"'>"+funcionario.codigo+"-"+funcionario.desc_funcionario1+"-"+funcionario.descripcion_cargo+"-"+funcionario.email_empresa+"</option>";                
                self.ele.find('select[name="id_funcionario"]').append(option);
            });
        }
    });


    var urlA = "../../sis_correspondencia/control/Accion/listarAccion";
    var dataA = '{"start":"0","limit":"10","sort":"nombre","dir":"ASC","par_filtro":"acco.nombre","query":""}';
    CallRest.post(urlA, dataA, function(res){
        if( res.total>0 )
        {
            res.datos.forEach( function(accion, index) {
                var option = "<option value='"+accion.id_accion+"'>"+accion.nombre+"</option>";                
                self.ele.find('select[name="id_acciones"]').append(option);
            });
        }
    });
};


modalCrearDerivacion._formulario = function()
{
    var self = this;
    var formCrearDerivacion = self.ele.find("#formCrearDerivacion");

    formCrearDerivacion.validate({
        rules: {
            "id_funcionario": {
                required: true
            },
            "id_acciones": {
                required: true,
                minlength: 1
            }
        }
    });

    formCrearDerivacion.submitValidation(function(resultado){
        
        if(resultado) 
        {
            var id_funcionario = formCrearDerivacion.find("select[name='id_funcionario']").val();
            var mensaje = formCrearDerivacion.find("textarea[name='mensaje']").val();
            var id_acciones = formCrearDerivacion.find("select[name='id_acciones']").val();
            var correspondencia = tblRecibidaInterna.getIds()[0]; 
            var id_correspondencia = correspondencia.id_correspondencia;
            // console.log(id_acciones);
            var url  = "../../sis_correspondencia/control/Correspondencia/insertarCorrespondenciaDetalle";
            var data = '{"id_correspondencia":"","id_correspondencia_fk":"'+id_correspondencia+'","id_funcionario":"'+id_funcionario+'","id_persona":"","id_institucion":"","mensaje":"'+mensaje+'","id_acciones":"'+id_acciones.join(',')+'"}';
            
            CallRest.post(url, data, function(res)
            {
                if(res.ROOT.error==false)
                {
                    self.ele.modal("hide");
                    Notificacions.success();
                    modalDetalleDerivacion.abrirModal();
                    modalCrearDerivacion.limpiarFormulario();
                }
            });
        }

    });
};

modalCrearDerivacion.limpiarFormulario = function()
{
    var self = this;
    self.ele.find('#formCrearDerivacion').trigger('reset');
};

modalCrearDerivacion._cerrarModal = function()
{
    
    this.ele.on('hidden.bs.modal', function (e) {
        modalDetalleDerivacion.abrirModal();
    });
};
















modalDetalleDerivacion.abrirModal = function()
{
    
    if(tblRecibidaInterna.getIds().length>0){
        
        modalDetalleDerivacion.ele.modal('show');

    }else {
        Notificacions.info("Seleccione una fila");
    }
};

modalDetalleDerivacion._llenarTabla = function()
{
    modalDetalleDerivacion.ele.on('shown.bs.modal', function () 
    {
        var id_correspondencia_fk = tblRecibidaInterna.getIds()[0].id_correspondencia;
        tblDetalleDerivacion.clean(); 
        var url  = "../../sis_correspondencia/control/Correspondencia/listarCorrespondenciaDetalle";
        var data = '{"start":"0","limit":"50","sort":"id_correspondencia","dir":"ASC","id_correspondencia_fk":"'+id_correspondencia_fk+'"}';

        CallRest.post(url, data, function(res){

            if(res.total>0)
            {
                // tblDetalleDerivacion.clean(); 
                $.each(res.datos, function(index, detalle) {
                    var row = "";
                    row += "<tr>";
                    row += "    <td>";
                    row += "<input type='hidden' name='id_correspondencia' value='"+detalle.id_correspondencia+"' />";
                    row += "<input type='hidden' name='id_correspondencia_fk' value='"+detalle.id_correspondencia_fk+"' />";
                    row += "<input type='hidden' name='id_correspondencias_asociadas' value='"+detalle.id_correspondencias_asociadas+"' />";
                    row += "    </td>";
                    row += "    <td>"+detalle.acciones+"</td>";
                    row += "    <td>"+detalle.desc_funcionario+"</td>";
                    row += "    <td>"+detalle.mensaje+"</td>";                
                    row += "    <td>"+detalle.estado+"</td>";                
                    row += "</tr>";                
                    tblDetalleDerivacion.append(row);
                });
                
            }

            tblDetalleDerivacion.simpleSelect();
        });

    });
};

modalDetalleDerivacion.llenarTabla = function(id_correspondencia_fk)
{

    var url  = "../../sis_correspondencia/control/Correspondencia/listarCorrespondenciaDetalle";
    var data = '{"start":"0","limit":"50","sort":"id_correspondencia","dir":"ASC","id_correspondencia_fk":"'+id_correspondencia_fk+'"}';

    CallRest.post(url, data, function(res){

        if(res.total)
        {
            tblDetalleDerivacion.clean(); 
            $.each(res.datos, function(index, detalle) {
                var row = "";
                row += "<tr>";
                row += "    <td>";
                row += "<input type='hidden' name='id_correspondencia' value='"+detalle.id_correspondencia+"' />";
                row += "<input type='hidden' name='id_correspondencia_fk' value='"+detalle.id_correspondencia_fk+"' />";
                row += "<input type='hidden' name='id_correspondencias_asociadas' value='"+detalle.id_correspondencias_asociadas+"' />";
                row += "    </td>";
                row += "    <td>"+detalle.acciones+"</td>";
                row += "    <td>"+detalle.desc_funcionario+"</td>";
                row += "    <td>"+detalle.mensaje+"</td>";                
                row += "    <td>"+detalle.estado+"</td>";                
                row += "</tr>";                
                tblDetalleDerivacion.append(row);
            });
            tblDetalleDerivacion.simpleSelect();
        }

    }); 
};


modalDetalleDerivacion._botonera = function()
{
    var self = this;
    self.ele.find("#btnNuevoDetalle").click(function(event) {
        self.ele.modal('hide');
        modalCrearDerivacion.abrirModal();
    });

    self.ele.find("#btnEliminarDetalle").click(function(event) {
        
        if(tblDetalleDerivacion.getIds().length>0)
        {
            Notificacions.confirm("Desea eliminar?", function(resultado){ 
                if(resultado){
                    var id_correspondencia    = tblDetalleDerivacion.getIds()[0].id_correspondencia;
                    var id_correspondencia_fk = tblDetalleDerivacion.getIds()[0].id_correspondencia_fk;
                    var url = "../../sis_correspondencia/control/Correspondencia/eliminarCorrespondencia";
                    var data = '{"_tipo":"matriz","row":"{\\"0\\":{\\"id_correspondencia\\":\\"'+id_correspondencia+'\\",\\"_fila\\":3}}"}';
                    
                    CallRest.post(url, data, function(res){
                        if(res.ROOT.error == false)
                        {
                            modalDetalleDerivacion.llenarTabla(id_correspondencia_fk);
                        }
                    }, 1);
                }
            });
        }
        
    });
};






















$(document).ready(function() {

    botonera.init();
    buscador.init();
    tablas.init();
    modalCrear.init();
    modalEditar.init();
    modalAdjuntos.init();
    modalDetalleDerivacion.init();
    modalCrearDerivacion.init();
    
    
    $('.panel-heading span.clickable').trigger("click");


    $("#button").click(function(){
        
        var formData = new FormData();
        formData.append('x', "../../sis_correspondencia/control/Adjunto/insertarAdjunto");
        formData.append('p', '{"id_adjunto":"","archivo[]":"C:\\fakepath\\ComunicacionInterna..docx","id_correspondencia_origen":"2551","id_correspondencia":"2552","numero":"EC-GAF-IT-1/12-2018"}');
        console.log(formData);
        $.ajax({
               url : 'http://192.168.56.2/kerp/lib/lib_control/Intermediario.php',
               type : 'POST',
               data : formData,
               processData: false,  // tell jQuery not to process the data
               contentType: false,  // tell jQuery not to set contentType
               success : function(data) {
                   console.log(data);
                   alert(data);
               }
        });
    });

  
    
    

});