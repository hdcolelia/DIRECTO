/*
HDC
*/
Ext.define('DIRECTO.base.controller', {
    extend: 'Ext.app.Controller',

    //direct configuration
    directModule: '',
    directDefined: false,

    //defining operations
    OPERATIONS: {
        BASE: {}
    },

    //Direct environment
    DIRECT: null,

    //Manejo de datos del controlador
    modelName: '',
    model: null,
    store: null,

    //Funciones vacías que serán redefinidas por la definición de direct
    getModel: null,
    getData: null,

    loadedOK: false,

    init: function () {
        var me = this;

        //If no web controller then ends
        if (!me.directModule) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Iniciando Módulo', 'No hay un módulo web asignado');
            return false;
        }

        //defining direct calling
        me.defineDirect();

        //Obteniendo modelos
        if (!me.modelName) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Iniciando Modelo', 'No hay un modelo asignado');
            return false;
        }
        me.configureModelAndStore();


        //Storing on controllers list
        DIRECTO.APP.CONTROLLERS[me.directModule] = me;
    },

    configureModelAndStore: function () {
        var me = this;

        //Getting model
        me.OPERATIONS.BASE.getModel(
            {
                module: me.directModule,
                model: me.modelName
            },
            function (prResult) {
                //If no success then show error
                if (!prResult.success) {
                    DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Obteniendo modelo', 'Ha ocurrido el error: ' + prResult.message);
                    return false;
                }

                //Definiendo modelo de datos
                Ext.define(prResult.data.name, prResult.data);
                me.modelName = prResult.data.name;

                //Creando store
                me.store = DIRECTO.UTILS.createStore(me.directModule, me.OPERATIONS.BASE.getData, me.modelName);

            }
        );
    },

    defineDirect: function () {
        var me = this;

        //registering direct functions    
        DIRECTO.UTILS.registerDirectFunction(me.OPERATIONS, 'BASE', 'getModel', ['model']);
        DIRECTO.UTILS.registerDirectFunction(me.OPERATIONS, 'BASE', 'getData');

    }
});
