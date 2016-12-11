/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: init.js
*/
Ext.onReady(
    function () {
        DIRECTO.LANG = {
            ERROR: {
                moduleNotDefined: 'No se ha definido el nombre del módulo',
                operationNameNotDefined: '[{0}] - No se ha definido el nombre de la operación',
                operationPropertyNotDefined: '[{0}=>{1}] - No se ha definido la propiedad',
                mixinInitClassFailed: '[{0}=>{1}] - Falló al iniciar mixin',

            },
            ACTION: {
                initializing: 'Iniciando',
                initializingModule: 'Iniciando Módulo',
                initializingOperation: 'Iniciando Operación',
                initializingTask: 'Iniciando Tarea'
            }
        };
    }
);

/**
* End
*/

