/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-all.js
*/
//Defining DIRECTO on ready
//Defining DIRECTO -- Mandatory


Ext.onReady(
	function(){
		//Getting config from index.html
		DIRECTO = DIRECTOApplyIndexConfig();

		//Setting Paths
		Ext.Loader.setPath('DIRECTO.LIB', DIRECTO.INFO.PATHS.lib);
		Ext.Loader.setPath('DIRECTO.APP', DIRECTO.INFO.PATHS.app);	
        		
		//Ext.util.CSS.swapStyleSheet('appStyle', DIRECTO.INFO.PATHS.style + '/style.css'); 

		//Adding utils  
		Ext.require('DIRECTO.APP.APPLICATION');
	}
);

DIRECTOApplyIndexConfig = function(){
	//It is possible that it was not defined in index.html
	try{
		var config = pageConfig;	
	}catch(e){
		var config = {};
	}
	//Defaults
	Ext.applyIf( config, { INFO: {} });
	Ext.applyIf( config, { APP: {} });
	Ext.applyIf( config.INFO, { DIRECTOPath: 'javascripts/DIRECTO' });
	Ext.applyIf( config.INFO, { DIRECTOLibVersion: '1.0.2' });
	Ext.applyIf( config.INFO, { DIRECTOAppName: 'dashboard' });
	Ext.applyIf( config.INFO, { baseUrl: '' });
	Ext.applyIf( config.INFO, { baseController: 'DIRECTO' });	
	Ext.applyIf( config.INFO, { baseMethod: 'process' });		
	
	//Definning DIRECTO Others
//	DIRECTO.APP = {};
	config.INFO.PATHS = {
		lib: config.INFO.baseUrl + '/' + config.INFO.DIRECTOPath + '/libs/' + config.INFO.DIRECTOLibVersion,			
		app: config.INFO.baseUrl + '/' + config.INFO.DIRECTOPath + '/apps/' + config.INFO.DIRECTOAppName
	};	
	return config;
};

/**
* End
*/

