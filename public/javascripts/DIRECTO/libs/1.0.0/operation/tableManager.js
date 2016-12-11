/*
    HDC
*/
Ext.define('DIRECTO.LIB.operation.tableManager', {
    extend: 'DIRECTO.LIB.operation.tableListing',

    alias: 'widget.tableManager',

    //Ventana de edición de registros
    recordWindow: null,

    buildPanel: function () {
        var me = this;
        me.mainPanel = Ext.create(
            'Ext.grid.Panel',
            {
                forceFit: true,
                columns: me.operation.operationColumns,
                store: me.store,
                region: 'center',
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 2,
                        isCellEditable: function(record, columnHeader) {
                            var me = this,
                                context = me.getEditingContext(record, columnHeader);

                            if (me.grid.view.isVisible(true) && context) {
                                columnHeader = context.column;
                                record = context.record;
                                if (columnHeader && me.getEditor(record, columnHeader)) {
                                    return true;
                                }
                            }
                        }
                    })
                ]
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

    //contruye la lista de tareas del panel
    buildTasks: function () {
        var me = this;
        me.tasks = {};

        //Agregamos los botones posibles para esta operación
        me.addTask('ADD', 'Agregar', '', me.addRecord);
        me.addTask('EDIT', 'Editar', '', function () { alert('Editar'); });
        me.addTask('DELETE', 'Eliminar', '', function () { alert('Eliminar'); });
        me.addTask('CONFIG', 'Configurar', '', function () { alert('Configurar'); });
    },

    addRecord: function () {
        var me = this;
        if (!me.recordWindow) { me.contructRecordWindow(); };

        me.recordWindow.defineEnabledTasks({ CLOSE: true, SUBMIT: false });

        me.recordWindow.setSource(
            {
                "id": "Identificador",
                "role_name": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                "role_is_admin": false,
                "role_enabled": .01
            }
        );

        me.recordWindow.show();
    },

    contructRecordWindow: function () {
        var me = this;
        me.recordWindow = Ext.create(
            'DIRECTO.base.operationPanelRecord',
            {
                operation: me.operation,
                submitFunction: function () {
                    me.submit();
                }
            }
        );
    }
});
