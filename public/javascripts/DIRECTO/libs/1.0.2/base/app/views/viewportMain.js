/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.views.viewportMain',
	{
	    extend: 'Ext.container.Viewport',
        requires: 'DIRECTO.LIB.base.app.views.components.header',
        cls: 'sencha-dash-viewport',
		itemId: 'mainView',
		layout: {
		    type: 'vbox',
		    align: 'stretch'
		},

	    //Components
        //Header
	    headerPanel: null,
	    headerPanelClass: 'DIRECTO.LIB.base.app.views.components.header',
	    headerPanelConfig: {},
	    //Main Panel
	    mainPanel: null,
	    mainPanelClass: 'DIRECTO.LIB.base.app.views.components.mainPanel',
	    mainPanelConfig: {},
	    //Navigation Panel
	    navPanel: null,
	    navPanelClass: 'DIRECTO.LIB.base.app.views.components.navigator',
	    navPanelConfig: {},
	    //Container Panel
	    containerPanel: null,
	    containerPanelClass: 'DIRECTO.LIB.base.app.views.components.containerPanel',
	    containerPanelConfig: {},

	    //init
		initComponent: function () {
		    var me = this;
		    me.callParent();
            
		    var requires = [];
		    requires.push(me.headerPanelClass);
		    requires.push(me.containerPanelClass);
		    requires.push(me.navPanelClass);
		    requires.push(me.mainPanelClass);

		    Ext.require(
                requires,
                function () {
                    //buildingh page
                    me.buildPage();
                    //fired loaded app event
                    //DIRECTO.APP.APPLICATION.fireEvent('appLoaded');
                },
                me
            );
		},

        //building
		buildPage: function () {
            var me = this;
		    //Loading Header
            me.headerPanel = Ext.create( me.headerPanelClass, me.headerPanelConfig);
            me.add(me.headerPanel);

            //Loaing container panel
            me.containerPanel = Ext.create(me.containerPanelClass, me.containerPanelConfig);
            me.add(me.containerPanel);
	            //Loading Navigation Panel
	            me.navPanel = Ext.create(me.navPanelClass, me.navPanelConfig);
	            me.containerPanel.add(me.navPanel);
	            //Loading main Panel
	            me.mainPanel = Ext.create(me.mainPanelClass, me.mainPanelConfig);
	            me.containerPanel.add(me.mainPanel);
		},
        
		//load module		
		loadModule: function(prModule){
		    var me = this;
		    var currentModule = Ext.create(
                prModule.moduleClass,
                prModule.config
            );
		    //adding item to navigator
		    me.navPanel.addItem({
		        text: prModule.config.moduleName,
		        viewType: prModule.config.viewType,
		        routeId: prModule.config.routeId,
                moduleName: prModule.config.moduleName
		    });

            //adding module
		    me.mainPanel.add(currentModule);
		}
	}
);
/**
* End
*/
