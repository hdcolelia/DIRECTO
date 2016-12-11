/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.classes.operation',
	{
	    moduleName: '',
	    operationName: '',

        //constructor
        initOperation: function () {
            var me = this;
            me.getConfig();
		},		
		
		//Show me function
        getConfig: function () {
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
		    DIRECTO.APP.APPLICATION.fireEvent('appException', me.moduleName, DIRECTO.APP.LANG.get('noModuleConfigProcessor'));
		}
	}
);
/**
* End
*/
