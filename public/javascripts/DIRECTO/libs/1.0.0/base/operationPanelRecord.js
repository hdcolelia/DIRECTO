/*
    operationPanelRecord: Panel utilizado por las operaciones
    HDC
*/
Ext.define('DIRECTO.base.operationPanelRecord', {
    extend: 'Ext.window.Window',
    requires: ['Ext.toolbar.Toolbar'],

    //Defaults
    taskPanelPosition: 'right',
    title: 'Editar registro',
    width: 400,
    height: 300,
    resizable: true,
    closeAction: 'hide',
    modal: true,
    layout: 'fit',

    //Operación asignada
    operation: null,
    operationModel: null,

    //Objetos para armar el panel
    store: null,
    mainPanel: null,
    mainPanelTab: null,
    toolbar: null,
    sourceConfig: null,
    submitFunction: null,
    closefunction: function () {
        var me = this;
        me.close();
    },

    //Direct
    BASE: {},

    initComponent: function () {
        var me = this;

        //iniciando 
        me.callParent();

        //verifying operation
        if (!me.operation) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent(
                'directException',
                'Iniciando operationPanelRecord',
                'No hay operación asignada'
            );
            return false;
        }
        //Definiendo la configuración del source
        me.defineSourceConfig();

        //creating store
        me.store = me.operation.store;

        //Verificamos que existe el store
        if (!me.store) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent(
                'directException',
                'Iniciando operationPanelRecord',
                'No hay un store asignado'
            );
            return false;
        }

        //Registramos las funciones base
        me.registerActions();

        //Llamamos a la función de contrucción de panel y la de 
        //barra de tareas.
        me.buildPanel();
        me.buildTasks();
        //Agrega los botones de la toolbar
        me.buildToolbar();

        //Inserta los items en el panel
        me.constructPanel();
    },

    registerActions: function () {
        var me = this;

        //Registrando las funciones base
        DIRECTO.UTILS.registerDirectFunction(me, 'BASE', 'getPanelConfig');
    },

    //Define la configuración del source
    defineSourceConfig: function () {
        var me = this;
        me.sourceConfig = {};
        //Para cada columna definida configuramos el source
        Ext.each(
            me.operation.operationModel.columns,
            function (prEl) {
                me.sourceConfig[prEl.dataIndex] = {
                    displayName: '[' + prEl.dataIndex + ']'
                };
            }
        );

    },

    //Contruye el panel interno
    buildPanel: function () {
        var me = this;

        //Tab panel para los campos
        me.mainPanelTab = Ext.create(
            'Ext.tab.Panel',
            {
                border: 0 
            }
        );

        me.mainPanel = Ext.create(
            'Ext.form.Panel',
            {
                //bodyPadding: 5,
                defaultType: 'textfield',
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 120,
                    padding: 5
                },
                items: me.mainPanelTab
            }
        );
      

        //Agregamos los campos
        Ext.each(
            me.operation.operationFields,
            function (prEl) {
                var container = Ext.create('Ext.form.FieldContainer', prEl);
                me.mainPanelTab.add(container);
            }
        );

    },

    //contruye la lista de tareas del panel
    buildTasks: function () {
        var me = this;
        me.tasks = [];
        me.addTask('SUBMIT', 'Actualizar', '', function () { me.submitFunction(); });
        me.addTask('CLOSE', 'Cerrar', '', function () { me.closefunction(); });
    },

    //contruye la barra de tareas
    buildToolbar: function () {
        var me = this;

        var tasks = [];
        //Armamos el array para los botones
        Ext.Object.each(
            me.tasks,
            function (key, value, myself) {
                tasks.push(me.tasks[key]);
            }
        );

        me.toolbar = Ext.create(
            'Ext.toolbar.Toolbar',
            {
                items: tasks,
                //region: 'west'
                dock: me.taskPanelPosition
            }
        );
    },


    //construye el panel 
    //IMPORTANTE: es llamada al final de la función intiComponent
    constructPanel: function () {
        var me = this;

        //Agrego el panel
        me.add(me.mainPanel);

        //Agrego la barra de tareas
        me.addDocked(me.toolbar);
//        me.doLayout();
    },

    //Define las tareas habilitadas
    defineEnabledTasks: function (prTaskList) {
        var me = this;
        //Se habilitan las tareas que se pasan por parámetro
        Ext.Object.each(
            prTaskList,
            function (key, value, myself) {
                if (me.tasks[key]) {
                    me.tasks[key].setDisabled(false);
                }
            }
        );
    },

    //agrega una tarea a la lista
    addTask: function (prId, prName, prIcon, prFunction) {
        var me = this;
        me.tasks[prId] = Ext.create('Ext.Button', {
            text: prName,
            handler: prFunction,
            scope: me,
            disabled: true
        });
    },

    setSource: function () {
        //alert('Patente pendiente pendiente pendiente');

    }

});
