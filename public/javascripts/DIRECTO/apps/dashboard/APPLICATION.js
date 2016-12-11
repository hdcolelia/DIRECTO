/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.APP.APPLICATION_BASE',
	{
		extend: 'DIRECTO.LIB.base.application', 
		
		//Base Config
		pageLogo: 'logo.png', 
		pageTitle: 'DIRECTO',

	    //Viewport class
//		viewportClass: 'DIRECTO.APP.views.viewportMain',
//		viewportConfig: {},

		xxxloadApplication: function () {
		    var me = this;
		    //Loading navigator
//		    me.navPanel = Ext.create(me.navPanelClass, me.navPanelConfig);
//		    me.appViewport.add(me.navPanel);

		    //Loading Header
		    me.headerPanel = Ext.create('DIRECTO.APP.views.components.header', {});
		    me.appViewport.add(me.headerPanel);

		    //Creating main container
		    var panelMain = Ext.create('DIRECTO.APP.views.components.mainPanel', {});
		    me.appViewport.add(panelMain);

		    //loading components
		    me.launchApp();

		}

	},
	//Creting application
	//Mandatory!!!.
	function(){
		//Creating Application
		DIRECTO.APP.APPLICATION = Ext.create('DIRECTO.APP.APPLICATION_BASE',{});
	}
);

/**
* End
*/
