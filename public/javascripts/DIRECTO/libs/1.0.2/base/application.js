/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define('DIRECTO.LIB.base.application', {
    extend: 'Ext.app.Application',
	requires: [
		'DIRECTO.LIB.base.moduleContainer',
		'DIRECTO.LIB.panels.header',
        'DIRECTO.LIB.modules.base.language',
		'DIRECTO.LIB.modules.base.security',
        'DIRECTO.LIB.modules.base.connector',
        'DIRECTO.LIB.modules.base.loader',
        'DIRECTO.LIB.base.app.views.viewportMain'
	],
	
	//Base configuration
    name: 'DIRECTO',
 	pageLogo: 'logo.png', 
 	pageTitle: 'DIRECTO - Base App',
    //Viewport class
 	viewportClass: 'DIRECTO.LIB.base.app.views.viewportMain',
 	viewportConfig: {},

    //Language
 	currentLanguage: 'DIRECTO.LIB.modules.base.language',
	
    //loader class
 	loaderClass: 'DIRECTO.LIB.modules.base.loader',
    
	
	//Main Panel
	mainPanel: null,
	mainPanelClass: 'Ext.panel.Panel',
	mainPanelConfig: {
	    region: 'center',
        layout: 'border',
		defaults: {
			// applied to each contained panel
			bodyStyle: 'padding:10px'
		} /*,
		layout: 'card'
        */
	},	

    //Navigation Panel
	navPanel: null,
	navPanelClass: 'DIRECTO.LIB.panels.navigator', //'Ext.panel.Panel',
	navPanelConfig: {
	    region: 'west',
	    hideCollapseTool: true,
	    width: 250,
	    defaults: {
	        // applied to each contained panel
	        bodyStyle: 'padding:5px'
	    }
	},

	panelsContainerClass: 'DIRECTO.LIB.base.moduleContainer',
    	
    //Open operations container
	APP_CONFIG: {},
    //loaded modules
	MODULES: {},

    //Application Initialization
    launch: function () {
        var me = this;

        //Defining main application for accessing any place
        DIRECTO.APP.APPLICATION = me;

        //adding events
        me.registerEvents();

        //Starting default language
        DIRECTO.APP.LANG = Ext.create(me.currentLanguage, {});
        if (!DIRECTO.APP.LANG) {
            DIRECTO.APP.LANG = Ext.create('DIRECTO.LIB.modules.base.language', {});
        }

        //Starting loader
        DIRECTO.APP.LOADER = Ext.create(me.loaderClass, {});
        if (!DIRECTO.APP.LOADER) {
            me.fireEvent('appException', DIRECTO.APP.LANG.appStarting, DIRECTO.APP.LANG.appNoLoader);
            return;
        }

        //Handling errors
		me.registerMonitoring();        

        //Handling exceptions
        me.addListener('directException', me.appExceptionFired, me);
        me.addListener('appException', me.appExceptionFired, me);

        //Handling app events


        //Creating request manager
        DIRECTO.APP.CONNECTOR = Ext.create('DIRECTO.LIB.modules.base.connector', {});
        if (!DIRECTO.APP.CONNECTOR) {
            me.fireEvent('appException', DIRECTO.APP.LANG.appStarting, DIRECTO.APP.LANG.appNoConnector);
            return;
        }

        //Creating security module
        DIRECTO.APP.SECURITY = Ext.create('DIRECTO.LIB.modules.base.security', {});
        if (!DIRECTO.APP.SECURITY) {
            me.fireEvent('appException', DIRECTO.APP.LANG.appStarting, DIRECTO.APP.LANG.appNoSecurity);
            return;
        }
	
        //Creating viewport
        me.appViewport = Ext.create(
            me.viewportClass,
            me.viewportConfig || {}
        );
        Ext.onReady(function () {
            DIRECTO.APP.APPLICATION.loadApplication();
        });
    },

    registerEvents: function () {
        var me = this;
        me.addListener('appException', me.appExceptionFired, me);
        me.addListener('appLoaded', me.appLoadedFired, me);        
    },   

    //Getting initial configuration
    loadApplication: function () {
        var me = this;

        //Calling login
        DIRECTO.APP.CONNECTOR.processRequest({
            params: {
                module: 'MOD_APPLICATION',
                operation: 'OP_BASE',
                task: 'getConfig'
            },
            success: function (prResponse) {
                me.setAppConfig(prResponse.data);
                me.loadModules();
            }
        });
    },

    //setting app config    
    setAppConfig: function (prConfig) {
        var me = this;
        me.APP_CONFIG = prConfig;
        //setting defaults
        me.APP_CONFIG.requires = me.APP_CONFIG.requires || [];
        me.APP_CONFIG.modules = me.APP_CONFIG.modules || [];
    },

	//load main panels function
	loadModules: function(){
		var me = this;
		//Requires and loads after
		Ext.require(
			me.APP_CONFIG.requires,
			function(){
				//Loading modules
            	Ext.each(
            		me.APP_CONFIG.modules,
            		function (prModule) {
            		    me.loadModule(prModule);
            		}
            	);
			    //Informs that app is loaded
            	Ext.onReady(function () {
            	    me.fireEvent('appLoaded'); 
            	});
			},
			me 
		);
	},
	
	//load module		
	loadModule: function(prModule){
		var me = this;
		var currentModule = Ext.create(
			prModule.moduleClass, 
			{
			    moduleConfig: prModule.config
			}
		);						
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

    //App exception event
    appExceptionFired: function (prProcess, prMessage, prParams) {
        Ext.Msg.show({
            draggable: false,
            title: 'Error en proceso: ' + prProcess,
            msg: prMessage,
            icon: Ext.Msg.ERROR
        });
    },

    //App loaded event
    appLoadedFired: function (prProcess, prMessage, prParams) {
        var me = this;

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
			me.fireEvent(
				'appException', 
				'Error ocurred', 
				'Error msg: ' + prError.msg + '</br>' +
				'- Source: ' + prError.sourceClass + '</br>' +
				'- Method: ' + prError.sourceMethod 					
			);
			return true;					
		};
	}	


    //load application function
    //Start point
    ,xxxloadApplication: function () {
    var me = this;

        //loading components
    me.launchApp();
    }


});

/*
* End
*/