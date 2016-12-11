/*
HDC
*/
Ext.define(
	'DIRECTO.LIB.base.components.window',
	{
	    extend: 'Ext.window.Window',
	    alias: 'windowBase',
	    //Configs
	    toolbar: null,
	    tbButtons: null,



	    //constructor
	    initComponent: function () {
	        var me = this;
	        me.callParent();
	        me.addStateEvents('buttonPressed');
	        me.createToolbar();
	    },

	    //Create toolbar
	    createToolbar: function() {
	        var me = this;
	        me.toolbar = Ext.create({
                xtype: 'toolbar',
                dock: 'rigth',
                defaults: {
                    handler: function (prButton) {
                        me.fireEvent('buttonPressed', prButton.actionType);
                    }
                }
	        });
            //adding buttons
	        me.addButtons();
	        me.addDocked(me.toolbar);
	    },

	    //adding buttons
	    addButtons: function() {

        }

	}
);

