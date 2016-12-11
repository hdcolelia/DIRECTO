/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: 
*/
//Defining tablePanel mixer
Ext.define(
    'DIRECTO.LIB.base.mixin.tablePanel',
    {
        //Objects
        parent: null,
        modelDef: null,
        model: null,
        store: null,
        grid: null,

        //Create components
        initClass: function (prParent) {
            var me = this;

            //Assigning parent
            me.parent = prParent;

            //Verifying properties
            if (!prParent.verifyProperties(
                prParent,
                'operationData'
            )) { return false; }
            if (!prParent.verifyProperties(
                prParent.operationData,
                'operationModel'
            )) { return false; }
            if (!prParent.verifyProperties(
                prParent.operationData.operationModel,
                'columns',
                'formFields',
                'model'
            )) { return false; }

            //Creating model
            me.modelDef = prParent.operationData.operationModel;
            me.createModel();
            //Creating store
            me.createStore();
            //Creating grid
            me.createGrid();

            me.store.load();

            return true;
        },

        //creating model
        createModel: function () {
            var me = this;
            me.model = Ext.define(me.modelDef.model.name, me.modelDef.model);
        },

        //Creatinfg store
        createStore: function () {
            var me = this;
            //Creating store
            me.store = Ext.create(
                'Ext.data.Store',
                {
                    model: me.model.getName(),
                    autoload: true,
                    proxy: {
                        type: 'direct',
                        directFn: me.parent.DIRECT.callOperationFunction,
                        extraParams: {
                            module: me.parent.moduleName,
                            operation: me.parent.operationName,
                            functionName: 'getData',
                            params: {
                                model: me.modelDef.model.name
                            }
                        },
                        reader: {
                            type: 'json',
                            rootProperty: 'data',
                            messageProperty: 'message',
                            totalProperty: 'total'
                        },
                        listeners: {
                            exception: DIRECTO.APP.APPLICATION.direcStoreException
                        }

                    }
                }
            );
        },

        //Creating grid
        createGrid: function () {
            var me = this;
            me.grid = Ext.create(
                'Ext.grid.Panel',
                {
                    forceFit: true,
                    columns: me.modelDef.columns,
                    store: me.store,
                    region: 'center'
                }
            );

            me.parent.add(me.grid);
        }
    }
);

/*
* End
*/