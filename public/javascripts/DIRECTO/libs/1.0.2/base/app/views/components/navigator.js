/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.views.components.navigator',
	{
	    extend: 'Ext.list.Tree',

	    //Base Config
	    ui: 'navigation',
	    expanderFirst: false,
	    expanderOnly: false,
	    reference: 'navigator',
	    hideCollapseTool: true,
	    width: 250,

	    navigator: null,
        
        rootNode: null,

        constructor: function (config) {
	        var me = this;
	        me.callParent([config]);
	        var store = Ext.create(
                'Ext.data.TreeStore',
                {
                    root: {
                        expanded: true 
                    }
                }
            );

	        me.setStore(store);
	        me.rootNode = store.getRoot();

	        DIRECTO.APP.APPLICATION.navPanel = me;
	        me.addListener('selectionchange', me.onNavigationTreeSelectionChange, me);
	    },

        onNavigationTreeSelectionChange: function (prNav, prItem) {
            var me = this;
            var data = prItem.data;
            if (!DIRECTO.APP.APPLICATION.MODULES[data.moduleName]) {
                me.fireEvent('appException', DIRECTO.APP.LANG.navItemLoading, DIRECTO.APP.LANG.moduleNotLoaded);
                return;
            }

            var module = DIRECTO.APP.APPLICATION.MODULES[data.moduleName];
            var panel = module.showPanel();
        },

        addItem: function(prItemConfig) {
            var me = this;

            //Default config
            var itemConfig = {};
            Ext.apply(itemConfig, prItemConfig);
            //validating iconCls
            if(!itemConfig.iconCls){
                itemConfig.iconCls = "x-fa fa-desktop";
            }

            //applying other configs
            if (!itemConfig.rowCls) {
                itemConfig.rowCls = "nav-tree-badge nav-tree-badge";
            }
            itemConfig.leaf = true;

            Ext.apply(itemConfig, prItemConfig);

            return me.getItem(me.rootNode.appendChild(itemConfig));
        }
	}
);

/**
* End
*/
