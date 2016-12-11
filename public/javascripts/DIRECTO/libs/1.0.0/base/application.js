/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define('DIRECTO.LIB.base.application', {
    extend: 'Ext.app.Application',
	requires: [
		'DIRECTO.LIB.panels.module',
		'DIRECTO.LIB.panels.header'
	],
	
	//Base configuration
    name: 'DIRECTO',
 	pageLogo: 'logo.png', 
 	pageTitle: 'DIRECTO - Base App',
	
	//Header
	headerPanel: null,
	headerClass: 'DIRECTO.LIB.panels.header',
	headerConfig: {
		region: 'north'
	},
	//Main Panel
	mainPanel: null,
	mainPanelClass: 'Ext.panel.Panel',
	mainPanelConfig: {
		region: 'center',
		defaults: {
			// applied to each contained panel
			bodyStyle: 'padding:15px'
		},
		layout: 'card'
	},	
	
	panels: 'DIRECTO.LIB.panels.module',
 	   
    //Open operations container
    MODULES: {},

    //direct functions container
    DIRECT: {},

    //Application Initialization
    launch: function () {
        var me = this;

        //Defining main application for accessing any place
        DIRECTO.APP.APPLICATION = me;

        //Handling errors
        Ext.Error.handle = me.handleErrors;
        me.registerMonitoring();

        //Handling exceptions
        me.addListener('directException', me.appExceptionFired, me);
        me.addListener('appException', me.appExceptionFired, me);
        me.addListener('operationLoadSuccess', me.operationLoadSuccess, me);
        me.addListener('operationLoadFailed', me.operationLoadFailed, me);
	

        //Registering direct functions
        me.registerDirect(me);
        me.loadApplication();
		me.loadMainPanels();
    },
	
	//load application function
	//Start point
	loadApplication: function(){
		var me = this;
		//Creating viewport
		me.appViewport = Ext.create('Ext.container.Viewport', { layout: 'border' });
		
		//Loading Header
		me.headerPanel = Ext.create(me.headerClass, me.headerConfig);
		me.appViewport.add(me.headerPanel);
		
		//Creating main container
		me.mainPanel = Ext.create(me.mainPanelClass, me.mainPanelConfig);
		me.appViewport.add(me.mainPanel);
	},	

	//load main panels function
	loadMainPanels: function(){
		var me = this;
		//Requires and loads after
		Ext.require(
			me.panels, function(){
				//Loading modules
            	me.panels = Ext.isString(me.panels) ? [ me.panels ] : me.panels;
            	Ext.each(
            		me.panels, 
            		function(prClass){
		  				var current = Ext.create(prClass, { });
		  				if(current.defaultModule){
							current.mainButton.getEl().dom.click(); //fireEvent('click');
						}          			
            		}
            	);				
			},
			me 
		);
	},		
	
	//Privates functions
   	privates: {
		//direct function registring
		registerDirectFunction: function (prControllerFunction, prFunctionName, prScope, prTimeout) {
			//Defining params
			//by defalt all parameters are defined but not all are  needed
			var params = ['module', 'operation', 'task', 'functionName', 'params'];

			//defining timeout
			var timeout = 300000;
			if (Ext.isDefined(prTimeout)) timeout = prTimeout;

			//Defining direct 
			var providerDefinition = {
				url: DIRECTO.INFO.baseDirectUrl + prControllerFunction,
				type: "remoting",
				timeout: timeout,
				namespace: prScope,
				actions: {
					DIRECT : [
						{
							name: prFunctionName,
							params: params							
						}
					]
				}
			};
			
			//Adding provider
			Ext.direct.Manager.addProvider(providerDefinition);

		}			
	},	

    //Carga de módulos
    loadModules: function () {
        var me = this;
		//Wait message
        Ext.MessageBox.wait('Cargando módulos habilitados...');

        //Cargando módulos
        me.DIRECT.callModuleFunction(
            {
                module: 'APPMODULE',
                functionName: 'getModules'
            },
            function (prResult) {
                if (!prResult.success) {
                    DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Cargando módulos', prResult.message);
                    return false;
                }

                //para cada módulo creamos el módulo local
                me.panelOptionsContainer.removeAll();
                Ext.each(prResult.data, function (prEl) {
                	//if is not visible then will not be processes
                	if(!prEl.moduleVisible){ return; }
					//Creating module
                    var module = Ext.create(
                        'DIRECTO.LIB.module.module',
                        {
                            title: prEl.moduleTitle || 'no title',
                            icon: prEl.icon,
                            operations: prEl.moduleOperations
                        }
                    );
                   	//adding module to container
                    me.panelOptionsContainer.add(module);
                });
                Ext.MessageBox.hide();
            }
        );

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

    handleErrors: function (prError) {
        Ext.Msg.show({
            draggable: false,
            title: 'Error found',
            msg: prError.msg + '</br> -Source Class: ' + prError.sourceClass + '</br> -Source Method:' + prError.sourceMethod,
            icon: Ext.Msg.ERROR
        });
        return true;
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

		DIRECTO.APP.EVENT_MANAGER.addListener('directException', msgFunction);
		DIRECTO.APP.EVENT_MANAGER.addListener('appException', msgFunction);
		
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
				
				DIRECTO.APP.EVENT_MANAGER.fireEvent(
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
	},
	
	//Overriding loader functions
	overrideLoader: function(){
		//Extending loader	
		//Overriding onLoadFailure for getting error message
		var baseFunction = Ext.Loader.onLoadFailure;
		Ext.Loader.onLoadFailure = function() {
			baseFunction();
			
							
			var me = this;
			var msg = 'Error found loading:';
			
			//building msg
			Ext.each(
				me.urls, 
				function(prEl){
					msg += '</br>' + prEl;
					Ext.log.error("[DIRECTO.Error] Url not found [" + prEl + "]");
				}
			);

			if (!Ext.Msg.isHidden()) return;
			Ext.Msg.alert('Loader Error', msg);
		};			
	}
	
});

/*
* End
*/