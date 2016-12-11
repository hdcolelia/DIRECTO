/*
    HDC
*/
Ext.define(
    'DIRECTO.LIB.operation.tableListing',
    {
        extend: 'Ext.panel.Panel',
        alias: 'widget.tableListing',
        mixins: {
            base: 'DIRECTO.LIB.base.mixin.base',
            tablePanel: 'DIRECTO.LIB.base.mixin.tablePanel'
        },
        
        initComponent: function () {
            var me = this;

            //calling parent constructor
            me.callParent(arguments);

            //Calling contructor on mixins
            me.on('afterrender', function () { me.mxnInit(me) });
        }
    }
);
