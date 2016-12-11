/* DIRECTO JS Library 1.0.0
 * Copyright(c) 2011 - DIRECTO.
 * http://www.aysasoft.com
 * required includes: ext-base.js, ext-all.js
 */

Ext.define('DIRECTO.TEMPLATES.profileForm', {
    extend: 'Ext.form.Panel',
    require: 'DIRECTO.TEMPLATES.potField',

    frame: true,
    title: 'Administrar Perfil',
    width: 340,
    bodyPadding: 5,
    height: 250,

    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 90,
        anchor: '100%'
    },
    initComponent: function () {
        var me = this;

        me.createItems();
        //llamando al credor de la clase
        me.callParent();

    },

    createItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                name: 'profileName',
                fieldLabel: 'Nombre del Perfil',
                value: ''
            }, {
                xtype: 'checkboxfield',
                name: 'profileIsAdmin',
                fieldLabel: 'Es admin?',
                boxLabel: 'Es admin?'
            }
        ];

        


    }

});
/**
* End
*/
