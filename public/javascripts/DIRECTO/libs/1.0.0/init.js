/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.onReady(function () {
	//Init Paths
	Ext.Loader.setPath('DIRECTO.LIB', DIRECTO.INFO.DIRECTOLibPath);
	Ext.Loader.setPath('DIRECTO.APP', DIRECTO.INFO.DIRECTOAppPath);	
	
	
    //Adding utils
    Ext.syncRequire('DIRECTO.LIB.utils.utils');
    DIRECTO.UTILS = Ext.create('DIRECTO.LIB.utils.utils', {});
	
	//Monitoring
	DIRECTO.UTILS.registerMonitoring();
	DIRECTO.UTILS.overrideLoader();
	
	//Defining getBaseconfig function
	DIRECTO.UTILS.registerDirect(DIRECTO);

    DIRECTO.DIRECT.callModuleFunction(
        { 
            module: 'APPMODULE',
            functionName: 'getBaseConfig'
        }, 
        function (prResult) {
            //Verifying success
            if (!prResult.success) {
                Ext.Msg.alert('Status', 'Error loading app. The error is:' + prResult.message);
                return;
            }

            //Definiendo rutas para DIRECTO
            Ext.Object.each(
                prResult.data.paths, 
                function(key, value, myself) {
                    Ext.Loader.setPath(key, value);
                }
            );

            //Adding requires
            Ext.syncRequire(prResult.data.requires);

            //Requiring App
            Ext.syncRequire("DIRECTO.APP.APPLICATION");
        }
    );
});
/**
* End
*/

