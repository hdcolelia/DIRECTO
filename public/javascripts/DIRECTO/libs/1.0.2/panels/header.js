/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.panels.header',
	{
	    extend: 'Ext.toolbar.Toolbar', 
	    requires: [
			'DIRECTO.LIB.panels.components.headerButton'
	    ],
	    //Base Config
	    region: 'north',
	    pageLogo: 'logo.png', 
	    pageTitle: 'DIRECTO - Base App',
	    //Other Config
	    height: 60,

	    style: {
	        padding: 0
	    },
	    defaults:{
	        height: 52,
	        width: 52
	    },
	    //init
	    initComponent: function(){
	        var me = this;
	        //Overriding title and logo
	        me.pageLogo = DIRECTO.APP.APPLICATION.pageLogo || me.pageLogo;
	        me.pageTitle = DIRECTO.APP.APPLICATION.pageTitle || me.pageTitle;

	        //calling parent
	        me.callParent();
	        //Adding items
	        me.setItems();
	    },
		
	    //Used for adding items
	    //The default items are...
	    setItems: function(){
	        var me = this;
			
	        var titleLength = (me.pageTitle.length * 10) + 50;
			
	        //Separator
	        //me.add({ xtype: 'tbspacer', width: 20 });
			
	        //Navigator panel control
	        if (DIRECTO.APP.APPLICATION.navPanel) {
	            me.add({
	                xtype: 'button',
	                cls: 'navSwitcher',
	                handler: me.switchNav,
	                scope: me
	            });
	        }

	        //Separator
	        //me.add('->');
	        me.add({xtype: 'tbfill', id: 'initTBHeaderButtons' });
			
	        //Separator
	        me.add({ xtype: 'tbspacer', width: 20, id: 'endTBHeaderButtons' });
	    },

	    switchNav: function() {
	        var me = this;
	        var nav = DIRECTO.APP.APPLICATION.navPanel;
	        nav.toggleMicro();
	        return;

	        var currentWidth = nav.getWidth();

	        nav.animate({
	            to: {
	                width: (currentWidth == 250) ? 52 : 250
	            },
                duration: 100
	        });

	        //nav.toggleCollapse()
	        return;
	        if (!nav.collapsed) {
	            nav.collapse();
	        } else {
	            nav.expand();
	        }
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
