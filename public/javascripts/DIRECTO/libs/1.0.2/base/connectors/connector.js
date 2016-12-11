/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/

//Defining generic Application
Ext.define('DIRECTO.LIB.base.connectors.connector', {
    extend: 'Ext.data.Connection',
	requires: [
		'Ext.data.Connection'
	],
	//Internal
	appUrlBase: '',
	appController: 'directoAjax',
	appMethod: 'process',

	//Contructor	
	constructor : function(config) {
    	var me = this;
    	me.callParent(config);
    	me.appUrlBase = DIRECTO.INFO.baseDirectUrl;.
    	
    },
		
		
		
		
	//Processing all requests
	processRequest: function(prParams, prSuccess, prNoSuccess, prUrl){
		var me = this;
		//setting defaults
		var url = prUrl || DIRECTO.INFO.baseDirectUrl;
		
		//me.DIRECT.callModuleFunction(
		//	prParams,
		//	function(){
		//		alert('pepe');
		//	}
		//)
		//return;
		
		
		//Processing
		Ext.Ajax.request({
			url: url,
			//cors: true, //Important for calling other sites than localhost
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

    //openning operation
    openOperation: function (prThis, prRecord, prItem, prIndex, prEe, eOpts) {
        var me = this;
        
        //getting values
        var moduleName = prRecord.data.moduleName;
        if (!moduleName) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Openning operation', 'No module name. Can not open operation');
            return false;
		}
        var operationName = prRecord.data.operationName;
        if (!operationName) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Openning operation', 'No operation name. Can not open operation');
            return false;
		}
        var operationClass = prRecord.data.operationClass;
        if (!operationClass) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Openning operation', 'No panelClass name. Can not open operation');
            return false;
		}
		//Verifying if class is defined
        Ext.syncRequire(operationClass);
        if (!Ext.ClassManager.isCreated(operationClass)) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Openning operation', 'panelClass [' + operationClass + '] does not exists. Can not open operation');
            return false;
		}

        //verifying Module
        //if not exists then add it
        if (!me.MODULES[moduleName]) { me.MODULES[moduleName] = {}; }
        var moduleObj = me.MODULES[moduleName];
		//Verifying operation
        if(!moduleObj[operationName]) {
            moduleObj[operationName] = Ext.create(
        		operationClass,
        		{
        			title: prRecord.data.description,
        			closable: true,
        			closeAction: 'destroy',
        			moduleName: moduleName,
        			operationName: operationName,
                    operationData: prRecord.data,
        			listeners: {
						destroy: {
							fn: function(){
							    delete moduleObj[operationName];
							}
						}
					}
        		}
        	);
            me.panelBody.add(moduleObj[operationName]);
        }

        var operationObj = moduleObj[operationName];
		
        //Verifiyng operation
        if (!operationObj) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Abriendo opción', 'No existe la operación [' + prRecord.data.operationName + ']');
            return false;
        }

        operationObj.show();
    },

    itemMouseEnter: function (prThis, prRecord, prItem, prIndex, prE, prOpts) {
        var me = this;

        me.panelStatus.setStatus({
            text: prRecord.data.operationTitle,
            iconCls: 'ok-icon'
        });
    },

    itemMouseLeave: function (prThis, prRecord, prItem, prIndex, prE, prOpts) {
        var me = this;
        me.panelStatus.clearStatus();
    },

    //Excepciones
    direcStoreException: function (reader, response, error, eOpts) {
        Ext.Msg.show({
            draggable: false,
            title: 'Error obteniendo datos',
            msg: error.error,
            icon: Ext.Msg.WARNING
        });
    },

    appExceptionFired: function (prProcess, prMessage, prParams) {
        Ext.Msg.show({
            draggable: false,
            title: 'Error en proceso: ' + prProcess,
            msg: prMessage,
            icon: Ext.Msg.ERROR
        });
    },

    //Evento de carga de módulo fallido
    moduleLoadFailed: function (prModule) {

    },

    //Evento de carga de módulo
    moduleLoadSuccess: function (prModule) {

    },

    //Evento de carga de operación
    operationLoadSuccess: function (prOperation) {
        var me = this;
        Ext.MessageBox.hide();
    },

    //Evento de carga de operación
    operationLoadFailed: function (prOperation, prMessage) {
        alert(prOperation.directOperation + ' no cargada. El error es:' + prMessage);
    },

	//Creating store
	createStore: function (prDirectModule, prDirectOperation, prDirectFunction, prModel) {
		//Requiring model
		Ext.syncRequire(prModel);
		if (!Ext.ClassManager.isCreated(prModel)) {
			DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Creación de Store', 'El modelo [' + prModel + '] no existe');
			return null;
		}

		//Creating store
		var tStore = Ext.create(
			'Ext.data.Store',
			{
				model: prModel,
				autoload: true,
				proxy: {
					type: 'direct',
					directFn: prDirectFunction,
					extraParams: {
						module: prDirectModule,
						operation: prDirectOperation
					},
					reader: {
						type: 'json',
						root: 'data',
						messageProperty: 'message',
						totalProperty: 'total'
					}
				}
			}
		);

		//Defining exception callback
		Ext.onReady(function () {
			tStore.getProxy().on('exception', DIRECTO.APP.APPLICATION.direcStoreException);
		});

		//Returning created store
		return tStore;
	},

	//Module function registring
	registerDirect: function (prScope) {
		//registering DIRECT functions for scope
		//module
		this.registerDirectFunction(
			'callDirectModuleFunction', 
			'callModuleFunction',
			prScope
		);			
		//operation
		this.registerDirectFunction(
			'callDirectOperationFunction', 
			'callOperationFunction',
			prScope
		);			
		//task
		this.registerDirectFunction(
			'callDirectTaskFunction', 
			'callTaskFuncion',
			prScope
		);			
	},	

	//Create monitoring
	registerMonitoring: function(){
		var me = this;
		//Adding exception events
		var msgFunction = function(prTitle, prMessage){
			var title = prTitle || 'no title';
			var msg = prMessage || 'no message';
				
			if(Ext.Msg.isHidden()){
				Ext.Msg.show({
					closable: false,
					draggable: false,
					title: title,
					msg: msg, 
					icon: Ext.Msg.ERROR
				});
			}
		};
		
		//Add monitoring for ajax exceptions
		Ext.Ajax.on(
			'requestexception',
			function (conn, response, options, eOpts) {
				var title = 'Exception found';
				var msg = response.responseText || 'no message';
				
				me.fireEvent(
					'directException',
					title,
					msg
				);
			}
		);
		
		//Add monitoring to exceptions
		Ext.direct.Manager.on(
			'exception',
			function (prEvent, prOptions) {
				var title = 'Exception found';
				var msg = 'no message';
				 
				//building message
				switch(prEvent.code){
					case 'xhr':
						title = prEvent.xhr.statusText;
						msg = prEvent.xhr.responseText;
						break;
					case 'parse':
						msg = prEvent.xhr.responseText;
						break;
					default:
						msg = prEvent.message;
						break;
				}
				
				me.fireEvent(
					'directException',
					title,
					msg
				);
			}
		);
		
		//Handling errors
		Ext.Error.handle = function(prError){
			DIRECTO.APP.EVENT_MANAGER.fireEvent(
				'appException', 
				'Error ocurred', 
				'Error msg: ' + prError.msg + '</br>' +
				'- Source: ' + prError.sourceClass + '</br>' +
				'- Method: ' + prError.sourceMethod 					
			);
			return true;					
		};
	}	
});

/*
* End
*/