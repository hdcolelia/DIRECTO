/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.classes.module',
	{
	    //extend: 'Ext.container.Container',
        extend: 'Ext.Class',
	    moduleName: '',
	    modulePanel: null,

	    moduleConfig: {},

	    modulePanelClass: 'DIRECTO.LIB.base.app.modules.operationsViewer.panel',
	    modulePanel: null,

        navItem: null,

        //constructor
        constructor: function () {
            var me = this;
            //getting config
            var arg = arguments[0];
            if (!arg.moduleConfig) {
                Ext.log('module->contructor: No moduleConfig on creator');
                return;
            }
            me.moduleConfig = arg.moduleConfig;
            if (!me.moduleConfig.moduleName) {
                Ext.log('module->contructor: No moduleName on creator');
                return;
            }

            //getting name
            me.moduleName = me.moduleConfig.moduleName;
            DIRECTO.APP.APPLICATION.MODULES[me.moduleName] = me;

            //requiring panel class
            Ext.require(
                me.modulePanelClass,
                function () {
                    //building panel
                    me.modulePanel = Ext.create(
                        me.modulePanelClass,
                        {
                            title: me.moduleConfig.title,
                            itemId: me.moduleConfig.routeId,
                            moduleName: me.moduleName,
                            operations: me.moduleConfig.operations
                        }
                    );

                    //adding navigator item
                    me.addNavItem();
                    //adding panel to main panel
                    DIRECTO.APP.APPLICATION.mainPanel.add(me.modulePanel);
                    //if it is the dafault module then load panel
                    if (me.moduleConfig.isDefault) {
                        //me.navItem.setSelected(true);
                        me.showPanel();
                    }
                },
                me
            );
		},		
		
		//Show me function
		xxxxxxgetModuleConfig: function(){
		    var me = this;

		    me.mask(me.moduleName + '-' + DIRECTO.APP.LANG.get('loading'));

		    //Calling login
		    DIRECTO.APP.CONNECTOR.processRequest({
		        params: {
		            module: me.moduleName,
		            method: 'getConfig'
		        },
		        success: function (prResponse) {
		            me.processConfig(prResponse);
		        }
		    });
		},

	    //processing response for config
		xxxxxxprocessConfig: function (prResponse) {
		    var me = this;
		    DIRECTO.APP.APPLICATION.fireEvent('appException', me.moduleName, DIRECTO.APP.LANG.get('noModuleConfigProcessor'));
		},

        //adding navigator item
		addNavItem: function () {
		    var me = this;
		    //adding item to navigator
		    if (!DIRECTO.APP.APPLICATION.navPanel) { Ext.log('module->addNavItem: no navigator defined'); return; }
		    me.navItem = DIRECTO.APP.APPLICATION.navPanel.addItem(me.moduleConfig);
		},

		showPanel: function () {
		    var me = this;
		    if (!me.modulePanel) {
		        me.fireEvent('appException', DIRECTO.APP.LANG.appStarting, DIRECTO.APP.LANG.moduleNotLoaded);
		        return;
		    }

            //Setting item selected - just in case
		    me.navItem.setSelected(true);

		    //showing panel
		    DIRECTO.APP.APPLICATION.mainPanel.getLayout().setActiveItem(me.moduleConfig.routeId);
		}
	}
);

/**
* End
*/
