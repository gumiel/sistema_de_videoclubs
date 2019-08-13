function ModelJS(model)
{
	var modelJs = model;

	this.removeNull = function(obj)
	{
		if( typeof obj != 'undefined')
		{
			obj = modelJs;
		}
		
		for(var atr in obj)
		{	
			if(typeof obj[atr]=='object' && obj[atr]!= null )
			{							
				obj[atr] = this.removeNull(obj[atr]);
			} else
			{					
				if(obj[atr] == 'null' || obj[atr] == null)
				{								
					obj[atr] = '';
				}	
			}
		}
		return obj;
	};
}


function borrarNulos(obj){
	for(const atr in obj)
	{	
		if(typeof obj[atr]=='object' )
		{							
			obj[atr] = borrarNulos(obj[atr]);
		} else{	
			alert(obj[atr]);
			if(obj[atr] == 'null' || obj[atr] == null)
			{			
				
				obj[atr] = '';
			}	
		}
	}
	return obj;
}