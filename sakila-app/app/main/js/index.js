var PaginaPrincipal = new ContainerJS("#paginaPrincipal");





PaginaPrincipal._cargarMenuPrincipalSideBar = function()
{
    console.log(123132132);
    var self = this;
    
    var url = 'http://localhost/sistema_de_videoclubs/sakila-ci/index.php/menu/list';
    var data = '';
    var itemsMenu = '';
    
    self.ele.find("#listaMenu").append(itemsMenu);
    
    CallRest.post(url, data, function(res){

        $.each(res.menus, function(index, item) {

            index = index+2;            
            
            if(item.icono!='' && item.icono!=null){
                item.icono = item.icono.replace("../../../lib/", "../pxp/lib/");
                item.icono = '<img src="'+item.icono+'" />';
            }else {
                // if(item.nombre.indexOf("fa-1x")<0){
                //     item.icono = '<i class="fa fa-folder-open"></i>';
                // }
            }

            if(item.tipo=='rama')
            {   
                itemsMenu = '';
                itemsMenu += '<li class="panel panel-default" id="dropdown">';
                itemsMenu += '    <a data-toggle="collapse" href="#dropdown-lvl'+index+'" data-index="'+index+'" data-id="'+item.id+'" class="subMenu">';
                itemsMenu += '        '+item.icono+' '+item.nombre+' <span class="caret"></span>';
                itemsMenu += '    </a>';

                    
                itemsMenu += '    <div id="dropdown-lvl'+index+'" class="panel-collapse collapse">';
                itemsMenu += '        <div class="panel-body">';
                itemsMenu += '            <ul class="nav navbar-nav"></ul>';                
                itemsMenu += '        </div>';
                itemsMenu += '    </div>';
                itemsMenu += '</li>';
                self.ele.find("#listaMenu").append(itemsMenu);
            } else {
                var codeUnico = self.uniqueId('CD');
                itemsMenu = '<li><a href="#'+index+'" data-code="'+codeUnico+'" data-id="'+item.menu_id+'" data-nombre="'+item.name_menu+'" data-ruta="'+item.route+'" class="btnMenuLink">'+item.name_menu+'</a></li>';
                self.ele.find("#listaMenu").append(itemsMenu);
            }

        });
    });
};


PaginaPrincipal._cargarSubMenuSideBar = function()
{
    var self = this;
    $(document).on('click', '.subMenu', function(){
        
        var id            = $(this).data('id');
        var indexAnterior = $(this).data('index');
        var elementUl     = $(this).parent('li').children('div').children('div').children('ul');
        var contenidoUL   = elementUl.html();
        
        if(contenidoUL=='')
        {            
            var url = '../../sis_seguridad/control/Menu/listarPermisoArb';
            var data = '{"node":"'+id+'"}';

            CallRest.post(url, data, function(res){


                $.each(res, function(index, item) {
                
                    var indexNuevo = indexAnterior+""+index;

                    if(item.tipo=='rama')
                    {   

                        itemsMenu = '';
                        itemsMenu += '<li class="panel panel-default" id="dropdown">';
                        itemsMenu += '    <a data-toggle="collapse" href="#dropdown-lvl'+indexNuevo+'" data-index="'+indexNuevo+'" data-id="'+item.id+'" class="subMenu">';
                        itemsMenu += '        '+item.icono+' '+item.nombre+' <span class="caret"></span>';
                        itemsMenu += '    </a>';

                            
                        itemsMenu += '    <div id="dropdown-lvl'+indexNuevo+'" class="panel-collapse collapse">';
                        itemsMenu += '        <div class="panel-body">';
                        itemsMenu += '            <ul class="nav navbar-nav"></ul>';                
                        itemsMenu += '        </div>';
                        itemsMenu += '    </div>';
                        itemsMenu += '</li>';
                        elementUl.append(itemsMenu);
                    } else if(item.tipo!='rama') {
                        var codeUnico = self.uniqueId('CD');
                        itemsMenu = '<li><a href="#'+indexNuevo+'" data-code="'+codeUnico+'" data-nombre="'+item.text+'" data-id="'+item.id+'" data-ruta="'+item.ruta_archivo+'" class="btnMenuLink">'+item.nombre+'</a></li>';
                        elementUl.append(itemsMenu);
                    }
                });
            });
        }
    });
};

