/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.modules.installer.op_installer',
	{
	    requires: [
            'DIRECTO.LIB.modules.installer.op_installer_panel',
            'DIRECTO.LIB.base.app.modules.singleOperationViewer.panel'
        ],
	    extend: 'DIRECTO.LIB.base.app.modules.singleOperationViewer.panel',
	    xtype: 'op_installer',

	    itemClass: 'DIRECTO.LIB.modules.installer.op_installer_panel',

	    //adding operations
	    addOperations: function () {
	        var me = this;

            //defining item class
            var currentOp = Ext.create(
                me.itemClass,
                {
                    moduleName: me.moduleName,
                    operationName: me.operationName
                }
            );
            me.add(currentOp);
        }
	}
);

/**
* End
*/
