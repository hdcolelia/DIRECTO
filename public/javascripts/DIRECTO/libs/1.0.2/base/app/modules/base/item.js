/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.modules.base.item',
	{
	    extend: 'Ext.panel.Panel',
	    xtype: 'opBaseItem',
	    border: true,

	    moduleName: '',
	    operationName: '',

        layout: 'center',

	    toolbar: null,
	    image: null,

	    //constructor
	    initComponent: function () {
	        var me = this;
	        me.callParent();

	        me.on(
                'afterlayout',
                function () {
                    //creating toolbar
                    me.createToolbar();
                    //creating image
                    me.createImage();
                },
                me,
                {single: true}
            );
	    },

	    //creating toolbar
	    createToolbar: function () {
	        var me = this;
	        //create toolbar
	        me.toolbar = Ext.create(
                'Ext.toolbar.Toolbar',
                {
                    dock: 'right',
                    items: [
                        {
                            text: 'Config'
                        }
                    ]
                }
            );
	        //adding toolbar
	        me.addDocked(me.toolbar);
	    },

	    createImage: function () {
	        var me = this;
	        me.image = Ext.create(
                'Ext.Img',
                {
                    src: 'http://www.sencha.com/img/20110215-feat-html5.png',
                    width: 82,
                    height: 82,
                    alt: me.moduleName
                }
            );

	        me.toolbar.insert(0, me.image);
	    }
	}
);

/**
* End
*/
