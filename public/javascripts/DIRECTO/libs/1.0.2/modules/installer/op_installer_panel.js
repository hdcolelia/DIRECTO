/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.modules.installer.op_installer_panel',
	{
	    requires: 'DIRECTO.LIB.base.panels.panelCard',
	    extend: 'DIRECTO.LIB.base.app.modules.singleOperationViewer.item',
	    xtype: 'op_installer_panel',
	    title: 'Installer DB Form',
	    bodyPadding: 5,

        //forms
        dbForm: null,

	    //setting internal panel
	    setInternalPanel: function () {
	        var me = this;

	        var loadButton = Ext.create(
                'Ext.button.Button',
                {
                    text: 'Load',
                    handler: me.loadForms,
                    scope: me
                }
            );

	        var submitButton = Ext.create(
                'Ext.button.Button',
                {
                    text: 'Accept',
                    handler: me.submitForms,
                    scope: me
                }
            );

	        me.dbForm = Ext.create({
	            xtype: 'op_installer_dbForm',
	            requestModule: 'MOD_INSTALLER',
	            requestOperation: 'OP_INSTALLER',
	            requestActionSave: 'TK_DBConfig',
	            requestActionLoad: 'TK_DBConfigLoad',
                requestModel: 'DBConfig'
	        });

	        var form = Ext.create(
                'DIRECTO.LIB.base.panels.panelCard',
                {
                    //Base Config
                    width: 550,
                    height: 400,                   
                    
                    items: [
                        me.dbForm,
                        {
                            xtype: 'panel',
                            html: 'pindorchis'
                        },
                        {
                            xtype: 'panel',
                            html: 'ponchis'
                        },
                        {
                            xtype: 'panel',
                            html: 'chis'
                        }
                    ]
                }
            );

	        form.panelToolbar.insert(0, submitButton);
	        form.panelToolbar.insert(0, loadButton);
	        me.add(form);

            //load forms current values
	        me.loadForms();

	    },

	    //submitting forms
	    loadForms: function(){
	        var me = this;
	        me.dbForm.load();
	    },


	    //submitting forms
	    submitForms: function(){
	        var me = this;
	        alert('submit tu hermana');
	    }
	}
);

//Db Form
Ext.define(
    'DIRECTO.LIB.modules.installer.op_installer_dbForm',
    {
        extend: 'DIRECTO.LIB.base.components.form',
        xtype: 'op_installer_dbForm',
        title: 'Installer DB Form',
        bodyPadding: 5,

        //must validate
        mustValidate: true,

        // Fields will be arranged vertically, stretched to full width
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },

        // The fields
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'Server',
            name: 'serverName',
            allowBlank: false
        }, {
            fieldLabel: 'Database',
            name: 'dbName',
            allowBlank: false
        }],

        //must validate
        validatePanel: function (prAction) {
            var me = this;
            me.processRequest();
        }
    }
);


/**
* End
*/
