/**
* The attempt to make a template engine... you know instead of doing innerHTMLs with everything... and script tag hacks 
* though some may say I am just as guilty
* @namespace window.Objectified
*/

;var Objectified = ( function(globalObj) {

    var baseObjectifiedObj = {};

    function objectifiedInstance(propertyObj){

        this.objectifiedProperties = propertyObj || null;

        this.UTILS = {
            error:{
                throwOne : throwOne
            }
        }

        return this;

    }

    objectifiedInstance.prototype.UTILS = {
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

    //  start privates
    function throwOne(text){

        /*if(failSilently){

            console && console.log && console.log(text);

        } else {*/

            throw new Error(text);

        //}

    }

    function extend(propertyToSet, propertyValue){

        var _self = this;

        _self[propertyToSet] = propertyValue;

        return _self;

    }
    //  end privates


    return {

        init : function(propertyObj){

            objectifiedInstance.call(this, propertyObj);

            return this;

        }

    };

}).call(Objectified || null, window);
