/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.panels.panelCard',
	{
	    extend: 'Ext.panel.Panel',
	    xtype: 'panelCard',

	    activeItem: 0, // index or id

		//Base Config
		width: 350,
		height: 450,

	    //layout 
		layout: 'card',

	    //objects
        panelToolbar: null,

		//Init
		initComponent: function () {
		    var me = this;
		    me.callParent();

		    //create bar (default at bottom)
            //for managing the wizard
		    me.createToolbar();
		    //adding toolbar
		    me.addDocked(me.panelToolbar);
		    //Enabling buttons
		    me.checkEnableButtons();
		},

	    //create bar (default at bottom)
	    //for managing the wizard
		createToolbar: function () {
		    var me = this;
            //Previus button
		    me.prevButton = Ext.create(
                'Ext.button.Button',
                {
                    text: DIRECTO.APP.LANG.get('prev'),
                    disabled: true,
                    handler: function () {
                        var layout = me.getLayout();

                        var action = function () {
                            me.getLayout().prev();
                            me.checkEnableButtons();
                        }
                        var currentItem = layout.getActiveItem();
                        if (currentItem.mustValidate) {
                            currentItem.validatePanel(action);
                            return;
                        }
                        action();
                    }
                }
            );
		    //Next button
		    me.nextButton = Ext.create(
                'Ext.button.Button',
                {
                    text: DIRECTO.APP.LANG.get('next'),
                    disabled: true,
                    handler: function () {
                        var layout = me.getLayout();

                        var action = function () {
                            me.getLayout().next();
                            me.checkEnableButtons();
                        }
                        var currentItem = layout.getActiveItem();
                        if (currentItem.mustValidate) {
                            currentItem.validatePanel(action);
                            return;
                        }
                        action();
                    }
                }
            );

		    me.panelToolbar = Ext.create(
                'Ext.toolbar.Toolbar',
                {
                    dock: 'bottom',
                    defaults: {
                        scale: 'large'
                    },
                    items: [
                        '->',
                        me.prevButton,
                        me.nextButton
                    ]
                }
            );
		},

	    //checking for enabling buttons
		checkEnableButtons: function () {
		    var me = this;
		    //current layout
		    var layout = me.getLayout();

		    //if no items then disable all buttons
		    if (!layout.activeItemCount) {
		        me.enableButtons(false, false);
		        return;
		    }
		    //getting active item
		    var item = layout.getNext();
		    //if item is first item
		    if (!item) { //current is last
		        me.enableButtons(true, false);
		        return;
		    }
		    //if item is last item
		    var item = layout.getPrev();
		    if (!item) { //current is first
		        me.enableButtons(false, true);
		        return;
		    }
		    me.enableButtons(true, true);
		},

	    //enabling buttons
		enableButtons: function (prPrevEnabled, prNextEnabled) {
		    var me = this;
		    if (prPrevEnabled) { me.prevButton.enable(); } else { me.prevButton.disable(); }
		    if (prNextEnabled) { me.nextButton.enable(); } else { me.nextButton.disable(); }
		}
	}
);

/**
* End
*/
