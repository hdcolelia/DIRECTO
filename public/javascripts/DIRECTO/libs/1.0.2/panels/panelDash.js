/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.panels.panelDash',
	{
		extend: 'Ext.dashboard.Dashboard',
		
		requires: [
			'DIRECTO.LIB.panels.panelBase',
			'DIRECTO.LIB.base.components.dashPart'
		],
		
		privates: {
			createParts: function(){
				var me = this;
				if(!me.parts){ me.parts = {}; }
				Ext.Object.each(me.dashParts, function(key, value, myself) {
					var partConfig = Ext.create(value, {}); //We assume that is created
					var part = {};
					part[key] = partConfig;
					me.applyParts(part, me.parts);
				});
			}
		},
		
		//Base Config
		region: 'center',
		maxColumns: 2,
		columnWidths: [
			0.60,
			0.40
		],
		dashParts: null,
		parts: {
			basePart: { 
				viewTemplate: {
					items: [{
						xtype: 'panel',
						html: 'Not configured'
					}]
				}
			}
		},	
				
		initComponent: function(){
			var me = this;
			me.callParent();
			//Part definning -- must be before of defineViews
			me.defineParts();
			me.createParts();
			//Dashboard building
			me.defineViews();
		},
		
		defineParts: function(){
			var me = this;
			//Default
			//me.dashParts = {
			//	basePart: 'part.dashPart'
			//};		
		},
		
		defineViews: function(){
			//Default
			me.addView(
				{
					type: 'basePart',
					title: 'Dashboard Not defined',
					height: 100
				}, 
				0
			);		
		}
	}
);

/**
* End
*/
