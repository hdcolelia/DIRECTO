/* DIRECTO JS Library 1.0.0
 * Copyright(c) 2011 - DIRECTO.
 * http://www.aysasoft.com
 * required includes: ext-base.js, ext-all.js
 */

Ext.define('DIRECTO.TEMPLATES.micmacManager', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.layout.container.Border'
    ],

    optionsStore: null,
    autoShow: true,

    layout: 'border',

    initComponent: function () {
        var me = this;

        me.optionsStore = Ext.create('DIRECTO.store.options', {});
        me.optionsStore.getProxy().on('exception', function (reader, response, error, eOpts) {
            Ext.Msg.show({
                closable: false,
                draggable: false,
                title: 'Error obteniendo datos',
                msg: response.result.message,
                icon: Ext.Msg.WARNING
            });
        });

        var optionTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="module-option-item" ',
					' unselectable="on"',
				' >',
					'<tpl if="this.hasIcon(icon)">',
						'<img src="{icon}" width="24px" height="24px" />',
					'<tpl else>',
						'<img src="Scripts/DIRECTO/libs/styles/defaults/icons/moduleOption.png" width="24px" height="24px" />',
					'</tpl>',
					'<div unselectable="on">',
						'{name}',
					'</div>',
				'</div>',
			'</tpl>', {
			    hasIcon: function (prIcon) {
			        return prIcon;
			    }
			}
        );

        me.items = [
            {
                region: 'north',
                html: '<h1 class="x-panel-header">SYTG - CALIDAD</h1>',
                border: false,
                margins: '0 0 5 0'
            }, {
                region: 'west',
                collapsible: true,
                title: 'Opciones',
                width: 150,
                split: true,
                items: {
                    xtype: 'dataview',
                    store: me.optionsStore,
                    tpl: optionTpl,
                    trackOver: true,
                    cls: 'module-option',
                    itemSelector: '.module-option-item',
                    overItemCls: 'module-option-item-hover',
                    emptyText: 'Sin opciones habilitadas',
                    listeners: {
                        itemdblclick: me.openOption,
                        scope: me
                    }
                }
            }, {
                region: 'center',
                xtype: 'tabpanel' // TabPanel itself has no title
            }
        ];
        //llamando al credor de la clase
        me.callParent();

        me.optionsStore.load();
    },

    openOption: function (prThis, prRecord, prItem, prIndex, prEe, eOpts) {
        alert('Option seleccionada: ' + prRecord.data.name);
    }

});
/**
* End
*/
