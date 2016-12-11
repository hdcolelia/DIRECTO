/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/

//Sobreescribiendo 'Ext.direct.Manager.on' se envía mensaje ante excepciones de llamadas directas
Ext.direct.Manager.on(
	'exception',
	function (prEvent, prOptions) {
	    DIRECTO.APP.EVENT_MANAGER.fireEvent('directException');
	    Ext.Msg.show({
	        closable: false,
	        draggable: false,
	        title: 'Llamada directa con error' ,
	        msg: prEvent.message + '<BR>' + 'Exception:' + prEvent.xhr.responseText,
	        //buttons: Ext.Msg.YESNOCANCEL,
	        icon: Ext.Msg.WARNING
	    });
	}
);

//Overriding onFileLoadError for getting error message
Ext.Loader.onFileLoadError = function (prClassName, prFilePath, prErrorMessage, prIsSynchronous) {
    Ext.Loader.numPendingFiles--;
    Ext.Loader.hasFileLoadError = true;
    Ext.Loader.queue.splice(0, Ext.Loader.queue.length);
    Ext.Loader.refreshQueue();

    //Verifiyng the class was loaded
    if (!Ext.ClassManager.isCreated(prClassName)) {
        Ext.log('Direct calling:' + 'No se pudo cargar la clase [' + prClassName + ']. Verificar ruta [' + prFilePath + ']');
        //Ext.log.show();
        return;
    }

    Ext.log('Cargando clase:' + 'La clase [' + prClassName + '] está creada, pero hubo un error. El error es:' + prErrorMessage);
};

//Overriding onFileLoaded for getting error message on error
Ext.Loader.onFileLoaded = function (className, filePath) {
    var me = this;

    var log = '';

    me.numLoadedFiles++;
    me.isFileLoaded[className] = true;
    me.numPendingFiles--;

    if (me.numPendingFiles === 0) {
        me.refreshQueue();
        //Verifing queue
        if (me.queue.length) {
            var tShowLog = false;
            for (var i = 0; i < me.queue.length; i++) {
                if (!Ext.ClassManager.isCreated(me.queue[i].requires.toString())) {
                    log += 'Cargando clase:' + 'No se pudo cargar la clase [' + me.queue[i].requires.toString() + ']</BR>';
                    tShowLog = true;
                }
            }
            //
            Ext.Msg.show({
                closable: false,
                draggable: false,
                title: 'Llamada directa con error',
                msg: log,
                buttons: Ext.Msg.YES,
                icon: Ext.Msg.WARNING
            });
        }
    }
};
/*
* End
*/