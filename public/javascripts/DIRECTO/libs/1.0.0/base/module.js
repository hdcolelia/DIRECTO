/*
HDC
*/
Ext.define('DIRECTO.base.module', {
    extend: 'Ext.app.Controller',

    //direct configuration
    directModule: '',
    directDefined: false,

    //Manejo de datos del controlador
    modelName: '',
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
        me.getModel();

    },

    getModel: function () {
        var me = this;

        //Getting model
        me.DIRECT.getModel(
            {
                module: me.directModule,
                model: me.modelName
            },
            function (prResult) {
                //If no success then show error
                if (!prResult.success) {
                    DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Obteniendo modelo', 'Ha ocurrido el error: ' + prResult.message );
                    return false;
                }

                //Definiendo modelo de datos

                //Creando store
                me.store = DIRECTO.UTILS.createStore(me.directModule, me.getData, prModel);

                                
            }
        );
    },

    defineDirect: function () {
        var me = this;

        var DirectDefinition = {
            url: "directBase/callDirectFunction",
            type: "remoting",
            namespace: me,
            actions: {
                "DIRECT": [
                    {
                        name: 'getModel',
                        params: ['module', 'model']
                    },{
                        name: 'getData',
                        params: ['module']
                    }
                ]
            }
        };

        //Agregando la referencia a los controladores
        Ext.direct.Manager.addProvider(DirectDefinition);

    }
});
