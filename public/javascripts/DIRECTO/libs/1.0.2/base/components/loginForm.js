/*
HDC
*/
Ext.define(
	'DIRECTO.LIB.base.components.loginForm', 
	{
	    extend: 'DIRECTO.LIB.base.components.form',
	    require: 'DIRECTO.LIB.base.components.form',
	    alias: 'loginForm',

	    //Configs
	    acceptButton: true,

	    //request params
        loginAction: true,
        requestMethod: 'userAction',
	    requestParams: {
	        module: 'MOD_SECURITY',
	        operation: 'OP_USERS',
	        task: 'login'
	    },

	    initComponent: function(){
	        var me = this;
	        me.callParent();
	        me.addStandardButton('chgPass');
	    },

	    chgPassButtonPressed: function () {
	        var me = this;
	        DIRECTO.APP.SECURITY.requestChangePass({
	            message: DIRECTO.APP.LANG.changePassMessage,
	            success: function (form, action) {
	                form.cancelButtonPressed(); 
	            }
	        });
	        return;
	    },

	    items: [{
	        allowBlank: false,
	        fieldLabel: 'User ID',
	        name: 'user',
	        emptyText: 'user id'
	    }, {
	        allowBlank: true,
	        fieldLabel: 'Password',
	        name: 'pass',
	        emptyText: 'password',
	        inputType: 'password'
	    }]
	}
);
		
