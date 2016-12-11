Ext.define(
    'DIRECTO.base.store', {
    extend: 'Ext.data.Store',
    model: null,
    autoload: true,
    directModule: '',
    directFunction: '',

    //Redefining constructor
    constructor: function () {
        var me = this;

        me.proxy = {
            type: 'direct',
            directFn: DIRECTO.DIRECT_OPERATIONS[me.directModule][me.directFunction],
            reader: {
                type: 'json',
                root: 'data',
                messageProperty: 'message',
                totalProperty: 'total'
            }
        };

        me.callParent();

        //Defining exception callback
        me.optionsStore.getProxy().on('exception', DIRECTO.APP.APPLICATION.direcStoreException);
    }
});