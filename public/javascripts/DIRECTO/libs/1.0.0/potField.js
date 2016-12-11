/* DIRECTO JS Library 1.0.0
 * Copyright(c) 2011 - DIRECTO.
 * http://www.aysasoft.com
 * required includes: ext-base.js, ext-all.js
 */

Ext.define('DIRECTO.TEMPLATES.potField', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'potField',

    height: 150,
    width: 150,

    initComponent: function () {
        var me = this;

        //llamando al credor de la clase
        me.callParent();

    }

});
/**
* End
*/
