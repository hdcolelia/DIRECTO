/*
    HDC
*/
Ext.define('DIRECTO.operation.codeEditor', {
    extend: 'DIRECTO.base.operationPanel',

    alias: 'widget.codeEditor',

    //Editor object
    editor: null,

    buildPanel: function () {
        var me = this;
        me.mainPanel = Ext.create(
            'Ext.panel.Panel',
            {
                forceFit: true,
                region: 'center',
                style: {
                    margin: 0,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                listeners: {
                    afterlayout: function () {
                        me.createEditor(); 
                    }
                }                              

            }
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
        me.addTask('CONFIG', 'Configurar', '', function () { me.createEditor(); });
    },

    createEditor: function () {
        var me = this;

        me.editor = ace.edit(me.mainPanel.id + "-body"); //aceEditor");
        me.editor.setTheme("ace/theme/cobalt");
        me.editor.session.setMode("ace/mode/vgl");
        me.editor.setFontSize(20);
    }
});
