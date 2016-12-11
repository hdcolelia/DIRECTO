/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.APP.panels.home',
	{
		extend: 'DIRECTO.LIB.panels.panelDash',
		//Base Config
		buttonText: 'Home',
		defaultPanel: false,
		
		defineParts: function(){
			var me = this;
			//Default
			me.dashParts = {
				homePart: 'part.dashPart'
			};		
		},		
		
		defineViews: function(){
			var me = this;
			me.addView({
				type: 'basePart',
				title: 'xbasePart',
				height: 500
			}, 0);

			me.addView({
				type: 'homePart',
				title: 'homePart',
				height: 500
			}, 1);

			me.addView({
				type: 'homePart',
				title: 'homePart 02',
				height: 300,
				pepText: 'image 02'
			}, 0);
		}		
		
	}
);
/**
* End
*/
