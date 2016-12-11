/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define(
    'DIRECTO.LIB.modules.base.security',
    {
        //requires
        requires: [
            'DIRECTO.LIB.base.components.loginForm',
            'DIRECTO.LIB.base.components.changePassForm'
        ],

        //Login objects
        loginFormClass: 'DIRECTO.LIB.base.components.loginForm',
        changePassFormClass: 'DIRECTO.LIB.base.components.changePassForm',

        //User information
        userInfo: null,

        //constructor
        constructor: function() {
            var me = this;
            me.callParent();
        },

        //Requesting login information
        requestUserInfo: function (prConfig) {
            var me = this;

            var success = prConfig.success || function (prResult) {
                Ext.Msg.show({
                    draggable: false,
                    title: 'Login Success...',
                    msg: prResult.message,
                    icon: Ext.Msg.INFO
                });
            };

            //Calling login
            DIRECTO.APP.CONNECTOR.processRequest({
                params: {
                    module: 'MOD_SECURITY',
                    operation: 'OP_USERS',
                    task: 'getUserInfo'
                },
                success: success,
                requestLogin: true
            });
        },

        //Login 
        login: function (prConfig) {
            var me = this;
        },

        //creating login form
        createLoginPanel: function (prLoginHandler, prCancelHandler) {
            var me = this;
            //creating form
            var loginForm = Ext.create(me.loginFormClass, {
                border: false,
                width: 450,
                height: 250,
                parentType: 'Ext.window.Window',
                toolbarDock: 'right',
                submitSuccessHandler: prLoginHandler,
                cancelButtonHandler: prCancelHandler
            });

            return loginForm; 
        },

        //creating change pass form
        createChangePassPanel: function (prLoginHandler, prCancelHandler) {
            var me = this;
            //creating form
            var loginForm = Ext.create(me.changePassFormClass, {
                border: false,
                width: 450,
                height: 250,
                toolbarDock: 'right',
                submitSuccessHandler: prLoginHandler,
                cancelButtonHandler: prCancelHandler
            });

            return loginForm;
        },

        //Request Login
        requestLogin: function(prConfig) {
            var me = this;
            //Creating login form
            var loginPanel = me.createLoginPanel(
                function () {
                    prConfig.success();
                    loginWindow.destroy();
                },
                function () {
                    loginWindow.destroy();
                }
            );
            //Creating login window
            var loginWindow = Ext.create(
                'Ext.window.Window',
                {
                    title: prConfig.message,
                    resizable: false,
                    modal: true,
                    closable: false,
                    items: loginPanel
                }
            );
            //shows login window
            loginWindow.show();
        },

        //Request Login
        requestChangePass: function(prConfig) {
            var me = this;
                    //Creating login form
            var loginPanel = me.createChangePassPanel(
                function () {
                    prConfig.success();
                    loginWindow.destroy();
                },
                function () {
                    loginWindow.destroy();
                }
            );
                    //Creating login window
            var loginWindow = Ext.create(
                'Ext.window.Window',
                {
                    title: prConfig.message,
                    resizable: false,
                    modal: true,
                    closable: false,
                    items: loginPanel
                }
            );
            //shows login window
            loginWindow.show();
        }
    }
);

/*
* End
*/