/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.modules.operationsViewer.panel',
	{
	    extend: 'Ext.panel.Panel',
	    requires: [
            'DIRECTO.LIB.base.layouts.viewWindow',
            'DIRECTO.LIB.base.layouts.crossWindow',
            'DIRECTO.LIB.base.app.modules.operationsViewer.item'
	    ],
	    //layout: 'viewWindow',
	    layout: 'crossWindow',
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
                        {
                            xtype: 'opViewerItem',
                            title: prOperation.title,
                            moduleName: me.moduleName,
                            operationName: prOperation.operationName
                        }
                    );
                    me.add(currentOp);
                }
            );

        },
		
		//Show me function
		getModuleConfig: function(){
		    var me = this;

		    me.mask(me.moduleName + '-' + DIRECTO.APP.LANG.get('loading'));

		    //Calling login
		    DIRECTO.APP.CONNECTOR.processRequest({
		        params: {
		            module: me.moduleName,
		            method: 'getConfig'
		        },
		        success: function (prResponse) {
		            me.processConfig(prResponse);
		        }
		    });
		},

	    //processing response for config
		processConfig: function (prResponse) {
		    var me = this;
		    /////DIRECTO.APP.APPLICATION.fireEvent('appException', me.moduleName, DIRECTO.APP.LANG.get('noModuleConfigProcessor'));
		}
	}
);

/**
* End
*/
