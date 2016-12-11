/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.panels.header',
	{
		extend: 'Ext.toolbar.Toolbar', 
		requires: [
			'DIRECTO.LIB.panels.components.headerButton'
		],
		//Base Config
		region: 'north',
		pageLogo: 'logo.png', 
		pageTitle: 'DIRECTO - Base App',
		//Other Config
		height: 80,
		//cls: 'pageHeader',
		style: {
			padding: 0
		},
		defaults:{
			height: 40
		},
		//init
		initComponent: function(){
			var me = this;
			me.callParent();
			//Adding items
			me.setItems();
		},
		
		//Used for adding items
		//The default items are...
		setItems: function(){
			var me = this;
			
			var titleLength = (me.pageTitle.length * 10) + 50;
			
			//Separator
			me.add({ xtype: 'tbspacer', width: 20 });
			
			//Logo and Title
			me.add({
				xtype: 'panel',
				height: me.height,					
				width: titleLength,									
				style: {
					padding: 0
				},
				cls: 'pageHeaderTitle',
				html: '<img src="' + DIRECTO.INFO.PATHS.style + '/images/' + me.pageLogo +'" height="42" width="42">' + me.pageTitle + ''
			});

			//Separator
			//me.add('->');
			me.add({xtype: 'tbfill', id: 'initTBHeaderButtons' });
			
			//Separator
			me.add({ xtype: 'tbspacer', width: 20, id: 'endTBHeaderButtons' });
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
