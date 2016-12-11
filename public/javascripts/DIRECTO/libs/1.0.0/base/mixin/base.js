/* 
* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: 
*/
//Defining generic functions
Ext.define(
    'DIRECTO.LIB.base.mixin.base',
    {
        //datos
        moduleName: '',
        operationName: '',
        modelName: '',

        //last message
        lastMessage: '',

        //Init mixin
        mxnInit: function () {
            var me = this;
            //for every mixin class call
            Ext.Object.each(
                me.mixins,
                function (prKey, prObj, prSelf) {
                    //Initializing the class
                    if (prObj.initClass) { //only if exists
                        if (!prObj.initClass(me)) {
                            //me.fireException('initializing', 'mixinInitClassFailed', me.$className, prObj.$className);
                            return false;
                        }
                    }
                }
            );
        },

        //Called for initializing class
        initClass: function (prParent) {
            DIRECTO.UTILS.registerDirect(prParent);
            return true;
        },

        //Firing exceptions
        fireException: function (prAction, prError) {
            var me = this;
            var action = DIRECTO.LANG.ACTION[prAction] || 'Action [' + prAction + '] not found';
            var message = DIRECTO.LANG.ERROR[prError] || 'Error message [' + prError + '] not found';

            var args = new Array();
            args.push(message);
            for (var i = 2; i < arguments.length; i++) args.push(arguments[i]);

            if (args.length > 1) {
                message = Ext.String.format.apply(me, args);
            }
            //Exception
            DIRECTO.APP.EVENT_MANAGER.fireEvent('appException', action, message);
        },

        //Verifying properties
        verifyProperties: function (prScope) {
            var me = this;

            for (var i = 1; i < arguments.length; i++) {
                //verifying operation data
                if (!prScope[arguments[i]]) {
                    var scopeName = prScope.$className || prScope.id;
                    me.fireException('initializingOperation', 'operationPropertyNotDefined', scopeName, arguments[i]);
                    return false;
                }
            }
            return true;
        }
    }
);

/*
* End
*/