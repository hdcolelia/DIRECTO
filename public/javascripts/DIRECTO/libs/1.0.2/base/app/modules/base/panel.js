/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.modules.base.panel',
	{
	    extend: 'Ext.panel.Panel',
	    requires: [
            'DIRECTO.LIB.base.app.modules.base.item'
	    ],
	    layout: 'fit',
        
	    itemClass: 'DIRECTO.LIB.base.app.modules.base.item',

	    moduleName: '',
        operations: [],

        //constructor
        initComponent: function () {
            var me = this;
            me.callParent();
            
            //adding operations
            //me.addOperations();

            //Adding getting config after render
            me.on('afterlayout', me.addOperations, me, { single: true });
        },

	    //adding operations
        addOperations: function() {
            var me = this;
            Ext.Object.each(
                me.operations,
                function (prKey, prOperation) {
                    var currentOp = Ext.create(
                        me.itemClass,
                        {
                            title: prOperation.title,
                            moduleName: me.moduleName,
                            operationName: prOperation.operationName
                        }
                    );
                    me.add(currentOp);
                }
            );

        }
	}
);

/**
* End
*/
