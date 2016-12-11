Ext.define(
    'DIRECTO.base.field.options', {
        extend: 'Ext.form.FieldContainer',
        mixins: {
            field: 'Ext.form.field.Field'
        },
        alias: 'widget.field.options',

        width: '100%',
        //height: 200,

        // Arrange fields vertically, stretched to full width
        layout: 'anchor',
        defaults: {
            layout: '100%'
        },

        combineErrors: true,
        msgTarget: 'side',

        //Árbol de opciones
        treeStore: null,
        treePanel: null,
        layout: 'fit',

        initComponent: function () {
            var me = this;

            me.buildField();

            me.callParent();

            me.initField();
        },

        //@private
        buildField: function () {
            var me = this;

            //Construimos el árbol
            me.treeStore = Ext.create('Ext.data.TreeStore', { root: {} });
            me.treePanel = Ext.create(
                'Ext.tree.Panel',
                {
                    store: me.treeStore,
                    rootVisible: false,
                    useArrows: true
                }
            );

            me.items = [me.treePanel];
        },

        getValue: function () {
            var me = this;
            return 'pepe';
        },

        setValue: function (value) {
            var me = this;
            alert('pipi:' + value);
        },

        getSubmitData: function () {
            var me = this,
            data = null;
            if (!me.disabled && me.submitValue && !me.isFileUpload()) {
                data = {},
            value = me.getValue(),
            data[me.getName()] = '' + value ? Ext.Date.format(value, me.submitFormat) : null;
            }
            return data;
        },

        getFormat: function () {
            var me = this;
            return (me.dateField.submitFormat || me.dateField.format) + " " + (me.timeField.submitFormat || me.timeField.format)
        }
    });