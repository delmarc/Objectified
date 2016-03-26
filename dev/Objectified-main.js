/**
* The attempt to make a template engine... you know instead of doing innerHTMLs with everything... and script tag hacks 
* though some may say I am just as guilty
* @namespace window.Objectified
*/

;var Objectified = ( function(globalObj, undefined) {

    var _this = this;

    //  start privates
    function throwOne(text){

        /*if(failSilently){

            console && console.log && console.log(text);

        } else {*/

            throw new Error(text);

        //}

    }

    function extend(propertyToSet, propertyValue, onPrototype){

        var _self = this;

        if(onPrototype){

            _self.prototype[propertyToSet] = propertyValue;

        } else {

            _self[propertyToSet] = propertyValue;

        }

        return _self;

    }
    //  end privates

    function whatAmI(){

        return this.prototype;

    };


    function objectifiedInstance(propertyObj){

        this.instanceProperties = propertyObj;

        return /* just */ this;

    }

    function init(initPropertyObj){

        //var instance = 

        if(initPropertyObj){

            objectifiedInstance.UTILS.extend.call(_this, "instanceProperties", initPropertyObj);

        }

        return objectifiedInstance;

    }


    objectifiedInstance.prototype.UTILS = {
        extend : extend,
        error:{
            throwOne : throwOne
        }
    }

    objectifiedInstance.prototype.objectifiedProperties = {
        baseVersion:"0.8.1",
        atTheTime:{
            song : "Bastard Child",
            artist : "Master P"
        }
    }

    return init(initPropertyObj);

}).call(Objectified || null, window);
