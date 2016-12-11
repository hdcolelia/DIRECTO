/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.APP.views.components.header',
	{
	    extend: 'Ext.toolbar.Toolbar', 
	    requires: [
			'DIRECTO.LIB.panels.components.headerButton'
	    ],
	    xtype: 'headerPanel',
	    cls: 'DIRECTO-dash-dash-headerbar shadow',
	    height: 64,

	    //logo object
	    logo: null,
        logoCollapsed: false,

	    //Base Config
	    region: 'north',
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
			
	        var titleLength = (me.pageTitle.length * 10) + 50;

	        //Logo
	        me.logo =  me.add({
	            xtype: "component",
	            cls: "DIRECTO-logo",
	            html: '<div class="main-logo"><img src="' + DIRECTO.INFO.PATHS.app + '/style/images/logo.png">DIRECTO</div>',
	            width: 250
	        });

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
	        var mainPanel = DIRECTO.APP.APPLICATION.mainPanel;
            
	        var widthToSet = nav.microMode ? 250 : 64;
	        me.logo.animate({
	            dynamic: true,
	            duration: 15,
	            to: {
	                width: widthToSet
	            }
	        });
	        nav.navContainer.updateLayout({
	            isRoot: true
	        });

	        nav.toggleMicro();
	        return;


	        if (Ext.isIE9m || !Ext.os.is.Desktop) {
	            Ext.suspendLayouts();
	            me.logo.setWidth(widthToSet);
	            nav.setWidth(widthToSet);
	            nav.setMicro(setMicro);
	            Ext.resumeLayouts();
	            mainPanel.layout.animatePolicy = mainPanel.layout.animate = null;
	            mainPanel.updateLayout()
	        } else {
	            if (!setMicro) {
	                nav.setMicro(false)
	            }
	            me.logo.animate({
	                dynamic: true,
	                to: {
	                    width: widthToSet
	                }
	            });
	            nav.width = widthToSet;
	            mainPanel.updateLayout({
	                isRoot: true
	            });
	            nav.el.addCls("nav-tree-animating");
	            if (setMicro) {
	                nav.on({
	                    afterlayoutanimation: function() {
	                        nav.setMicro(true);
	                        nav.el.removeCls("nav-tree-animating")
	                    },
	                    single: true
	                })
	            }
	        }
	    },

	    xxxswitchNav: function () {
	        var me = this;

	        var nav = DIRECTO.APP.APPLICATION.navPanel;

	        var setMicro = !nav.getMicro();

	        //var j = this,
            //    k = j.getReferences(),
            //    i = k.navigationTreeList,
            //    l = k.mainContainerWrap,
            //    h = !i.getMicro();
	        var widthToSet = setMicro ? 64 : 250;
            //
            if (!setMicro) {
                nav.setMicro(false)
            }
	        me.logo.animate({
	            dynamic: true,
	            to: {
	                width: widthToSet
	            }
	        });
	        nav.animate({
	            dynamic: true,
	            to: {
	                width: widthToSet
	            }
	        });
	        nav.setMicro(setMicro);
	        return;
	        //nav.el.addCls("nav-tree-animating");
	        //if (isMicro) {
	        //        nav.on({
	        //            afterlayoutanimation: function () {
	        //                nav.setMicro(true);
	        //                nav.el.removeCls("nav-tree-animating")
	        //            },
	        //            single: true
	        //        })
	        //    }
	        //}
	    },

	    xxxswitchNav: function() {
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
