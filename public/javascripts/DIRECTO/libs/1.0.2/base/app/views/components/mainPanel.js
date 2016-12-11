/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.views.components.mainPanel',
	{
	    extend: 'Ext.panel.Panel',
        flex: 1,
	    cls: "sencha-dash-right-main-container",
	    layout: {
	        type: "card",
	        anchor: "100%"
	    },
        
	    items: [],

        //init
	    initComponent: function() {
	        var me = this;
	        me.callParent();

	        DIRECTO.APP.APPLICATION.addListener('appLoaded', me.appLoaded, me);

	        var maskingCard = Ext.create(
                'Ext.panel.Panel',
                {
                    itemId: 'maskingItem',
                    xtype: 'panel'
                }
            );

	        me.add(maskingCard);
	        me.getLayout().setActiveItem('maskingItem');

	        maskingCard.on(
                'afterlayout',
                function () {
                    maskingCard.getEl().mask(DIRECTO.APP.LANG.wait);
                }
            );

	        DIRECTO.APP.APPLICATION.mainPanel = me;
	    },

        //called when app is loaded
	    appLoaded: function () {
	        var me = this;
	        var item = me.getLayout().getActiveItem();
	        if(!item.itemId == 'maskingItem') { return };

	        if (me.items.length > 1) {
	            me.getLayout().setActiveItem(1);
	        }
	    }


	}
);
/**
* End
*/
