/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define(
    'DIRECTO.LIB.modules.base.connector',
    {
        //direct functions container
        DIRECT: {},

        //Module Initialization
        constructor: function () {
            var me = this;
            me.callParent();
        },

        //Privates functions
        privates: {
            //Prepare the config
            prepareRequestConfig: function (prConfig) {
                var config = {};
                //Assignning url
                Ext.applyIf(prConfig, { controller: DIRECTO.INFO.baseController });
                Ext.applyIf(prConfig, { method: DIRECTO.INFO.baseMethod });
                config.url = prConfig.url || DIRECTO.INFO.baseUrl;
                config.url += '/' + prConfig.controller + '/' + prConfig.method;

                //Assignning params
                Ext.applyIf(prConfig, { params: {} });
                var params = Ext.encode(prConfig.params);
                params = Ext.util.Base64._utf8_encode(params);
                config.params = Ext.decode(params);

                //Assignning success function
                if (!Ext.isFunction(prConfig.success)) {
                    prConfig.success = function (prResult) {
                        Ext.Msg.show({
                            closable: false,
                            draggable: false,
                            title: 'Configuration error',
                            msg: 'No success function configured on request',
                            icon: Ext.Msg.ERROR
                        });
                    }
                }
                config.success = prConfig.success;

                //Assignning no success function
                if (!Ext.isFunction(prConfig.noSuccess)) {
                    prConfig.noSuccess = function (prResult) {
                        Ext.Msg.show({
                            closable: false,
                            draggable: false,
                            title: 'Configuration error',
                            msg: 'No no success function configured on request.</br>Message received:' + prResult.message,
                            icon: Ext.Msg.ERROR
                        });
                    }
                }
                config.noSuccess = prConfig.noSuccess;


                //Any other config is passed
                config.requestLogin = prConfig.requesLogin || true;
                config.loginAction = prConfig.loginAction || false;

                return config;
            }
        },

        //Processing all requests
        xxxxxxprocessRequest: function (prConfig, prPrepared) {
            var me = this;

            var config;
            if (!prPrepared) {
                config = me.prepareRequestConfig(prConfig);
            } else {
                config = prConfig;
            }

            //Processing
            Ext.Ajax.request({
                cors: true, //for external calling
                url: config.url,
                params: config.params,
                success: function (prResponse, prOpts) {
                    var response = Ext.decode(prResponse.responseText, true);
                    //if not decoded
                    if (!response) {
                        DIRECTO.APP.APPLICATION.fireEvent('appException', me.moduleName , prResponse.responseText);
                        return;
                    }

                    //if success
                    if (response.success) {
                        config.success(response);
                        return;
                    }

                    //verifying change pass required


                    //if needs login
                    //if we are doing login action then do nothing
                    if (!config.loginAction) {
                        if (response.loginRequired) {
                            if (config.requestLogin) {
                                DIRECTO.APP.SECURITY.requestLogin({
                                    message: response.message,
                                    success: function (prLoginInfo) {
                                        //on success calling me again
                                        me.processRequest(config, true);
                                    }
                                })
                            } else {
                                DIRECTO.APP.APPLICATION.fireEvent(
							        'appException',
							        DIRECTO.APP.LANG.invalidConfigTitle,
							        'Failure calling [' + config.url + '] Login required but not requested');
                            }
                            return;
                        }
                    }

                    //Calling no success function if declared
                   config.noSuccess(response);
                },
                failure: function (prResponse, prOpts) {
                    DIRECTO.APP.APPLICATION.fireEvent('appException', 'Process Request', 'Failure calling [' + config.url + ']' || prResponse.responseText);
                }
            });
        },

        //Processing all requests
        processRequest: function (prConfig, prPrepared) {
            var me = this;

            var config;
            if (!prPrepared) {
                config = me.prepareRequestConfig(prConfig);
            } else {
                config = prConfig;
            }

            //Processing
            Ext.Ajax.request({
                cors: true, //for external calling
                url: config.url,
                params: config.params,
                success: function (prResponse, prOpts) {
                    var response = Ext.decode(prResponse.responseText, true);
                    //if not decoded
                    if (!response) {
                        DIRECTO.APP.APPLICATION.fireEvent('appException', 'Process Request', prResponse.responseText);
                        return;
                    }

                    //if success
                    if (response.success) {
                        config.success(response);
                        return;
                    }

                    //if needs login
                    //if we are doing login action then do nothing
                    if (!config.loginAction) {
                        if (response.loginRequired) {
                            if (config.requestLogin) {
                                DIRECTO.APP.SECURITY.requestLogin({
                                    message: response.message,
                                    success: function (prLoginInfo) {
                                        //on success calling me again
                                        me.processRequest(config, true);
                                    }
                                });
                            } else {
                                DIRECTO.APP.APPLICATION.fireEvent(
							        'appException',
							        DIRECTO.APP.LANG.invalidConfigTitle,
							        'Failure calling [' + config.url + '] Login required but not requested');
                            }
                            return;
                        }
                    }

                    //Calling no success function if declared
                   config.noSuccess(response);
                },
                failure: function (prResponse, prOpts) {
                    DIRECTO.APP.APPLICATION.fireEvent('appException', 'Process Request', 'Failure calling [' + config.url + ']' || prResponse.responseText);
                }
            });
        }

    }
);

/*
* End
*/