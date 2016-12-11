/*
    HDC
*/
Ext.define('DIRECTO.LIB.operation.tableListing', {
    extend: 'DIRECTO.LIB.module.operation',
    requires: [
        'DIRECTO.LIB.module.operation',
        'Ext.toolbar.Toolbar'
    ],
    mixins: {
        DIRECTOFunctions: 'DIRECTO.LIB.base.mixin.tablePanel'
    },
    alias: 'widget.tableListing',

    initComponent: function () {
        var me = this;

        //llamando al contructor base
        me.callParent(arguments);

        //Calling contructor on mixins
        me.on('afterlayout', me.buildPanel);
    },

    buildPanel: function () {
        var me = this;

        me.mask('Loading...');

        //Verifying columns
        if (!me.operationData.operationColumns) {
            me.fireException('initializingOperation', 'operationPropertyNotDefined', 'DIRECTO.LIB.operation.tableListing', 'operationColumns');
            return false;
        }

        me.mainPanel = Ext.create(
            'Ext.grid.Panel',
            {
                forceFit: true,
                columns: me.operation.operationColumns,
                store: me.store,
                region: 'center'
            }
        );
        //Carga los datos
        me.store.load();
    },

    //Contruct panel
    constructPanel: function () {
        var me = this;
        me.callParent();

        me.addDocked(
            Ext.create(
                'Ext.toolbar.Paging', {
                    store: me.store,
                    displayInfo: true,
                    displayMsg: 'Registros {0} - {1} de {2}',
                    emptyMsg: 'No hay registros',
                    dock: 'bottom'
                })
        );
    },

    contructRecordWindow: function () {
        var me = this;
        me.recordWindow = Ext.create(
            'DIRECTO.base.operationPanelRecord',
            {
                operation: me.operation,
                submitFunction: me.submit
            }
        );
    },

    submit: function (prRecord, prTask) {
        alert('submit DIRECTO.operation.tableListing');
    },

    getCurrentValues: function () {
        var me = this;

        var currentSelection = me.mainPanel.getSelectionModel().getSelection();

        //Si no hay selección salimos sin mensaje
        if (currentSelection.length == 0) { return false; }

        //Veriicamso que solo se haya seleccionado 1 registro
        if (currentSelection.length > 1) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Error de selección', 'Solo puede seleccionar un registro para esta operación');
            return false;
        }

        var values = currentSelection[0].getData();

        return values;
    }

});
