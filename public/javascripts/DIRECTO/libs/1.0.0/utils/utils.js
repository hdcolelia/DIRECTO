Ext.define(
    'DIRECTO.LIB.utils.utils',
    {
    	privates: {
			//direct function registring
	        registerDirectFunction: function (prControllerFunction, prFunctionName, prScope, prTimeout) {
	            //Defining params
	            //by defalt all parameters are defined but not all are  needed
    	        var params = ['module', 'operation', 'task', 'functionName', 'params'];

	            //defining timeout
	            var timeout = 300000;
	            if (Ext.isDefined(prTimeout)) timeout = prTimeout;

	            //Defining direct 
	            var providerDefinition = {
	                url: DIRECTO.INFO.baseDirectUrl + prControllerFunction,
	                type: "remoting",
	                timeout: timeout,
	                namespace: prScope,
	                actions: {
	                	DIRECT : [
	                		{
			                    name: prFunctionName,
			                    params: params							
							}
	                	]
	                }
	            };
	            
	            //Adding provider
	            Ext.direct.Manager.addProvider(providerDefinition);

	        }			
		},
		
    	//Creating store
        createStore: function (prDirectModule, prDirectOperation, prDirectFunction, prModel) {
            //Requiring model
            Ext.syncRequire(prModel);
            if (!Ext.ClassManager.isCreated(prModel)) {
                DIRECTO.APP.EVENT_MANAGER.fireEvent('directException', 'Creación de Store', 'El modelo [' + prModel + '] no existe');
                return null;
            }

            //Creating store
            var tStore = Ext.create(
                'Ext.data.Store',
                {
                    model: prModel,
                    autoload: true,
                    proxy: {
                        type: 'direct',
                        directFn: prDirectFunction,
                        extraParams: {
                            module: prDirectModule,
                            operation: prDirectOperation
                        },
                        reader: {
                            type: 'json',
                            root: 'data',
                            messageProperty: 'message',
                            totalProperty: 'total'
                        }
                    }
                }
            );

            //Defining exception callback
            Ext.onReady(function () {
                tStore.getProxy().on('exception', DIRECTO.APP.APPLICATION.direcStoreException);
            });

            //Returning created store
            return tStore;
        },

        //Module function registring
        registerDirect: function (prScope) {
			//registering DIRECT functions for scope
			//module
			this.registerDirectFunction(
				'callDirectModuleFunction', 
				'callModuleFunction',
				prScope
			);			
			//operation
			this.registerDirectFunction(
				'callDirectOperationFunction', 
				'callOperationFunction',
				prScope
			);			
			//task
			this.registerDirectFunction(
				'callDirectTaskFunction', 
				'callTaskFuncion',
				prScope
			);			
        },	
	
		//Create monitoring
		registerMonitoring: function(){
		    //Adding exception events
			var msgFunction = function(prTitle, prMessage){
	    		var title = prTitle || 'no title';
		   		var msg = prMessage || 'no message';
		    		
		       	if(Ext.Msg.isHidden()){
				    Ext.Msg.show({
				        closable: false,
				        draggable: false,
				        title: title,
				        msg: msg, 
				        icon: Ext.Msg.ERROR
				    });
				}
			};

		    DIRECTO.APP.EVENT_MANAGER.addListener('directException', msgFunction);
		    DIRECTO.APP.EVENT_MANAGER.addListener('appException', msgFunction);
			
			//Add monitoring to exceptions
			Ext.direct.Manager.on(
				'exception',
				function (prEvent, prOptions) {
					var title = 'Exception found';
					var msg = 'no message';
					 
					//building message
					switch(prEvent.code){
						case 'xhr':
							title = prEvent.xhr.statusText;
							msg = prEvent.xhr.responseText;
							break;
						case 'parse':
							msg = prEvent.xhr.responseText;
							break;
						default:
							msg = prEvent.message;
							break;
					}
					
				    DIRECTO.APP.EVENT_MANAGER.fireEvent(
				    	'directException',
				    	title,
				    	msg
				    );
				}
			);
			
			//Handling errors
			Ext.Error.handle = function(prError){
				DIRECTO.APP.EVENT_MANAGER.fireEvent(
					'appException', 
					'Error ocurred', 
					'Error msg: ' + prError.msg + '</br>' +
					'- Source: ' + prError.sourceClass + '</br>' +
					'- Method: ' + prError.sourceMethod 					
				);
				return true;					
			};
		},
		
		//Overriding loader functions
		overrideLoader: function(){
			//Extending loader	
			//Overriding onLoadFailure for getting error message
			var baseFunction = Ext.Loader.onLoadFailure;
			Ext.Loader.onLoadFailure = function() {
				baseFunction();
				
								
				var me = this;
				var msg = 'Error found loading:';
				
				//building msg
				Ext.each(
					me.urls, 
					function(prEl){
					    msg += '</br>' + prEl;
					    Ext.log.error("[DIRECTO.Error] Url not found [" + prEl + "]");
					}
				);

    			if (!Ext.Msg.isHidden()) return;
				Ext.Msg.alert('Loader Error', msg);
			};			
		}

    }
);