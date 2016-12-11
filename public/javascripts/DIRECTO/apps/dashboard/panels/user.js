/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.APP.panels.user',
	{
		extend: 'DIRECTO.LIB.panels.panelBase',
		requires: [
			'DIRECTO.LIB.base.layouts.crossWindow'
		],
		id: 'panelUser',
		defaultPanel: true,

		//Base Config
		buttonText: 'User Information',	
		layout: 'crossWindow',
		scrollable: 'vertical',
    	items: [
			{
				xtype: 'panel' //,
				//title: 'North West'			
	        },{
				xtype: 'panel',
				//title: 'North South',
			    layout: {
			        // layout-specific configs go here
			        type: 'crossWindow',
			        minWidth: 0,
			        minHeight: 0
			    },					
		    	items: [
					{
						xtype: 'panel',
						title: 'North West'			
			        },{
						xtype: 'panel',
						title: 'North South'
					},{
						xtype: 'panel',
						title: 'South West'
			        }
				]
			},{
				xtype: 'panel' //,
				//title: 'South West'
	        },{
				xtype: 'panel',
				title: 'North West'			
	        }    	    	
    	]		
	}
);

/**
* End
*/
