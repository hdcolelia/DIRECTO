/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.modules.singleOperationViewer.panel',
	{
	    extend: 'DIRECTO.LIB.base.app.modules.base.panel',
	    requires: [
            'DIRECTO.LIB.base.app.modules.base.panel',
            'DIRECTO.LIB.base.app.modules.singleOperationViewer.item'
	    ],

	    defaultItemClass: 'DIRECTO.LIB.base.app.modules.singleOperationViewer.item',

	    //adding operations
        addOperations: function() {
            var me = this;

            Ext.Object.each(
                me.operations,
                function (prKey, prOperation) {
                    //defining item class
                    var itemClass = prOperation.itemClass || me.defaultItemClass;

                    var currentOp = Ext.create(
                        itemClass,
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
