/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO
* required includes: ext-base.js, ext-all.js
*/
//Defining generic Application
Ext.define(
    'DIRECTO.LIB.modules.base.language',
    {
        //gets language text
        get: function (prKey) {
            var me = this;
            if (me[prKey]) { return me[prKey] };
            return '[' + prKey + ']';
        },

        //Actions
        appStarting: 'starting app',
        navItemLoading: 'Navigating',
        //Messages
        appNoConnector: 'can not create connector module',
        appNoSecurity: 'can not create security module',
        appNoLoader: 'can not create loader module',
        noModuleConfigProcessor: 'Module config processor not defined',
        formNoContainer: 'can not close container',
        gettingConfig: 'Getting configuration',
        invalidFormDataTitle: 'Invalid Data',
        invalidFormData: 'Invalid Data in form',
        invalidConfigTitle: 'Config problem',
        appResultFailure: 'Calling failure',
        loading: 'Loading...',
        wait: 'Please wait...',
        moduleNotLoaded: 'Module not loaded',
        //Secutiry
        changePassRequired: 'You must change your password....',
        //form
        formNoSubmitSuccessHandler: 'Succes handler funcion not defined',
        //buttons
        accept: 'OK',
        cancel: 'Cancel',
        apply: 'Apply',
        chgPass: 'Change Pass',
        next: 'Próximo >>',
        prev: '<< Anterior',
        //style classes
        styles: {
            accept: 'x-fa fa-check',
            cancel: 'x-fa fa-ban',
            chgPass: 'x-fa fa-key'
        }

    }
 );
/*
* End
*/