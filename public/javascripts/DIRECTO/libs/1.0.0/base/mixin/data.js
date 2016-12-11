/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/

//Defining generic module
Ext.define('DIRECTO.base.mixin.data', {
    //propiedades de enlace con el controlador
    directModule: '',
    directOperation: '',

    //Operaciones
    BASE: {}, //para funciones directas de módulo
    OPERATIONS: [],

    //Flag para determinar si se escucha la carga de las operaciones
    listeningOperations: false,

    init: function () {
        var me = this;

        //Verificamos la configuración
        if (!me.directModule) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Iniciando módulo', 'No se ha definido el nombre del módulo');
            return false;
        }

        //Storing on controllers list
        DIRECTO.APP.MODULES[me.directModule] = me;

        //Defining direct functions
        me.defineDirect();

        //adding loaded event
        me.addEvents({
            moduleLoadReady: true,
            moduleLoadFailed: true
        });

        //Cargando operaciones
        me.loadOperations();

        //Getting operations
        if (!Ext.isArray(me.directOperations)) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Iniciando operaciones', 'El módulo [' + me.directModule + '] no tiene operaciones asociadas');
            return false;
        }
    },

    //Definiendo operaciones directas
    defineDirect: function () {
        var me = this;
        DIRECTO.UTILS.registerDirectModuleFunction(me, 'getOperations');

    },

    loadOperations: function () {
        var me = this;
        var operationObj;

        //Limpio las operaciones
        me.OPERATIONS = [];

        me.BASE.getOperations(
            {
                module: me.directModule
            },
            function (prResult) {
                //si hay error mostramos el mensaje
                if (!prResult.success) {
                    DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Iniciando operaciones', 'El módulo [' + me.directModule + '] obtuvo el error: ' + prResult.message);
                    return false;
                }
                //Creamos las operaciones
                Ext.Object.each(
                    prResult.data,
                    function (prKey, prObject) {
                        //Requerimos la clase por las dudas
                        Ext.syncRequire(prObject.operationClass);

                        //Verificamos que exista
                        if (!Ext.isDefined(prObject.operationClass)) {
                            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Iniciando operaciones', 'La clase [' + prObject.operationClass + '] no ha sido cargada');
                            return false;
                        }

                        //Creamos las operación
                        operationObj = Ext.create(
                            prObject.operationClass,
                            prObject
                        );
                        //Agregamos la operación a la lista
                        me.addOperation(operationObj);
                    }
                );


            }
        );

    },

    addOperation: function (prOperation) {
        var me = this;

        //Si fue creado lo iniciamos
        me.OPERATIONS.push(prOperation);
        //Lo inicio si no es nulo
        if (prOperation) {
            //esperando que se cargue la operación
            prOperation.addListener('operationLoadReady', me.operationLoaded, me);
            prOperation.addListener('operationLoadFailed', me.operationFailed, me);

            //Iniciamos el controlador
            if (!prOperation.init()) return false;

            //Iniciamos el proceso de la operación
            //Lo hacemos fuera del init para que tome los eventos
            prOperation.initOperation();
        }
    },

    operationLoaded: function (prOperationName) {
        var me = this;
        //si estamos escuchando seguimos sinó espera
        if (!me.listeningOperations) return;

        Ext.each(
            me.OPERATIONS,
            function (prEl) {
                if (!prEl.loadedOK) return;
            }
        );

        //Enviamos mensaje de éxito
        me.fireEvent('moduleLoadReady');
    },

    operationFailed: function (prOperationName, prMessage) {
        var me = this;
        //Enviamos mensaje de error
        me.fireEvent('moduleLoadFailed', 'Error cargando módulo. La operación [' + prOperationName + '] no ha sido cargada');
    }
});

/*
* End
*/