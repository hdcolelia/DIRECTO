/*
    OperationPanel: Panel utilizado por las operaciones
    HDC
*/
Ext.define('DIRECTO.LIB.base.operationPanel', {
    extend: 'Ext.panel.Panel',
    requires: ['Ext.toolbar.Toolbar'],

    //Defaults
    border: true,
    layout: 'border',

    //Operación asignada
    operation: null,

    //Objetos para armar el panel
    mainPanel: null,
    toolbar: null,
    tasks: null,

    //Direct
    BASE: {},

    initComponent: function () {
        var me = this;

        //iniciando 
        me.callParent();

        //verifying controller
        if (!me.operation) {
            DIRECTO.APP.EVENT_MANAGER.fireEvent(
                'directException',
                'Iniciando Table Manager',
                'No hay operación asignada'
            );
            return false;
        }

        //Registramos las funciones base
        me.registerActions();

        //Llamamos a la función de contrucción de panel y la de 
        //barra de tareas.
        me.buildPanel();
        me.buildTasks();
        me.buildToolbar();

        //Inserta los items en el panel
        me.constructPanel();
    },

    registerActions: function () {
        var me = this;

        //Registrando las funciones base
        DIRECTO.UTILS.registerDirectFunction(me, 'BASE', 'getPanelConfig');
        DIRECTO.UTILS.registerDirectFunction(me, 'BASE', 'processTask', ['taskName', 'values']);
    },

    //Contruye el panel interno
    buildPanel: function () {
        var me = this;

        me.mainPanel = Ext.create(
            'Ext.panel.Panel',
            {
                html: 'panel body not defined',
                region: 'center'
            }
        );


    },

    //contruye la lista de tareas del panel
    buildTasks: function () {
        var me = this;
        me.tasks = {};
        //Se habilitan las tareas que se pasan por parámetro
        Ext.Object.each(
            me.operation.operationAllowedTasks,
            function (key, value, myself) {
                me.addStandardTask(key, value);
            }
        );

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
                dock: 'top'
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
        me.addDocked(me.toolbar, 'top');
    },

    //Obtenemos la configuración del panel
    getConfiguration: function () {
        var me = this;
        //Obtenemos la configuración
        me.BASE.getPanelConfig(
            {
                module: me.operation.directModule,
                operation: me.operation.directOperation
            },
            function (prResult) {
                //Configurando
            }
        );
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
    addTask: function (prId, prTaskConfig, prFunction) {
        var me = this;

        if (!prTaskConfig.isOption) { return };

        var config = {
            scope: me,
            handler: prFunction,
            disabled: true,
            scale: 'small',
            iconCls: 'default-button-small'
        };

        Ext.apply(config, prTaskConfig);

        me.tasks[prId] = Ext.create(
            'Ext.Button',
            config
        );
    },

    addStandardTask: function (prKey, prTask) {
        var me = this;
        me.addTask(prKey, prTask, function () { me.callTask(prTask); });
    },

    callTask: function (prTask) {
        var me = this;
        //Procesamos la tarea
        var values = me.getCurrentValues();
        //Si getCurrentValues devuelve false entonces no hacemos nada
        if (!values) { return false; }

        me.BASE.processTask(
            {
                module: me.operation.directModule,
                operation: me.operation.directOperation,
                taskName: prTask.name,
                values: me.getCurrentValues()
            },
            function (prResult) {
                //Resultado de la tarea
                DIRECTO.APP.EVENT_MANAGER.fireEvent(
                    'directException',
                    'Procesando tarea',
                    prResult.message
                );
            }
        );
    },

    //Debe ser sobreescrita
    //La creamos solo para que no cancele la llamada
    //Devuelve un objeto vacio
    getCurrentValues: function () {
        var me = this;

        return {}; //Debe definirse en la clase que heredan a esta. Por defecto no devuelve nada.
    }

});
