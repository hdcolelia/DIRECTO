/*
HDC
*/
Ext.define(
	'DIRECTO.LIB.base.components.panel',
	{
	    extend: 'Ext.panel.Panel',
	    alias: 'widget.panelBase',

        //base config
	    MODULE: '',
        OPERATION: '',

	    //Configs
	    frame: true,
	    bodyPadding: 5,
	    layout: 'border',
        toolbarDock: 'top',

	    defaultActionButtons: [
            { actionType: 'REFRESH', enabled: false, icon: 'refresh' },
            { actionType: 'SAVE', enabled: false, icon: 'save' },
            { actionType: 'EDIT', enabled: false, icon: 'edit' },
            { actionType: 'REMOVE', enabled: false, icon: 'remove' },
            { actionType: 'OK', enabled: false, icon: 'accept' },
            { actionType: 'CANCEL', enabled: false, icon: 'cancel' },
            { actionType: 'APPLY', enabled: false, icon: 'apply' }
	    ],
	    actionButtons: [],

	    //constructor
	    initComponent: function(){
	        var me = this;
	        me.callParent();

	        me.addStateEvents('buttonPressed');
	        me.createToolbar();
	        me.on('afterrender', me.getConfig, me);
	    },

	    //getting config
	    getConfig: function(){
	        var me = this;
	        me.mask(DIRECTO.APP.LANG.get('gettingConfig'));
            DIRECTO.APP.CONNECTOR.processRequest({
                params: {
                    module: me.MODULE,
                    operation: me.OPERATION,
                    task: 'getConfig'
                },
                success: function (prResponse) {
                    alert(prResponse.message);
                    var me = this;
                },
                noSuccess: function (prResponse) {
                    alert(prResponse.message);
                    var me = this;
                },
                requestLogin: false
            });	
	    },

	    //Create toolbar
	    createToolbar: function() {
            var me = this;
            me.toolbar = Ext.create({
                xtype: 'toolbar',
                dock: me.toolbarDock,
                defaults: {
                    handler: function (prButton) {
                        me.fireEvent('buttonPressed', prButton.actionType);
                    }
                }
            });
	        //adding buttons
            me.addDocked(me.toolbar);
        },

        //adding buttons
        addButton: function(prConfig) {
            var me = this;
            me.toolbar.add(prConfig);
        }
    }
);

