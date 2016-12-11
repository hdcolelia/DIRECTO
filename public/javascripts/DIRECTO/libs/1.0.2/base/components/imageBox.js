/*
    HDC
*/

Ext.define(
	'DIRECTO.LIB.base.components.imageBox',
    {
        extend: 'Ext.Component',
        xtype: 'imageBox',
        width: 64,
        height: 64,
        imageName: 'cogs',
        html: '',
        cls: 'x-panel-header-default x-panel-header-title-default',

        htmlTemplate: '<div class="x-fa fa-{name}" style="font-size: {fontSise}px; width: {width}px; line-height: {height}px; text-align: center;" />',

        initComponent: function () {
            var me = this;

            me.callParent();

            var tpl = new Ext.Template(me.htmlTemplate);

            var html = tpl.apply({
                name: me.imageName,
                fontSise: (me.width > me.height? me.height: me.width) - 15,
                width: me.width,
                height: me.height
            });

            me.setHtml(html);
        },
    }
);




