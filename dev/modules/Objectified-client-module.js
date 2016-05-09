/**
* The attempt to make a template engine... you know instead of doing innerHTMLs with everything... and script tag hacks 
* though some may say I am just as guilty
* @namespace window.Objectified
*/

;var Objectified = (function(globalObj, undefined){

    "use strict";

    var _this = this,
        doc,
        listOfValidProperties = {
            "tag":1,
            "tagName":1,
            "nodeName":1,
            "childNodes":1,
            "children":1,
            "attributes":1
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

    /**
    * The method in which extends on DOM elements' attributes...
    * @method extendElement
    * @param {Object} REQUIRED - This is the object that you want to use to extend the context's attribute
    * @return {Object}
    */
    function extendElement (elementToExtend, elementAttributesObj, elementBindedDataAttributesObj){
        /*
           so with this I am basically maping what the context of the function is... normally or more what i consider
           normally is that this function will be executed like below

           Objectified.extendElement.call(context, elementAttributesObj)
        */

        var __this = this,
            extendElement,
            attributeMappingObj = __this.objectifiedInstancePropertyObject && !!__this.objectifiedInstancePropertyObject.attributeMapping ? __this.objectifiedInstancePropertyObject.attributeMapping : null,
            utilizeMapping = !!attributeMappingObj,
            attrInstance;

        // cycle through all the attributes of passed objects
        for(var attr in elementAttributesObj){

            if( utilizeMapping && attributeMappingObj[attr] ){
                attrInstance = attributeMappingObj[attr];
            } else {
                attrInstance = attr;
            }

            // checking if the attr in question is a normal attribute of said DOM element...
            if( elementToExtend.hasOwnProperty(attrInstance) || attrInstance in elementToExtend ){
                // yea??? then add through usual conventions on the DOM...

                prototypeUTILS.log(attrInstance);

                switch(attrInstance){
                    case "style":
                    case "dataset":
                        /*
                            I have this in a switch cause where I work at we depend on a polyfill to do
                            dataset and classList for us... I will write this myself
                        */
                        for(var singleAttr in elementAttributesObj[attr]){
                            elementToExtend[attrInstance][singleAttr] = utilizeMapping ? elementAttributesObj[attr][singleAttr] : elementAttributesObj[attr][singleAttr];
                        }
                        break;
                    case "innerHTML":
                        /*
                            I have this in a switch cause where I work at we depend on a polyfill to do
                            dataset and classList for us... I will write this myself
                        */
                        elementToExtend.innerHTML = utilizeMapping ? elementAttributesObj[attr] : elementAttributesObj[attrInstance];
                        break;
                    default:
                        // use the normal attribute and assign the attribute to it... example element.title or element.href
                        elementToExtend[attrInstance] = utilizeMapping ? elementAttributesObj[attr] : elementAttributesObj[attrInstance];
                }

            } else {

                // this is when a custom attribute is passed to the specific element
                elementToExtend.setAttribute( ( utilizeMapping ? attributeMappingObj[attr] : attr ), elementAttributesObj[attr] );

            }

        }

    }


    /**
    * The method that takes the data and maps it to the attributes that will then be used in the extendElements Obj
    * @method bindAttributes
    * @param {Object}
    * @return {Object}
    */

    function bindAttributes(dataBindingObj, dataToBindRender){
        var _this = this;

        switch(typeof dataToBindRender){
            case "string":
                prototypeUTILS.log("binding from a string");
                for(var i in dataBindingObj){
                    _this[i] = dataToBindRender;
                }
                break;
            case "object":
                prototypeUTILS.log("binding from a Object");
                if(dataToBindRender.length){
                    prototypeUTILS.log("binding from a Object array", dataBindingObj, dataToBindRender);

                } else {
                    prototypeUTILS.log("binding from more proper Object", dataBindingObj, dataToBindRender);

                    prototypeUTILS.log("I need to check mapping",attributeMappingObj);

                    for(var i in dataBindingObj){
                        var referenceObj = dataToBindRender,
                            accessArray = dataBindingObj[i],
                            accessArrayLength = accessArray.length;

                        for(var j = 0;j<accessArrayLength;j++){
                            referenceObj = referenceObj[accessArray.shift()];
                        }

                        _this[i] = referenceObj;
                    }

                }

                break;
        }

        return _this;

    }


    /**
    * The common factory(like) DOM creator method which returns the newly created element
    * @namespace window.Objectified.DOM
    * @method createElement
    * @param {Object} REQUIRED - The desired DOM element with tagName and optional attributes and childNodes/children
    * @return {Object}
    */
    function createElement (createElementObj, createElementRenderingData) {

        if(typeof createElementObj === "object"){

            if(createElementObj.length){
                prototypeUTILS.log(createElementObj, createElementRenderingData, "I get here");

                if(createElementRenderingData){
                    // parse thru the object
                } else {
                    if(createElementRenderingData){
                        prototypeUTILS.log("do something with this", createElementObj, createElementRenderingData);

                        return document.createTextNode()
                    } else {
                        // odds is you gave me an array but didnt give me the data to parse through... and I dont want those...
                        return prototypeUTILS.error("This is an object with a length attribute aka most likely an array and I dont want those...");
                    }
                }

            } else {

                prototypeUTILS.log(createElementObj, createElementRenderingData, "in here ok")

                var element,
                    elementName,
                    containerElementName,
                    children,
                    nodeText;

                if(!createElementRenderingData){

                    //prototypeUTILS.log(createElementObj, createElementRenderingData)

                    if(createElementObj.nodeType && createElementObj.nodeType !== 1){

                        switch(createElementObj.nodeType){
                            case 3: // textNode
                                if( (nodeText = createElementObj.text) && typeof createElementObj.text === "string" ){
                                    element = doc.createTextNode(nodeText);
                                } else {
                                    return prototypeUTILS.error("You specified a text node but you didnt give me a string for the text");
                                }
                                break;
                            /*
                            working on this
                            case 8: // comment
                                if(nodeText = createElementObj.commentText || createElementObj.text){
                                    element = document.createComment(nodeText);
                                } else {
                                    return prototypeUTILS.error("You tried making an element with a tag/nodeName that was not a string... what the hell am I supposed to do with this...");
                                }
                                break;
                            case 2: // attribute
                                break;
                            case 11: // docFrag
                                element = document.createDocumentFragment();
                                break;
                            */
                        }

                    } else if(createElementObj.tagName || createElementObj.tag || createElementObj.nodeName) {

                        prototypeUTILS.log("part 3");

                        elementName = createElementObj.tagName || createElementObj.tag || createElementObj.nodeName;

                        if(typeof elementName !== "string" && elementName !== undefined){
                            return prototypeUTILS.error("You tried making an element with a tag/nodeName that was not a string... what the hell am I supposed to do with this...");
                        }

                        //  nodeName??? yes that does exist... but please use tagName there are differences otherwise if all those arent defined just make a div
                        element = doc.createElement(elementName || "div");

                        if(createElementObj.dataBindedAttributes){
                            if(!createElementObj.attributes){
                                createElementObj.attributes = {};
                            }

                            prototypeUTILS.log("THIS WAS ADDED", element);

                            createElementObj.dataBindedAttributes && bindAttributes.call(createElementObj.attributes, createElementObj.dataBindedAttributes, createElementRenderingData);


                            prototypeUTILS.log()
                            element.bitching = true;
                            element.dataBindedAttributes = createElementObj.dataBindedAttributes;
                            element.bindedAttributesMapping = function(){
                                prototypeUTILS.log(this,"ok cool", arguments);
                            };

                        }

                        prototypeUTILS.log(createElementObj, "up here now ok");

                        //  if createElementObj exists the call extend with the element as the this
                        createElementObj.attributes && extendElement.call(this, element, createElementObj.attributes);

                        /*
                            if you have children (you can call then childNodes or children) loops through them and append each one to the
                            created element in question...
                        */

                        if(createElementObj.childNodes || createElementObj.children){
                            //  and since we do, cache the object
                            children = createElementObj.childNodes || createElementObj.children;

                            for(var i=0;i<children.length;i++){
                                /*
                                    cycle through the children and recursively call createElement on those child nodes which can go
                                    forever and ever and ever and ever...
                                */
                                element.appendChild( createElement(children[i]) );
                            }
                        } else if(createElementObj.childrenDataHandling){
                            prototypeUTILS.log("hey mommy in this instance", createElementObj.childrenDataHandling, createElementObj.dataBind || renderingData);

                            if(createElementObj.childrenDataHandling.length){
                                prototypeUTILS.log("up in here");
                                for(var i=0;i<createElementObj.childrenDataHandling.length;i++){
                                    prototypeUTILS.log(createElementObj.childrenDataHandling[i]);
                                }
                                element.appendChild( createElement(createElementObj.childrenDataHandling, createElementObj.dataBind || renderingData) );
                            } else {
                                var dataToLoop = createElementObj.dataBind || renderingData,
                                    instanceElement,
                                    instanceDataBinded;

                                prototypeUTILS.log("fall into here", createElementObj, dataToLoop);

                                instanceDataBinded = createElementObj.childrenDataHandling.dataBindedAttributes && bindAttributes.call({}, createElementObj.childrenDataHandling.dataBindedAttributes, dataToLoop);

                                for(var i in instanceDataBinded){
                                    prototypeUTILS.log(i)

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

                    //prototypeUTILS.log("Now in this one ", createElementObj, createElementRenderingData);

                    containerElementName = document.createDocumentFragment();

                    // i have the data
                    if(typeof createElementRenderingData === "object"){

                        if( dataArrayCount = createElementRenderingData.length){

                            prototypeUTILS.log("in here ok", createElementRenderingData);
                            for(var i = 0;i<dataArrayCount;i++){

                                elementName = createElementObj.tagName || createElementObj.tag || createElementObj.nodeName;

                                element = doc.createElement(elementName || "div");
                                
                                if(createElementObj.dataBindedAttributes){
                                    if(!createElementObj.attributes){
                                        createElementObj.attributes = {};
                                    }

                                    createElementObj.dataBindedAttributes && bindAttributes.call(createElementObj.attributes, createElementObj.dataBindedAttributes, createElementRenderingData[i]); 
                                }

                                createElementObj.attributes && extendElement.call(element, createElementObj.attributes);

                                containerElementName.appendChild(element);
                            }
                        } else {
                            prototypeUTILS.log("I am in this instance... given an object", createElementRenderingData);

                        }
                    } else {
                        prototypeUTILS.log("what the fuck am I dealing with here");
                    }

                    return containerElementName;

                }

            }

        } else if(typeof createElementObj === "string") {

            return doc.createTextNode(createElementObj);

        } else {

            // i will just fail if you dont use the api correctly
            return prototypeUTILS.error("The first argument should be an object... you passed me "+createElementObj+" which is a "+(typeof createElementObj)+"... I dont want that...");

        }

    }


    /**
    * This is basically mapped to the only public function/method within the objectified framework...
    * @namespace window.Objectified.DOM
    * @method render
    * @param {Object} REQUIRED - You wil pass an object that will hopefully look like a JSON representation of a DOM
    * @return {Object}
    */
    function render (createElementObj, dataObjToRender, renderConfigObj) {

        var propsMethodsExist = false,
            validPropertiesExist = false,
            containerFragment,
            renderingData,
            failSilently;

        if(!createElementObj){
            return prototypeUTILS.error("I think it would be good to at least give me an object to start with - err-0");
        }

        if(typeof createElementObj !== "object" || typeof createElementObj.length === "number" ){
            return prototypeUTILS.error("You either gave me something that is not an object like i am expecting, or probably an array");
        }

        if(createElementObj.length){
            prototypeUTILS.log("have to be able to have createElementObj be an array to... this is next")
            return null

        }

        for(var i in createElementObj){
            propsMethodsExist = true;

            if(listOfValidProperties[i]){
                validPropertiesExist = true;
                break;
            }

        }

        if(!propsMethodsExist){
            return prototypeUTILS.error("Well thats nice you gave me an empty object... what you want me to do with it...");
        }

        if(!validPropertiesExist){
            return prototypeUTILS.error("Well you gave me an object... thats cool but there is really nothing I can do with this...");
        }

        containerFragment = doc.createDocumentFragment();

        if(dataObjToRender){
            renderingData = dataObjToRender;
        }

        containerFragment.appendChild( createElement.call(this, createElementObj) );

        if(renderConfigObj){
            if(renderConfigObj.renderString){
                return containerFragment.toString();
            }
        }

        return containerFragment;

    }


    /**
    * This is basically mapped to the only public function/method within the objectified framework...
    * @namespace window.Objectified.DOM
    * @method place
    * @param {string|Object} REQUIRED - You wil pass an object that will hopefully look like a JSON representation of a DOM
    * @return {Object}
    */
    function place (idToPlaceORDomObjectToPlace) {

        if(typeof idToPlaceORDomObjectToPlace === "string"){

        }

    }

    prototypeUTILS.extend({
        render : render
    },{
        attributeMapping:{}
    })

    prototypeUTILS.extend({
        place : place
    });

    return _this;

}).call(Objectified || null, window);
