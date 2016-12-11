/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.panels.panelBase',
	{
		extend: 'Ext.panel.Panel',
		//Base Config
		region: 'center',
		
		//Init
		initComponent: function(){
			var me = this;
			me.callParent();
		}		
		
	}
);

/**
* End
*/
