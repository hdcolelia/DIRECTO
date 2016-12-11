/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.panels.panelDash',
	{
		extend: 'Ext.dashboard.Dashboard',
		requires: [
			''
		],
		//Base Config
		region: 'center',
		columnWidths: [
			0.20,
			0.60,
			0.20
		],

		defineParts: function(){
			var me = this;
			
			me.addPart(
				{
					part01: { 
						viewTemplate: {
							items: [{
								xtype: 'dashPart'
							}]
						}
					}
				}
			);			
		},
				
		addPart: function(prPart){
			var me = this;
			//Asignning default column
			prColumn = prColumn || 1;
			me.add(prPart, { columnIndex: prColumn });
		}
	}
);

/**
* End
*/
