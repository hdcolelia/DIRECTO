/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic component
//it will be mixed in all components
Ext.define(
	'DIRECTO.LIB.base.component', 
	{
	    extend: 'Ext.Class',
		alias: 'DIRECTO.component',
		
		//Base configuration
	    componentType: 'class',
	    
	    setType: function(prType){
			var me = this;
			me.componentType = prType;
		}		
	}
);

/*
* End
*/