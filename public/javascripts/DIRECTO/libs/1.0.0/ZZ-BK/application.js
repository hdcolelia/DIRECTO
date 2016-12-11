/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define('DIRECTO.LIB.base.application', {
    extend: 'Ext.app.Application',
    require: ['DIRECTO.model.options'],

    name: 'DIRECTO',
    
 	pageLogo: 'logo.png', 
 	pageTitle: 'DIRECTO - Base App',
 	   
    viewport: null,

    //Paneles de la aplicación
    panelHeader: null,
    panelBody: null,
    panelOptionsContainer: null,
    panelStatus: null,

    //Open operations container
    MODULES: {},

    //Store para opciones
    store: null,
    model: null,

    //direct functions container
    DIRECT: {},

    //Inicia el controlador
    launch: function () {
        var me = this;

        //Definimos la aplicación como global
        DIRECTO.APP.APPLICATION = me;

        //Handling errors
        Ext.Error.handle = me.handleErrors;

        //Manejando excepciones y eventos
        DIRECTO.APP.EVENT_MANAGER.addListener('directException', me.appExceptionFired, me);
        DIRECTO.APP.EVENT_MANAGER.addListener('appException', me.appExceptionFired, me);
        DIRECTO.APP.EVENT_MANAGER.addListener('operationLoadSuccess', me.operationLoadSuccess, me);
        DIRECTO.APP.EVENT_MANAGER.addListener('operationLoadFailed', me.operationLoadFailed, me);

        //Registering direct functions
        me.registerDirectFunctions();

        //Create the main page
        me.createViewport();

        //Creamos el panel header
        me.createHeader();

        //Creamos el panel que contiene las opciones a procesar
        me.createBodyPanel();

        //Creamos el panel que contiene las opciones a procesar
        me.createStatusPanel();

        //Arma la vista
        if (me.panelHeader) me.viewport.add(me.panelHeader);
        if (me.panelBody) me.viewport.add(me.panelBody);
        if (me.panelStatus) me.viewport.add(me.panelStatus);

        me.loadModules();

    },

    //Registering direct functions
    registerDirectFunctions: function () {
        var me = this;
        
        //Direct functions
        DIRECTO.UTILS.registerDirect(me);
    },

    //Creating main page
    createViewport: function () {
        var me = this;
        me.viewport = Ext.create(
            'Ext.Viewport',
            {
                autoShow: true,
                layout: 'border'
            }
        );
    },

    //Creating header panel
    createHeader: function () {
        var me = this;

        me.panelHeader = Ext.create(
            'Ext.toolbar.Toolbar',
            {
                region: 'north',
                enableOverflow: true,
                items: [
                    {
                        id: 'app-header',
                        xtype: 'box',
                        style: {
         					fontSize: '30px',
         					textAlign: 'center'
        				},
                        html: me.pageTitle || DIRECTO.INFO.pageTitle
                    },
                    '->',
                    {
                        xtype: 'image',
                        src: 'images/' + me.pageLogo,
                        height: 64,
                        width: 64
                    }
                ]
            }
        );

    },

    //Creating body panel
    createBodyPanel: function () {
        var me = this;

        me.panelOptionsContainer = Ext.create(
            'Ext.panel.Panel',
            {
                title: 'Inicio',
                collapsible: true,
                region: 'center',
                margins: '0 0 0 0',
                defaults: {
					header : {
						titleAlign: 'center',
						cls: 'moduleTitle',
						height: 50
					}
				},
			    layout: {
			        type: 'accordion',
			        titleCollapse: true,
			        animate: true,
			        activeOnTop: false
			    }
            }
        );


        //Defining tabmodule
        me.panelBody = Ext.create(
            'Ext.tab.Panel',
            {
                region: 'center',
                xtype: 'tabpanel',
                items: me.panelOptionsContainer,
                rbar: [
                    {
                        xtype: 'button',
                        text: '',
                        tooltip: 'Refrescar las opciones habilitadas...',
                        iconCls: 'x-tbar-loading',
                        handler: function (c, t) {
                            me.loadModules();
                        },
                        scope: me
                    }
                 ]
            }
        );

    },

    createStatusPanel: function () {
        var me = this;

        me.panelStatus = Ext.create('Ext.ux.StatusBar', {
            // defaults to use when the status is cleared:
            defaultText: 'Sin mensaje',
            defaultIconCls: 'default-icon',

            // values to set initially:
            text: 'Seleccione una operación',
            iconCls: 'ready-icon',
            region: 'south'
        });
    },

    //Carga de módulos
    loadModules: function () {
        var me = this;

        //Iniciamos el store
        //        me.store.removeAll();

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
    }
});

/*
* End
*/