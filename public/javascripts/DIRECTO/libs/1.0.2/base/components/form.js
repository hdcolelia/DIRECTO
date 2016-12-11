/*
HDC
*/
Ext.define(
	'DIRECTO.LIB.base.components.form',
	{
	    extend: 'Ext.form.Panel',
	    alias: 'formBase',

	    //Configs
	    frame: true,
	    bodyPadding: 15,

	    defaults: {
	        anchor: '100%'
	    },

	    defaultType: 'textfield',

	    buttonsScale: 'medium',

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
	    requestModule: '',
	    requestOperation: '',
	    //actions of form
	    requestActionLoad: 'TK_Load',
	    requestActionSave: 'TK_Save',
        requestModel: '',
	    //used for calling request
        requestParams: null,

	    //constructor
	    initComponent: function(){
	        var me = this;
	        //creating url - must be before to callParent
	        me.url = me.requestUrl + '/' + me.requestController + '/' + me.requestMethod;

	        //init parent
	        me.callParent();

	        me.on('actionFailed', me.requestFailed);

	        //creating toolbar
	        me.createToolbar();
            //Definning fields
	        me.defineFields();
	    },

	    //setting request params
	    setRequestParams: function(prTask, prData) {
	        var me = this;
	        me.requestParams = {
	            module: me.requestModule,
	            operation: me.requestOperation,
	            task: prTask || me.requestActionLoad,
	            model: me.requestModel,
                data: prData || ''
	        };
	    },


	    //Create toolbar
	    createToolbar: function () {
	        var me = this;
	        me.toolbar = Ext.create({
	            xtype: 'toolbar',
	            defaults: {
	                scale: me.buttonsScale,
	                textAlign: 'left',
                    iconAlign: 'left'
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
	            tooltip: DIRECTO.APP.LANG[prButton],
	            //text: DIRECTO.APP.LANG[prButton],
	            //iconCls: "x-fa fa-check",
	            //iconCls: me.buttonsScale + "_" + prButton,
	            iconCls: DIRECTO.APP.LANG.styles[prButton],
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

	    //overriding load
	    load: function(prOptions) {
	        var me = this;

	        //apply task load to params
	        me.setRequestParams(me.requestActionLoad);
	        me.form.setConfig({ baseParams: me.requestParams });
	        me.callParent(); 
	    },


	    //on request failed
	    requestFailed: function ( prThis , prAction , prOpts) {
	        var me = this;
            
	        var message = prAction.result.message;

	        Ext.Msg.alert('Error on ' + prAction.failureType, message);
	    },

	    //definning fields
	    defineFields: function(){
	        var me = this;
	    },

	    //adding a field
	    addField: function (prFieldConfig) {
	        var me = this;
            
	    },

	    setContainer: function(prContainer){
	        var me = this;
	        me.formContainer = prContainer;
	    },

	    //processing request
	    processRequest: function (isApply) {
	        var me = this;

	        //verifiyng if is valid
	        if (!me.verifyValid()) return;

	        //setting request data
	        me.baseParams = me.requestParams;
	        me.baseParams.data = Ext.encode(me.getForm().getValues());

	        me.submit(
                {
                    baseParams: me.baseParams,
                    waitMsg: DIRECTO.APP.LANG.wait,
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
                        var message = '';
                        //solo una prueba
                        if (!action.result) return;


                        if (action.result) {
                            message = action.result.message;
                        } else {
                            message = action.response.responseText;
                        }

                        Ext.Msg.show({
                            draggable: false,
                            title: DIRECTO.APP.LANG.appResultFailure,
                            msg: message,
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

