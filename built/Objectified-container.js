/**
* The attempt to make a template engine... you know instead of doing innerHTMLs with everything... and script tag hacks 
* though some may say I am just as guilty
* @namespace window.Objectified
*/
;var Objectified = ( function(console, undefined) {

    "use strict";

    var globalRoot = this;

    // this will be mapped to UTILS.error
    function throwOne(errorText){

        throw new Error(errorText);

    }

    // this will be mapped to UTILS.log
    function objectifiedLog(){

        return console && console.log(arguments);

    }

    // this will be mapped to UTILS.extend
    function extend(extendingObjectifiedObject, extendingObjectifiedModuleObject){

        var _self = this;

        for(var moduleName in extendingObjectifiedObject){

            _self.prototype[moduleName] = returnModulePropertyObj(extendingObjectifiedObject,moduleName).call({
                "moduleObject" : extendingObjectifiedModuleObject,
                "oPrototype" : _self.prototype
            });

        }

        return _self;

    }

    function returnModulePropertyObj(extendingObjectifiedObject, moduleName){

        // return crazy here...
        return function(){

            // this is what the call is regarding
            var __module = this;

            return function(){

                // this is once its in the actual module itself..
                var constructorSelf = this;

                return extendingObjectifiedObject[moduleName].apply({
                    "moduleObject" : __module.moduleObject,
                    "instancePropertyModuleObject" : constructorSelf.instancePropertyObject.modulePropertiesObject[moduleName],
                    "oPrototype" : __module.oPrototype
                }, arguments);

            };            

        };

    }

    function initNewObjectifiedInstance(objectifiedInstancePropertyObject){

        var objectified_self = this;

        objectified_self.objectifiedInstancePropertyObject = {
            "failSilently": objectifiedInstancePropertyObject.failSilently || false
        };

        return /* just */ objectified_self;

    }

    function ObjectifiedInstanceConstructor(objectifiedInstancePropertyObject){

        var objectified_self = this,
            instanceObj = objectifiedInstancePropertyObject || {};

        objectified_self.instancePropertyObject = {
            "modulePropertiesObject" : instanceObj.modulePropertiesObject,
            "failSilently" : instanceObj.failSilently || false
        };

        return /* just */ objectified_self;

    }

    // This is what initializes an Objectified instance...
    ObjectifiedInstanceConstructor.init = function(objectifiedInstancePropertyObject){

        return new ObjectifiedInstanceConstructor(objectifiedInstancePropertyObject);

    };

    // Objectified Utils setup...
    ObjectifiedInstanceConstructor.prototype.UTILS = {
        extend : function(){
            var ObjectifiedSelf = this;
            return function(extendingObjectifiedObject, objectifiedModuleProperties){
                return extend.call(ObjectifiedSelf, extendingObjectifiedObject, objectifiedModuleProperties);
            };
        }.call(ObjectifiedInstanceConstructor),
        /*

        I forgot why I was doing this one
        isSameDataType : function(){
            var ObjectifiedSelf = this;
            return function(expectedDataType, passedInDataType){
                objectifiedLog.apply(ObjectifiedSelf, arguments);
            };
        }.call(ObjectifiedInstanceConstructor),

        */
        error : function(){
            var ObjectifiedSelf = this;
            return function(errorText){
                return throwOne.call(ObjectifiedSelf, errorText);
            };
        }.call(ObjectifiedInstanceConstructor),
        log : function(){
            var ObjectifiedSelf = this;
            return function(){
                return objectifiedLog.apply(ObjectifiedSelf, arguments);
            };
        }.call(ObjectifiedInstanceConstructor)
    };

    // Objectified itselfs properties...
    ObjectifiedInstanceConstructor.prototype.objectifiedProperties = {
        "baseVersion":"0.9.0",
        "atTheTime":{
            "song" : "Bastard Child",
            "artist" : "Master P"
        }
    };

    if (typeof exports !== "undefined") {
        // rethink this... i dont like this
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = ObjectifiedInstanceConstructor;
        }
        exports.Objectified = ObjectifiedInstanceConstructor;
    } else {
        // just attach to the root object like window
        globalRoot.Objectified = ObjectifiedInstanceConstructor;
    }

    return ObjectifiedInstanceConstructor;

}).call(this, console);
