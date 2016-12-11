/*
HDC
*/
Ext.define(
	'DIRECTO.LIB.base.components.changePassForm',
	{
	    extend: 'DIRECTO.LIB.base.components.form',
	    require: 'DIRECTO.LIB.base.components.form',
	    alias: 'changePassForm',

	    //Configs
	    acceptButton: true,

	    //request params
        loginAction: true,
        requestMethod: 'userAction',
	    requestParams: {
	        module: 'MOD_SECURITY',
	        operation: 'OP_USERS',
	        task: 'changePass'
	    },

	    items: [{
	        allowBlank: false,
	        fieldLabel: 'User ID',
	        name: 'user',
	        emptyText: 'user id'
	    }, {
	        allowBlank: true,
	        fieldLabel: 'Current Password',
	        name: 'pass',
	        emptyText: 'password',
	        inputType: 'password'
	    }, {
	        allowBlank: false,
	        fieldLabel: 'New Password',
	        name: 'pass_new',
	        emptyText: 'new password',
	        inputType: 'password'
	    }, {
	        allowBlank: false,
	        fieldLabel: 'Confirm',
	        name: 'pass_confirm',
	        emptyText: 'repeat password',
	        inputType: 'password'
	    }]
	}
);
		
