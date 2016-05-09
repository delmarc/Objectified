/**
* The attempt to make a template engine... you know instead of doing innerHTMLs with everything... and script tag hacks 
* though some may say I am just as guilty
* @namespace window.Objectified
*/
;var Objectified = ( function(globalObj, console, undefined) {

    "use strict";

    var _this = this;

    function throwOne(errorText){

        throw new Error(errorText);

    }

    function objectifiedLog(){

        return console.log(arguments);

    }

    function extend(extendingObjectifiedObject, extendingObjectifiedModuleObject){

        var _self = this;

        for(var property in extendingObjectifiedObject){
            _self.prototype[property] = function(){
                var __module = this;
                return function(){
                    return extendingObjectifiedObject[property].apply({
                        moduleObject : __module.moduleObject,
                        objectifiedInstancePropertyObject : this.instancePropertyObject.modulePropertiesObject[property],
                        oPrototype : __module.oPrototype
                    }, arguments);
                }
            }.call({
                moduleObject : extendingObjectifiedModuleObject,
                oPrototype : _self.prototype
            });
        }

        return _self;

    }

    function returnModulePropertyObj(){

    }

    function initNewObjectifiedInstance(objectifiedInstancePropertyObject){

        var objectified_self = this;

        objectified_self.objectifiedInstancePropertyObject = {
            "attributeMapping": objectifiedInstancePropertyObject.attributeMapping || null,
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

    ObjectifiedInstanceConstructor.init = function(objectifiedInstancePropertyObject){
        return new ObjectifiedInstanceConstructor(objectifiedInstancePropertyObject);
    };

    ObjectifiedInstanceConstructor.prototype.UTILS = {
        extend : function(){
            var ObjectifiedSelf = this;
            return function(extendingObjectifiedObject, objectifiedModuleProperties){
                return extend.call(ObjectifiedSelf, extendingObjectifiedObject, objectifiedModuleProperties);
            };
        }.call(ObjectifiedInstanceConstructor),
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

    ObjectifiedInstanceConstructor.prototype.objectifiedProperties = {
        baseVersion:"0.8.1",
        atTheTime:{
            song : "Bastard Child",
            artist : "Master P"
        }
    };

    return ObjectifiedInstanceConstructor;

}).call(Objectified || {}, window, console);
