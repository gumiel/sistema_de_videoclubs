/**
 * Variables de configuracion
 */
var Config = {
	folderServer  : "/sistema_de_videoclubs",
	folder  : "/sakila-app/app/",
	// domain : document.domain,
	domain : 'localhost',
	protocol : window.location.protocol,
	baseUrl : function(){
		return this.protocol + "//" + this.domain + this.folderServer;
	},
	siteUrl : function(){
		return this.protocol + "//" + this.domain + this.folderServer + this.folder;
	}
};
