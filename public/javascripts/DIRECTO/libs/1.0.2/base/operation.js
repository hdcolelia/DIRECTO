/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.operation',
	{
        //base variables
	    moduleName: '',
	    operationName: '',

        //panel object
	    panel: null,
        panelClass: 'Ext.panel.Panel',

        //constructor
        constructor: function () {
            var me = this;
            me.callParent();
            //creating panel
            me.createPanel();
		},		
        
	    //creates panel for operation
        createPanel: function () {
            var me = this;
            me.panel = Ext.create(me.panelClass, {});
        }

		
	}
);

/**
* End
*/
