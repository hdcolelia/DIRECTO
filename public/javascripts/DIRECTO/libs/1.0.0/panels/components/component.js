/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.panels.components.component',
	{
		extend: 'Ext.panel.Panel', 
		xtype: 'DIRECTOcomponent',
		//Base Config
		application: '',
		module: '', 
		operation: '',
		//Init
		initComponent: function(){
			var me = this;
			me.callParent();
			if(me.scrollable){
				alert(me.title + ' - ' + me.scrollable)
			};
			
			me.on(
				'resize', 
				function(prThis, prWidth, prHeight, oldWidth, oldHeight, eOpts ){
					var me = this;
					//me.setConfig('html', prWidth);				
				}, 
				me
			);	
		},
			
		//Privates
		privates: {
			getData: function(){
				
			}
		}
	}
);

/**
* End
*/
