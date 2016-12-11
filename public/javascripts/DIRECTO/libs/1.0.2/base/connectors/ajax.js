/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/

//Defining generic Application
Ext.define('DIRECTO.LIB.base.connectors.ajax', {
	//Internal
	appUrlBase: DIRECTO.INFO.baseDirectUrl,
	appController: 'directoAjax',
	appMethod: 'process',
	
	//Constructor
    constructor : function(config) {
		var me = this;
		me.callParent();
		Ext.Ajax.on('requestcomplete', me.requestCompleteProcessor);
		
    },	
	
	
	//Processing all requests
	processRequest: function(prParams, prSuccess, prNoSuccess){
		var me = this;
		
		var url = me.appUrlBase + '/' + appMethod;
		
		//Processing
		me.request({
			url: me.appUrlBase,
			cors: true, //Important for calling other sites than localhost
			params: prParams,
			success: function(prResponse, prOpts){
				var response = Ext.decode(prResponse, true);
				//if not decoded
				if(!response){
					me.fireEvent('appException', 'Process Request', prResponse.responseText);
					return;
				}
				//if success
				if(response.success){
					prSuccess();
					return;
				}
				//if needs login
				if(response.loginRequired){
					me.login({
						success: function(){
							//on success calling me again
							me.processRequest(prParams, prSuccess, prNoSuccess, prUrl);
						} 
					})
					return;
				}
				//Calling no success function if declared
				if(!Ext.isFunction(prNoSuccess)){
					prNoSuccess();
				}	
			},
			failure: function(prResponse, prOpts){
				me.fireEvent('appException', 'Process Request', 'Failure calling [' + url + ']' || prResponse.responseText);
			}
		});
							 	
	},
	
	requestCompleteProcessor: function( prConn, prResponse, prOptions, prEOpts ){
			
	}
});

/*
* End
*/