PaginaPrincipal._eventoBotonSideBarMostrarIframe = function()
{
    var self = this;
    $(document).on('click', '.btnMenuLink', function(){
        
        var ruta   = $(this).data("ruta");
        var id     = $(this).data("id");
        var nombre = $(this).data("nombre");
        var code   = $(this).data("code");

        var bandera = false;

        self.limpiarBotonesNavBar();

        $("#listBtnMenu a").each(function(index, el) {
            var codeBtnNavBar = $(el).data('uuid');
            if(codeBtnNavBar==code)
                bandera = true;            

        });

        if (bandera)
        {
            self.mostrarIframeDeBoton(code);
        } else
        {            
            ruta = Config.siteUrl()+"/"+ruta;
            
            
            var uuid = code;
            var iframeContent = '<iframe class="iframeLoad" id="'+uuid+'" width="100%" src="'+ruta+'" frameborder="0" allowfullscreen ></iframe>';
            var buttonToIframeNew = '<li><a class="btnNavBarMenu" href="#" data-id="'+id+'" data-uuid="'+uuid+'" data-ruta="'+ruta+'" >'+nombre+'</a></li>';
            
            $("#listBtnMenu").append(buttonToIframeNew);
            self.mostrarIframe(iframeContent, uuid);

            $('#'+uuid+'').load(function (e) 
            {
                var title = $('#'+uuid+'').contents().find('title').html();

                if ( title.indexOf("404")>=0 ) 
                {
                    $('#'+uuid+'').attr("src",Config.siteUrl()+"/404.php");
                } 
                $('.navbar-toggle-sidebar').click();
            });

            var uno = new correctorIframe(uuid);

        }
    });
};

PaginaPrincipal._eventoBotonNavBarMostrarIframe = function()
{
    var self = this;
    $(document).on('click', '.btnNavBarMenu', function(){
        
        self.limpiarBotonesNavBar();
        var uuidBtn = $(this).data('uuid');
        $('#contenedorIframes iframe').each(function(index, el) {
            var uuidIframe = $(el).prop('id');
            
            if( uuidBtn==uuidIframe )
                $(el).show();
            else
                $(el).hide();
            
        }); 
        $(this).addClass('btn-warning');
        
    });
};

PaginaPrincipal._mostrarYOcultarSideBar = function()
{
    $('.navbar-toggle-sidebar').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        $('#search').removeClass('in').addClass('collapse').slideUp(200);
    });
};

PaginaPrincipal._mostrarYOcultarNavBar = function()
{
    $('#search-trigger').click(function () {
        $('.navbar-nav').removeClass('slide-in');
        $('.side-body').removeClass('body-slide-in');
        $('.search-input').focus();
    });
};

PaginaPrincipal._linkAuxiliares = function()
{
    this.ele.find('a[href="#cerrarSession"]').click(function(event) {
                
        CallRest.postFree("/sis_seguridad/control/auten/cerrar.php", null, function(res){
            location.href = Config.baseUrl()+Config.folder+"/login.php";
        });

    });
};









PaginaPrincipal.mostrarIframeDeBoton = function(code)
{
    $("#listBtnMenu li").each(function(index, el) {
        var codeBtn = $(el).find("a").data('uuid');            
        if(code==codeBtn)
        {                
            $(el).find('a').addClass('btn-warning');
        }
    });
};

PaginaPrincipal.limpiarBotonesNavBar = function()
{
    $("#listBtnMenu li").each(function(index, el) {
        $(el).find('a').removeClass('btn-warning');
    });
};

PaginaPrincipal.mostrarIframe = function(iframeContent, uuid)
{        
    var existeIframe = false;
    $('#contenedorIframes iframe').each(function(index, el) {
        if($(el).prop('uuid')==uuid){
            $(el).show();
            existeIframe = true;
        }else{
            $(el).hide();
        }
    });
    
    if(!existeIframe){
        $('#contenedorIframes').append(iframeContent);
    }
};

PaginaPrincipal.uniqueId = function(prefix) {
    var id = + new Date() + '-' + Math.floor(Math.random() * 1000);
    return prefix ? prefix + id : id;
};








$(document).ready(function() {

    PaginaPrincipal.init();

});