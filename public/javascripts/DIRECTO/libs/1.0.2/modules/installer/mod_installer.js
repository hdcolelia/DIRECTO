/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.modules.installer.mod_installer',
	{
	    extend: 'DIRECTO.LIB.base.classes.module',
	    requires: [
            'DIRECTO.LIB.base.classes.module', 
            'DIRECTO.LIB.modules.installer.op_installer'
        ],

	    modulePanelClass: 'DIRECTO.LIB.modules.installer.op_installer'

	}
);

/**
* End
*/
