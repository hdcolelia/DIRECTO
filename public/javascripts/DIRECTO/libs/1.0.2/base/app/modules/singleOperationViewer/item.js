/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.app.modules.singleOperationViewer.item',
	{
	    requires: 'DIRECTO.LIB.base.components.imageBox',
	    extend: 'Ext.panel.Panel',
	    xtype: 'opViewerItem',
	    border: true,

	    moduleName: '',
	    operationName: '',

	    layout: 'center',

        //toolbar config
	    toolbarDock: 'right',
        toolButtons: [], 

	    toolbar: null,
	    imageBox: null,

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
                    //Config internal panel
                    me.setInternalPanel();
                },
                me,
                {single: true}
            );
	    },

	    //creating toolbar
	    createToolbar: function () {
	        var me = this;

            //var dock = 

	        //create toolbar
	        me.toolbar = Ext.create(
                'Ext.toolbar.Toolbar',
                {
                    dock: 'right',
                    items: me.toolButtons
                }
            );
	        //adding toolbar
	        me.addDocked(me.toolbar);
	    },

	    //Create operation image
	    createImage: function () {
	        var me = this;

	        me.imageBox = Ext.create(
                {
                    xtype: 'imageBox',
                    width: 82,
                    height: 82
                }
            );
	        me.toolbar.insert(0, me.imageBox);
	    },

	    //setting internal panel
	    setInternalPanel: function () {
	        var me = this;
	        me.mask('Internal panel missing');
	    }
	}
);

/**
* End
*/
