//base module definition

class baseModule {
    get moduleName(){
        return this._moduleName;    
    }

    //Calling a method
    constructor() { 
        var me = this;
        me._moduleName = me.constructor.name;
    }
}

module.exports = baseModule;
