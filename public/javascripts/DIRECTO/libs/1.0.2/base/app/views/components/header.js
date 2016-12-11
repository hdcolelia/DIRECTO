/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.views.components.header',
	{
	    extend: 'Ext.toolbar.Toolbar', 
	    requires: [
			'DIRECTO.LIB.panels.components.headerButton'
	    ],
        
	    xtype: 'baseHeaderPanel',
	    cls: 'DIRECTO-dash-dash-headerbar shadow',
	    appHasNavigator: true,
	    height: 64,

	    //logo object
	    logo: null,
	    logoCollapsed: false,

	    //Base Config
	    //region: 'north',
	    pageLogo: 'logo.png', 
	    pageTitle: 'DIRECTO - Base App',

	    //init
	    initComponent: function(){
	        var me = this;
	        //calling parent
	        me.callParent();
	        //Adding items
	        me.setItems();
	    },
		
	    //Used for adding items
	    //The default items are...
	    setItems: function(){
	        var me = this;
	        //Logo
	        me.logo =  me.add({
	            xtype: "component",
	            cls: "DIRECTO-logo",
	            html: '<div class="main-logo"><img src="' + DIRECTO.INFO.PATHS.app + '/style/images/logo.png">DIRECTO</div>',
	            width: 250
	        });

            //adding navigatror switcher if required
	        if (me.appHasNavigator) { me.addNavSwitcher(); }
	        DIRECTO.APP.APPLICATION.headerPanel = me;
	    },

	    addNavSwitcher: function () {
	        var me = this;
	        me.add({
	            xtype: 'button',
	            cls: 'navSwitcher',
	            margin: "0 0 0 8",
	            iconCls: "x-fa fa-navicon",
	            handler: me.switchNav,
	            scope: me
	        });
	    },

	    switchNav: function(){
	        var me = this;
	        var nav = DIRECTO.APP.APPLICATION.navPanel;
	        var mainPanel = DIRECTO.APP.APPLICATION.containerPanel;
            
	        var widthToSet = me.logoCollapsed ? 250 : 64;
	        me.logo.animate({
	            dynamic: true,
	            to: {
	                width: widthToSet
	            }
	        });
	        me.logoCollapsed = !me.logoCollapsed;

	        if (!me.logoCollapsed) {
	            nav.setMicro(false);
	        }

	        nav.width = widthToSet;
	        mainPanel.updateLayout({
	            isRoot: true
	        });
	        nav.on({
	            afterlayoutanimation: function () {
	                nav.setMicro(me.logoCollapsed);
	                mainPanel.updateLayout({
	                    isRoot: true
	                });
	            },
	            single: true
	        })
	    },

        addModuleButton: function(prButton){
			var me = this;
			var pos = me.items.length - 1;
			me.insert(pos, prButton);
		}	

	}
);

/**
* End
*/
