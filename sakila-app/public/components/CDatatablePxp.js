function CDataTablePxp(element, configCustom){

	// Herencia del objeto CDataTable
	this.base = CDataTable;
	this.base(element);

	var configIni = {
        responsive: true,
    	language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": '<img src="public/images/rotor.gif" alt="Procesando..." /> Procesando...</div>',
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
	            "first": "Primero",
	            "last": "Ultimo",
	            "next": "Siguiente",
	            "previous": "Anterior"
	        }
	    },
	    rowReorder: false
    };

	this.ajax = function(data, url, columns, search){
		var self = this;

		if( columns[0].data==null )
			columns[0].data = 'data_input';

		var configAjax = {
	        "processing": true,
	        "pageLength": 10,
	        "serverSide": true,
	        "responsive": true,
	        "ajax": {
	            url: Config.protocol+"//"+Config.domain+Config.folderServer+"/lib/lib_control/Intermediario.php",
	            type: "POST",
	            data: function ( d ) {
	            	
	                d.x = url;
	                d.p = '{"start":"'+d.start+'","limit":"'+d.length+'","sort":"'+d.columns[d.order[0].column].data+'","dir":"'+d.order[0].dir.toUpperCase()+'","interface":"interna", "bottom_filter_value":"'+d.search.value+'", "bottom_filter_fields":"'+search.join(',')+'"}';
	            
	            },
	            dataFilter: function(data){

	                var json = jQuery.parseJSON( data );	                
					var addDataRow = "";
	                for (var i = 0; i < json.datos.length; i++) {
	                	addDataRow = self.addDataRow(json.datos[i]);
	                	json.datos[i].data_input = addDataRow;
	                }

	                json.recordsTotal = json.total;
	                json.recordsFiltered = json.total;
	                json.data = json.datos;
	      			
	                return JSON.stringify( json ); // return JSON string
	            }
	        },
	        "columns": columns,
	        "columnDefs": [ {
	            "targets": 0,
	        //     "data": null,
	        //     "defaultContent": "",
	            orderable: false,
	            className: 'select-checkbox',
	        } ],
	        select: true,
	        order: [[ 1, 'asc' ]]
	    };

	    // Corrige la primera columna que sale para marcar
	    if(typeof configCustom != 'undefined' && 
	    	typeof configCustom.select != 'undefined' && 	    	
	    	typeof configCustom.columnDefs == 'undefined' &&
	    	configCustom.select == false )
	    {	    	
	    	configAjax.columnDefs = [{
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            }];            
	    }
		
		configAjax = Object.assign(configAjax, configIni);
		configAjax = Object.assign(configAjax, configCustom);
		this.table = $(this.element).DataTable( configAjax );
		this.accumulated();
        this.table.rows( { selected: true } ).data();
	};

}

CDataTablePxp.prototype = new CDataTable();