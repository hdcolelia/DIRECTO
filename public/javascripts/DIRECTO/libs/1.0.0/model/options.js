Ext.define(
	'DIRECTO.LIB.model.options', 
	{
		extend: 'Ext.data.Model',
	    fields: [
	    	{ name: 'moduleName', type: 'string' },
	        { name: 'operationName', type: 'string' },
	        { name: 'icon', type: 'string' },
	        { name: 'text', type: 'string' },
	        { name: 'description', type: 'string' },
	        { name: 'operationClass', type: 'string' }
		]
	}
);
