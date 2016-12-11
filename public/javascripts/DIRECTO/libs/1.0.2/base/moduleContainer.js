/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.moduleContainer',
	{
		extend: 'Ext.panel.Panel',
		requires: [
			'DIRECTO.LIB.panels.components.headerButton'
		],
		//Base Config
		buttonText: 'mobuleButton',
		region: 'center',
		defaultModule: false,
		border: true,
		layout: 'border',
		style: {
			padding: 10
		},
		//Initialization
		initComponent: function(){
			var me = this;
			//Init
			me.callParent();
			
		    //Adding to main
			me.addToMain();
		},
		
		//Add Panle to main panel
		addToMain: function(){
			var me = this;
			//Creating button
			me.mainButton = Ext.create(
				'DIRECTO.LIB.panels.components.headerButton',
				{
					text: me.buttonText,
					handler: me.showMe,
					scope: me
				}
			);

			//Init
			DIRECTO.APP.APPLICATION.headerPanel.addModuleButton(me.mainButton);
			DIRECTO.APP.APPLICATION.mainPanel.add(me);
		},		
		
		//Show me function
		showMe: function(){
			var me = this;
			DIRECTO.APP.APPLICATION.mainPanel.setActiveItem(me);			
		}
	}
);

/**
* End
*/
