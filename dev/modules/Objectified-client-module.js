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

    function retrieveData(
        attributeValueToRetrieveArray,
        dataObjectToRender
    ) {
        var _objectified = this,
            referenceToDataObject;

        console.log(attributeValueToRetrieveArray, dataObjectToRender, attributeValueToRetrieveArray.length);

        for(var i=0;i<attributeValueToRetrieveArray.length;i++){
            if(i){
                // use itself to loop inside again and again
                referenceToDataObject = referenceToDataObject[attributeValueToRetrieveArray[i]];
            } else {
                // setup the reference Object
                referenceToDataObject = dataObjectToRender[attributeValueToRetrieveArray[i]];
            }
        }

        return referenceToDataObject;

    }


    /**
    * 
    * @method bindProperties
    * @param {Object}
    * @return {Object}
    */

    function bindProperties(
        createElementObject, 
        dataObjectToRender,
        internalBindingBoolean
    ) {

        var _objectified = this,
            renderObjectPropertyMappingObject,
            bindedElementObject;

        /* 
            look if we have a mapping object that was passed into this instance
        */
        renderObjectPropertyMappingObject = !internalBindingBoolean && _objectified && _objectified.instancePropertyModuleObject && _objectified.instancePropertyModuleObject.renderObjectPropertyMappingObject;

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
    * 
    * @method extendElementAttributes
    * @param {Object}
    * @return {Object}
    */

    function extendElementAttributes(
        createElementAttributesObject,
        dataObjectToRender
    ) {
        var elementSelf = this;

        for(var attribute in createElementAttributesObject){

            switch(attribute){
                case "style":
                case "dataset":
                    for(var subAttribute in createElementAttributesObject[attribute]){
                        elementSelf[attribute][subAttribute] = createElementAttributesObject[attribute][subAttribute];
                    }
                    break;
                default:
                    if( attribute in elementSelf || elementSelf.hasOwnProperty(attribute) ){
                        elementSelf[attribute] = createElementAttributesObject[attribute];
                    } else {

                        // old browsers fall in here
                        switch(attribute){
                            case "innerHTML":
                                elementSelf[attribute] = createElementAttributesObject[attribute];
                                break;
                            case "className":
                                elementSelf.setAttribute("class", createElementAttributesObject[attribute]);
                                break;
                            default:
                                elementSelf.setAttribute(attribute, createElementAttributesObject[attribute]);
                        }

                    }
            }

        }

    }



    /**
    * The common factory(like) DOM creator method which returns the newly created element
    * @namespace window.Objectified.DOM
    * @method createElement
    * @param {Object} REQUIRED - The desired DOM element with tagName and optional attributes and childNodes/children
    * @return {Object}
    */
    function createElement (
        createElementObject,
        dataObjectToRender,
        childrenDataObject
    ) {
        // prototypeUTILS.log(createElementObj, dataObjectToRender, "BEGINNING");

        var _objectified = this;

        if(typeof createElementObject === "object"){

            if(childrenDataObject){
                console.log(createElementObject, dataObjectToRender, childrenDataObject)
            }

            // prototypeUTILS.log("I get createElementObj as an object", createElementObj);

            var element,
                elementTagName,
                childInstance,
                children,
                childrenDOM;

            if(elementTagName = createElementObject.tagName) {

                //  nodeName??? yes that does exist... but please use tagName there are differences otherwise if all those arent defined just make a div
                element = doc.createElement(elementTagName || "div");

                // put the attribute/properties on the object
                extendElementAttributes.call(element, createElementObject.attributes, dataObjectToRender, childrenDataObject);

                // cycle through the children object(s) now
                if(children = createElementObject.children){
                    for(childInstance=0;childInstance<children.length;childInstance++){
                        element.appendChild( 
                            createElement.call(
                                _objectified,
                                bindProperties.call(
                                    _objectified,
                                    children[childInstance],
                                    dataObjectToRender
                                ),
                                dataObjectToRender,
                                childrenDataObject
                            )
                        )
                    }
                }

                // cycle through the children object(s) now
                if(childrenDOM = createElementObject.childrenDOM){
                    console.log(childrenDOM);
                    element.appendChild(
                        createElement.call(
                            _objectified,
                            bindProperties.call(
                                _objectified,
                                childrenDOM,
                                dataObjectToRender
                            ),
                            dataObjectToRender,
                            createElementObject.childrenData || undefined
                        )
                    )
                }

            }

            return element;

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

        return createDocumentFragment().appendChild(
            createElement.call(
                _objectified,
                bindProperties.call(
                    _objectified,
                    createElementObject,
                    dataObjectToRender
                ),
                dataObjectToRender
            ) 
        );

    }

    prototypeUTILS.extend({
        render : render
    },{
        domAttributeMappingObject : {},
        renderObjectPropertyMappingObject : {}
    });

    return _this;

}).call(Objectified || null, window);
