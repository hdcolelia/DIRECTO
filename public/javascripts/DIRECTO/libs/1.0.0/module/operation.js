/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define('DIRECTO.LIB.module.operation', {
    extend: 'Ext.panel.Panel',
    mixins: {
        DIRECTOFunctions: 'DIRECTO.LIB.base.mixin.base'
    },
    //propiedades de enlace con el controlador
    moduleName: '',
    operationName: '',
    operationData: null,

    //definimos si se muestra como opción
    operationVisible: false,

    //Base para funciones directas
    DIRECT: {},

    //constructor
    initComponent: function () {
        var me = this;

        //llamando al contructor base
        me.callParent(arguments);

        //Verificamos la configuración
        if (!me.moduleName) {
            me.fireException('initializingOperation', 'moduleNotDefined');
            return false;
        }
        //Verificamos la configuración
        if (!me.operationName) {
            me.fireException('initializingOperation', 'operationNameNotDefined', me.moduleName);
            return false;
        }

        //Direct functions
        DIRECTO.UTILS.registerDirect(me);
        return true;
    },

    //building panel
    buildPanel: function () {
        
    }
});

/*
* End
*/