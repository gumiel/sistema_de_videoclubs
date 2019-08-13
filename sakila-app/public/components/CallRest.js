var CallRest = {
	config: {
		url: '',
		type: '',
		dataType: 'json',
		xhrFields: { withCredentials:true },
		data: {},
		async: true,
	},
	post: function(url, data, callback, m){
		if(!m)
			m = 0;

		this.config.url = url;
		this.config.data = data;
		this.config.type = 'POST';
		
		$.ajax(this.config)
		.done(function(result) {
			return callback(result);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			if(textStatus=="error" && jqXHR.status ==406)
			{		
				Notificacions.errors(jqXHR.responseJSON.ROOT.detalle.mensaje);
			}
		});	
	},
	get : function(url, data, callback){
		
		this.config.url = url;
		this.config.data = data;
		this.config.type = 'GET';
		
		$.ajax(this.config)
		.done(function(result) {
			return callback(result);
		});	
	}  
	
	
};