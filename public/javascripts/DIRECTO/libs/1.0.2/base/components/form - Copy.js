/*
HDC
*/
Ext.define(
	'DIRECTO.LIB.base.components.form',
	{
	    extend: 'Ext.form.Panel',
	    alias: 'formBase',
	    //Configs
        loginAction: false,
	    frame: true,
	    bodyPadding: 5,
	    toolbarDock: 'right',
        buttonsScale: 'medium',
	    defaults: {
	        anchor: '100%'
	    },

	    defaultType: 'textfield',

	    //buttons
	    acceptButton: true,
	    cancelButton: true,
	    applyButton: false,

	    //toolbar
	    toolbar: null,
	    //container
	    formContainer: null,
	    parentType: 'Ext.panel.Panel',

	    //success handler
	    submitSuccessHandler: function () {
	        var me = this;
	        Ext.Msg.show({
	            draggable: false,
	            title: DIRECTO.APP.LANG.invalidConfigTitle,
	            msg: DIRECTO.APP.LANG.formNoSubmitSuccessHandler,
	            icon: Ext.Msg.INFO
	        });
	        return;
	    },
	    //cancel han handler
	    cancelButtonHandler: function () {
	        var me = this;
	        Ext.Msg.show({
	            draggable: false,
	            title: DIRECTO.APP.LANG.invalidConfigTitle,
	            msg: DIRECTO.APP.LANG.formNoContainer,
	            icon: Ext.Msg.INFO
	        });
	        return;
	    },


	    //request params
        requestUrl: '',
	    requestController: DIRECTO.INFO.baseController,
	    requestMethod: DIRECTO.INFO.baseMethod,
	    requestParams: {
	        module: '',
	        operation: '',
	        tasks: '',
	        data: ''
	    },

	    //constructor
	    initComponent: function(){
	        var me = this;
            //init parent
	        me.callParent();
	        //creating url - must be before to callPerent
	        me.url = me.requestUrl + '/' + me.requestController + '/' + me.requestMethod;
	        //Setting params
	        me.baseParams = me.requestParams;

	        me.formContainer = me.findParentByType(me.parentType);

	        //creating toolbar
	        me.createToolbar();
            //Definning fields
	        me.defineFields();
	    },

	    //definning fields
	    defineFields: function(){
	        var me = this;
	    },

	    setContainer: function(prContainer){
	        var me = this;
	        me.formContainer = prContainer;
	    },

	    //Create toolbar
	    createToolbar: function () {
	        var me = this;
	        me.toolbar = Ext.create({
	            xtype: 'toolbar',
	            defaults: {
                    scale: me.buttonsScale
	            },
	            dock: me.toolbarDock
	        });
	        //adding buttons
	        me.addToolbarButtons();

	        //adding toolbar
	        me.addDocked(me.toolbar);
	    },

	    //add toolabr buttons
	    addToolbarButtons: function() {
	        var me = this;
	        //adding buttons
	        if (me.acceptButton) {
	            me.addStandardButton('accept');
	        }
	        //adding buttons
	        if (me.cancelButton) {
	            me.addStandardButton('cancel');
	        }
	        //adding buttons
	        if (me.applayButton) {
	            me.addStandardButton('apply');
	        }
        },

	    //adding buttons
	    addStandardButton: function (prButton) {
	        var me = this;
	        var config = {
	            text: DIRECTO.APP.LANG[prButton],
	            icon: prButton,
	            handler: me[prButton + 'ButtonPressed'],
                scope: me
	        }

	        me.toolbar.add(config);
	    },

        //Accept button
	    acceptButtonPressed: function () {
	        var me = this;

	        me.processRequest(false);
	    },

        //Apply button
	    applyButtonPressed: function () {
	        var me = this;

	        me.processRequest(true);
	    },
        
        //cancel button pressed
	    cancelButtonPressed: function () {
	        var me = this;
	        me.cancelButtonHandler();
	    },

	    //processing request
	    processRequest: function (isApply) {
	        var me = this;

	        //verifiyng if is valid
	        if (!me.verifyValid()) return;

	        //setting request data
	        me.baseParams.data = Ext.encode(me.getForm().getValues());

	        me.submit(
                {
                    success: function (form, action) {
                        //calling after all ok
                        //if success
                        if (!action.result.success) {

                        }

                        me.submitSuccessHandler();
                        //if is not apply then cancel
                        if (!isApply) { me.cancelButtonPressed(); }
                    },
                    failure: function (form, action) {
                        //check if change pass is required
//                        if (action.result.changePassRequired) {
//                            DIRECTO.APP.SECURITY.requestChangePass({
//                                message: action.result.message,
//                                success: function (prResponse) {
//                                    me.submitSuccessHandler();
//                                    //if is not apply then cancel
//                                    if (!isApply) { me.cancelButtonPressed(); }
//                                }
//                            });
//                            return;
//                        }
                        Ext.Msg.show({
                            draggable: false,
                            title: DIRECTO.APP.LANG.appResultFailure,
                            msg: action.result.message,
                            icon: Ext.Msg.INFO
                        });
                    }
                }
            );
	        return;
	    },

        //verifying valid
	    verifyValid: function () {
	        var me = this;
	        //verifiyng if is valid
	        if (!me.isValid()) {
	            Ext.Msg.show({
	                draggable: false,
	                title: DIRECTO.APP.LANG.invalidFormDataTitle,
	                msg: DIRECTO.APP.LANG.invalidFormData,
	                icon: Ext.Msg.INFO
	            });
	            return false;
	        }
	        return true;
	    }

	}
);

