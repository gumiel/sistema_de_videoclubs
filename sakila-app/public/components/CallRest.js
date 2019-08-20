var CallRest = {
	config: {
		url: '',
		type: '',
		dataType: 'json',
		xhrFields: { withCredentials:true },
		data: {},
		async: true,
	},
	post: function(url, data, callback){

		this.config.url = Config.rest_base_url+url;
		this.config.data = data;
		this.config.type = 'POST';
		
		$.ajax(this.config)
		.done(function(result) {
			return callback(result);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			
			if(textStatus=="error")
			{		
				switch(jqXHR.status){
					case 406:  Notificacions.errors("ERROR 406");
					case 404:  Notificacions.errors("ERROR 404");
				}
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
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log(99999);
			if(textStatus=="error")
			{		
				switch(jqXHR.status){
					case 406:  Notificacions.errors("ERROR 406");
					case 404:  Notificacions.errors("ERROR 404");
				}
			}
		});	
	}  
	
	
};