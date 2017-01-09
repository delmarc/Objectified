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
        ObjectifiedWorker : function(workerObj, stayOpenBool){
            //myWorker.terminate();
            //close inside code;
            var ObjectifiedSelf = this,
                objectifiedBlob = new Blob([
    "onmessage = function(ObjectifiedMessageObject){postMessage(ObjectifiedMessageObject.data.callback(ObjectifiedMessageObject.data.dataToProcess));}"]);

            var blobURL = window.URL.createObjectURL(blob);                
            var worker = new Worker(blobURL);

            worker.onmessage = function(e) {
              // e.data == 'msg from worker'
            };
            worker.postMessage(); // Start the worker.

            return function(extendingObjectifiedObject, objectifiedModuleProperties){
                return extend.call(ObjectifiedSelf, extendingObjectifiedObject, objectifiedModuleProperties);
            };
        }.call(ObjectifiedInstanceConstructor),
        *

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

/**
* An attempt to make a template engine...
* though some may say I am just as guilty
* @namespace window.Objectified
*/

;var Objectified = (function(globalObj, undefined){

    "use strict";

    var _this = this,
        doc,
        renderObjectBasePropertiesMappingObject = {
            "tagName":"tagName",
            "childNodes":"childNodes",
            "children":"children",
            "dataBindedAttributes":"dataBindedAttributes",
            "attributes":"attributes"
        },
        prototypeUTILS = _this.prototype.UTILS;

    // if its null then something aint right
    if(_this === null){
        return false;
    }

    if(doc = globalObj.document){

    } else {
        return false;
    }

    /*
        UTILS
    */

    function createDocumentFragment(){
        return doc.createDocumentFragment();
    }

    /**
    * The method that takes the data and maps it to the attributes that will then be used in the extendElements Obj
    * @method bindAttributes
    * @param {Object}
    * @return {Object}
    */

    function bindAttributes(
        createElementObject, 
        dataObjectToRender
    ) {

        var _objectified = this,
            domAttributeMappingObject = _objectified && _objectified.instancePropertyModuleObject && _objectified.instancePropertyModuleObject.domAttributeMappingObject,
            createElementObjectAttributes = createElementObject.attributes;

        // there is no else... this is a straight render apparently

        if(!!domAttributeMappingObject){
            for(var domAttribute in createElementObjectAttributes){
                if(typeof createElementObjectAttributes[domAttribute] === "object" && typeof createElementObjectAttributes[domAttribute].length === "number"){
                    createElementObjectAttributes[domAttributeMappingObject[domAttribute]] = retrieveData.call(_this, createElementObjectAttributes[domAttribute], dataObjectToRender);
                } else {
                    createElementObjectAttributes[domAttributeMappingObject[domAttribute]] = createElementObjectAttributes[domAttribute];
                }

                delete createElementObjectAttributes[domAttribute];
            }
        }

        return createElementObject;

    }


    /**
    * 
    * @method retrieveData
    * @param {Object}
    * @return {Object}
    */

    function retrieveData(attributeValueToRetrieveArray, dataObjectToRender){
        var _objectified = this,
            referenceToDataObject;

        for(var i=0;i<attributeValueToRetrieveArray.length;i++){
            if(dataObjectToRender[attributeValueToRetrieveArray[i]]){
                return dataObjectToRender[attributeValueToRetrieveArray[i]];
            }
        }

    }


    /**
    * 
    * @method bindProperties
    * @param {Object}
    * @return {Object}
    */

    function bindProperties(
        createElementObject, 
        dataObjectToRender
    ) {

        var _objectified = this,
            renderObjectPropertyMappingObject,
            bindedElementObject;

        /* 
            look if we have a mapping object that was passed into this instance
        */
        renderObjectPropertyMappingObject = _objectified && _objectified.instancePropertyModuleObject && _objectified.instancePropertyModuleObject.renderObjectPropertyMappingObject;

        if(renderObjectPropertyMappingObject){
            /* 
                if we have an instance then lets loop through it in order
                to remap/rename the createElementObjects property names
            */
            for(var renderObjectProperty in renderObjectPropertyMappingObject){
                createElementObject[renderObjectPropertyMappingObject[renderObjectProperty]] = createElementObject[renderObjectProperty];
                delete createElementObject[renderObjectProperty];
            }
        }

        return bindAttributes.call(_objectified, createElementObject, dataObjectToRender, renderObjectPropertyMappingObject);

    }



    /**
    * The common factory(like) DOM creator method which returns the newly created element
    * @namespace window.Objectified.DOM
    * @method createElement
    * @param {Object} REQUIRED - The desired DOM element with tagName and optional attributes and childNodes/children
    * @return {Object}
    */
    function createElement (createElementObj, renderingData) {
        // prototypeUTILS.log(createElementObj, renderingData, "BEGINNING");

        var _objectified = this,
            validPropertiesMappingObj = _objectified.instancePropertyModuleObject && !!_objectified.instancePropertyModuleObject.validPropertiesMapping ? _objectified.instancePropertyModuleObject.validPropertiesMapping : null,
            utilizeValidPropertiesMapping = !!validPropertiesMappingObj;

        if(typeof createElementObj === "object"){

            // prototypeUTILS.log("I get createElementObj as an object", createElementObj);

            var element,
                elementName,
                containerElementName,
                children,
                nodeText;

            if(!renderingData){

                //prototypeUTILS.log(createElementObj, renderingData)

                if(createElementObj.tagName || createElementObj.tag) {

                    elementName = createElementObj.tagName || createElementObj.tag;

                    if(typeof elementName !== "string" && elementName !== undefined){
                        return prototypeUTILS.error("You tried making an element with a tag/nodeName that was not a string... what the hell am I supposed to do with this...");
                    }

                    //  nodeName??? yes that does exist... but please use tagName there are differences otherwise if all those arent defined just make a div
                    element = doc.createElement(elementName || "div");

                    //  if createElementObj exists the call extend with the element as the this
                    createElementObj.attributes && extendElement.call(_objectified, element, createElementObj.attributes);

                    /*
                        if you have children (you can call then childNodes or children) loops through them and append each one to the
                        created element in question...
                    */

                    // prototypeUTILS.log(createElementObj);

                    if(children = createElementObj.childNodes || createElementObj.children){
                        prototypeUTILS.log("got kids here", children);
                        //  and since we do, cache the object
                        if(children.length){
                            for(var i=0;i<children.length;i++){
                                /*
                                    cycle through the children and recursively call createElement on those child nodes which can go
                                    forever and ever and ever and ever...
                                */
                                element.appendChild( createElement(children[i]) );
                            }
                        }

                    } else if(createElementObj.childrenDataHandling){
                        // prototypeUTILS.log("hey mommy in this instance", createElementObj.childrenDataHandling, createElementObj.dataBind || renderingData);

                        if(createElementObj.childrenDataHandling.length){
                            // prototypeUTILS.log("up in here");
                            for(var i=0;i<createElementObj.childrenDataHandling.length;i++){
                                prototypeUTILS.log(createElementObj.childrenDataHandling[i]);
                            }
                            element.appendChild( createElement(createElementObj.childrenDataHandling, createElementObj.dataBind || renderingData) );
                        } else {
                            var dataToLoop = createElementObj.dataBind || renderingData,
                                instanceElement,
                                instanceDataBinded;

                            // prototypeUTILS.log("fall into here", createElementObj, dataToLoop);

                            instanceDataBinded = createElementObj.childrenDataHandling.dataBindedAttributes && bindAttributes.call({}, createElementObj.childrenDataHandling.dataBindedAttributes, dataToLoop);

                            for(var i in instanceDataBinded){

                                for(var j=0;j<instanceDataBinded[i].length;j++){

                                    var childElement = doc.createElement(createElementObj.childrenDataHandling.tagName || createElementObj.childrenDataHandling.tag || createElementObj.childrenDataHandling.nodeName || "div");

                                    if(createElementObj.childrenDataHandling.dataBindedAttributes){
                                        if(!createElementObj.childrenDataHandling.attributes){
                                            createElementObj.childrenDataHandling.attributes = {};
                                        }
                                    }

                                    createElementObj.childrenDataHandling.attributes && extendElement.call(childElement, createElementObj.childrenDataHandling.attributes);

                                    childElement[i] = instanceDataBinded[i][j];

                                    element.appendChild( childElement );

                                }

                            }

                        }
                    }

                }

                return element;

            } else {

                var dataArrayCount;

                prototypeUTILS.log("Now in this one ", createElementObj, renderingData);

                containerElementName = createDocumentFragment();

                // i have the data
                if(typeof renderingData === "object"){

                    if( dataArrayCount = renderingData.length){

                        // prototypeUTILS.log("in here ok", renderingData);
                        for(var i = 0;i<dataArrayCount;i++){

                            elementName = createElementObj.tagName || createElementObj.tag || createElementObj.nodeName;

                            element = doc.createElement(elementName || "div");
                            
                            if(createElementObj.dataBindedAttributes){
                                if(!createElementObj.attributes){
                                    createElementObj.attributes = {};
                                }

                                createElementObj.dataBindedAttributes && bindAttributes.call(createElementObj.attributes, createElementObj.dataBindedAttributes, renderingData[i]); 
                            }

                            createElementObj.attributes && extendElement.call(element, createElementObj.attributes);

                            containerElementName.appendChild(element);
                        }
                    } else {

                        prototypeUTILS.log("I am in this instance... given an object", renderingData);

                        elementName = createElementObj.tagName || createElementObj.tag || createElementObj.nodeName;

                        element = doc.createElement(
                            (createElementObj.tagName || createElementObj.tag || createElementObj.nodeName) ||
                            "div"
                        );

                        if(createElementObj.dataBindedAttributes){
                            if(!createElementObj.attributes){
                                createElementObj.attributes = {};
                            }

                            createElementObj.dataBindedAttributes && bindAttributes.call(_objectified, createElementObj.attributes, createElementObj.dataBindedAttributes, renderingData); 
                        }

                        createElementObj.attributes && extendElement.call(_objectified, element, createElementObj.attributes);

                        containerElementName.appendChild(element);

                    }

                } else {
                    // prototypeUTILS.log("what the fuck am I dealing with here");
                }

                return containerElementName;

            }

        }

    }


    /**
    * This is basically mapped to the only public function/method within the objectified framework...
    * @namespace window.Objectified.DOM
    * @method render
    * @param {Object} REQUIRED - You wil pass an object that will hopefully look like a JSON representation of a DOM
    * @return {Object}
    */
    function render (
        createElementObject,
        dataObjectToRender
    ) {

        var objectPropsMethodsExist = false,
            containerFragment,
            binded,
            _objectified = this;


        if(!createElementObject){
            return prototypeUTILS.error("I think it would be good to at least give me an object to start with - err-0");
        }

        if(typeof createElementObject !== "object" || typeof createElementObject.length === "number" ){
            return prototypeUTILS.error("You either gave me something that is not an object like i am expecting, or probably an array");
        }

        for(var i in createElementObject){
            objectPropsMethodsExist = true;
        }

        if(!objectPropsMethodsExist){
            return prototypeUTILS.error("Well thats nice you gave me an empty object... what you want me to do with it...");
        }

        binded = bindProperties.call(_objectified, 
                    createElementObject, 
                    dataObjectToRender);

        debugger;

        /* 
            return createDocumentFragment( createElement.call(_objectified, 
                bindProperties.call(_objectified, 
                    createElementObject, 
                    dataObjectToRender), 
                dataObjectToRender) 
            );
        */
        return createDocumentFragment();

    }

    prototypeUTILS.extend({
        render : render
    },{
        domAttributeMappingObject : {},
        renderObjectPropertyMappingObject : {}
    });

    return _this;

}).call(Objectified || null, window);
