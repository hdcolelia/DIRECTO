/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
    'DIRECTO.APP.views.components.mainPanel',
	{
	    extend: 'Ext.container.Container',
	    xtype: 'mainPanel',
	    flex: 1,
	    scrollable: "y",
	    layout: {
	        type: "hbox",
	        align: "stretchmax",
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
	    },

	    buildPage: function () {
	        var me = this;
	        DIRECTO.APP.APPLICATION.navPanel = Ext.create(
                'DIRECTO.LIB.panels.navigator',
	            {
	                width: 250,
	                expanderFirst: false,
	                expanderOnly: false,
	                navContainer: me,
	                ui: "navigation" //,
	                //listeners: {
	                //    selectionchange: "onNavigationTreeSelectionChange"
	                //}
	            }
            );
	        me.add(DIRECTO.APP.APPLICATION.navPanel);

	        var root = DIRECTO.APP.APPLICATION.navPanel.getStore().getRoot();
            root.appendChild({
	            text: 'DIRECTO 01',
	            iconCls: "x-fa fa-desktop",
	            rowCls: "nav-tree-badge nav-tree-badge-new",
	            viewType: "admindashboard",
	            leaf: true
            });

            var child = root.appendChild({
	            text: 'DIRECTO 03',
	            iconCls: "x-fa fa-desktop",
	            rowCls: "nav-tree-badge nav-tree-badge-new",
	            viewType: "admindashboard",
	            leaf: true
            });

            child.appendChild({
                text: "CHILD APPENDED",
                iconCls: "x-fa fa-desktop",
                rowCls: "nav-tree-badge nav-tree-badge-new",
                viewType: "admindashboard",
                leaf: true
	        });

            root.appendChild({
	            text: 'DIRECTO 02',
	            iconCls: "x-fa fa-desktop",
	            rowCls: "nav-tree-badge nav-tree-badge-new",
	            viewType: "admindashboard",
                leaf: true
	        });

	        
	        DIRECTO.APP.APPLICATION.mainPanel = Ext.create(
                'DIRECTO.LIB.panels.main',
	            {
	                flex: 1
	            }
            );
	        me.add(DIRECTO.APP.APPLICATION.mainPanel);

	    },

	    beforeLayout: function() {
	        var me = this,
                minHeight = Ext.Element.getViewportHeight() - 64;

	        me.minHeight = minHeight;
	        if (DIRECTO.APP.APPLICATION.navPanel) {
	            DIRECTO.APP.APPLICATION.navPanel.setStyle({
	                "min-height": minHeight + "px"
	            });
	        }
	        Ext.container.Container.prototype.beforeLayout.apply(this, arguments)
	    }
	}
);

/**
* End
*/
