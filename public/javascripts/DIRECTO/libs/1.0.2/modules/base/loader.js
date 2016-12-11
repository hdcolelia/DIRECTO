/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define(
    'DIRECTO.LIB.modules.base.loader',
    {
        //Module Initialization
        constructor: function () {
            var me = this;
        },

        create: function (prClass, prParams, prSuccess, prScope) {
            var mask = new Ext.LoadMask(
                {
                    msg: DIRECTO.APP.LANG.wait,
                    target: DIRECTO.APP.APPLICATION.appViewport
                }
            );

            mask.show();
            Ext.require(
                prClass,
                function(){
                    prSuccess();
                    mask.hide()
                },
                prScope
            );
        }
    }
);

/*
* End
*/