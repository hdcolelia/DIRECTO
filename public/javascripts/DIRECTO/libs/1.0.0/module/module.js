/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define('DIRECTO.LIB.module.module', {
    extend: 'Ext.panel.Panel',
    requires: 'DIRECTO.LIB.model.options',

    layout: 'border',

    //Operations
    operations: null,

    //determines if module must be shown
    hasVisibleOperations: false,

    //Store para opciones
    store: null,
    model: null,

    //Inicia el controlador
    initComponent: function () {
        var me = this;

        me.callParent();

        //Creamos el store para el manejo de información de opciones habilitadas
        me.createModel();
        me.createStore();

        //Creamos el panel que contiene las opciones a procesar
        me.createBodyPanel();

        //Arma la vista
        if (me.panelBody) me.add(me.panelBody);
    },

    //Creando el modelo para el manejo de opciones
    createModel: function () {
        var me = this;

        //defining the model  
        me.model = 'DIRECTO.LIB.model.options';
    },


    //Creando el store para el manejo de opciones
    createStore: function () {
        var me = this;

        //Definimos el modelo   
        me.store = Ext.create(
            'Ext.data.Store',
            {
                model: me.model,
                data: []
            }
        );

        //Adding operations to panel
        var operationsArray = Ext.Object.getValues(me.operations);
        Ext.each(
        	operationsArray,
        	function (prEl) {
        	    if (prEl.operationVisible) {
        	        me.store.add(prEl);
        	        me.hasVisibleOperations = true;
        	    }
        	}
        );

    },

    //Creación del panel de opciones
    createBodyPanel: function () {
        var me = this;

        //defining template
        var optionTpl = Ext.create(
            'Ext.XTemplate',
            '<tpl for=".">',
                '<div class="operation x-unselectable">',
                    '<img width="120" height="120" src="{icon}" />',
                    '<strong>{text}</strong>',
                    '<span>{operationTitle}</span>',
                '</div>',
            '</tpl>'
        );


        me.panelBody = Ext.create(
            'Ext.view.View',
            {
                region: 'center',
                layout: 'border',
                store: me.store,
                tpl: optionTpl,
                trackOver: true,
                //id: 'mainOptions',
                cls: 'operationsView',
                itemSelector: '.operation',
                overItemCls: 'operationHover',
                selectedItemCls: 'operationSelected',
                multiSelect: true,
                autoScroll: true,
                emptyText: 'Sin opciones habilitadas',
                listeners: {
                    itemdblclick: {
                        fn: DIRECTO.APP.APPLICATION.openOperation,
                        scope: DIRECTO.APP.APPLICATION
                    },
                    itemmouseenter: {
                        fn: DIRECTO.APP.APPLICATION.itemMouseEnter,
                        scope: DIRECTO.APP.APPLICATION
                    },
                    itemmouseleave: {
                        fn: DIRECTO.APP.APPLICATION.itemMouseLeave,
                        scope: DIRECTO.APP.APPLICATION
                    }
                }
            }
        );
    }

});

/*
* End
*/