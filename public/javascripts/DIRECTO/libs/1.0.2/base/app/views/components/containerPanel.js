/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
    'DIRECTO.LIB.base.app.views.components.containerPanel',
	{
	    extend: 'Ext.panel.Panel',
	    xtype: 'baseMainPanel',
	    id: "main-view-detail-wrap",
        flex: 1,
	    scrollable: "y",
	    layout: {
	        type: 'hbox',
	        align: 'stretchmax',
	        animate: true,
	        animatePolicy: {
	            x: true,
	            width: true
	        }
	    },

        //init
	    initComponent: function() {
	        var me = this;
	        me.callParent();

	        me.buildPage();
	        DIRECTO.APP.APPLICATION.containerPanel = me;
	    },

	    buildPage: function () {
	        var me = this;
            
	    },

	    beforeLayout: function () {
	        var me = this,
                minHeight = Ext.Element.getViewportHeight() - 64;
	        me.minHeight = minHeight;
	        if (DIRECTO.APP.APPLICATION.navPanel) {
	            DIRECTO.APP.APPLICATION.navPanel.setStyle({
	                "min-height": minHeight + "px"
	            });
	            //DIRECTO.APP.APPLICATION.navPanel.navigator.setStyle({
	            //    "min-height": minHeight + "px"
	            //});
	            //////console.log(minHeight);
	            //DIRECTO.APP.APPLICATION.navPanel.navigator.updateLayout();
	        }
	        //me.callParent([arguments]);
	    }
	}
);

/**
* End
*/
