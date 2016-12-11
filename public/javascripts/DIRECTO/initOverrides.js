/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-all.js
*/
//Overriding Loedar for seeing errors
(function(){
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
})();
/**
* End
*/

