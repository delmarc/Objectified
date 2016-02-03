/**
* The attempt to make a template engine... you know instead of doing innerHTMLs with everything... and script tag hacks 
* though some may say I am just as guilty
* @namespace window.Objectified
*/

;var Objectified = (function(globalObj){
    // "this" is the objectified object most likely
    var _this = this,
        doc,
        listOfValidProperties = {
            "tag":1,
            "tagName":1,
            "nodeName":1,
            "childNodes":1,
            "children":1,
            "attributes":1
        };

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
    function extendElement (elementAttributesObj, elementBindedDataAttributesObj){
        /*
           so with this I am basically maping what the context of the function is... normally or more what i consider
           normally is that this function will be executed like below

           Objectified.extendElement.call(context, elementAttributesObj)
        */

        var extendElement,
            attributeMappingObj = _this.objectifiedProperties && !!_this.objectifiedProperties.attributeMapping ? _this.objectifiedProperties.attributeMapping : null,
            utilizeMapping = !!attributeMappingObj,
            attrInstance;

        // should use this for IEs getting rid of old IE for now
        ///*@cc_on!@*/false

        //if( globalObj.attachEvent ){

        extendElement = function(elementAttributesObj, elementBindedDataAttributesObj){

            // cycle through all the attributes of passed objects
            for(var attr in elementAttributesObj){

                if( utilizeMapping && attributeMappingObj[attr] ){
                    attrInstance = attributeMappingObj[attr];
                } else {
                    attrInstance = attr;
                }

                // checking if the attr in question is a normal attribute of said DOM element...
                if( this.hasOwnProperty(attrInstance) || attrInstance in this ){
                    // yea??? then add through usual conventions on the DOM...

                    switch(attrInstance){
                        case "style":
                        case "dataset":
                            /*
                                I have this in a switch cause where I work at we depend on a polyfill to do
                                dataset and classList for us... I will write this myself
                            */
                            for(var singleAttr in elementAttributesObj[attrInstance]){
                                this[attrInstance][singleAttr] = utilizeMapping ? elementAttributesObj[attrInstance][singleAttr] : elementAttributesObj[attr][singleAttr];
                            }
                            break;
                        case "innerHTML":
                            /*
                                I have this in a switch cause where I work at we depend on a polyfill to do
                                dataset and classList for us... I will write this myself
                            */
                            this.innerHTML = utilizeMapping ? elementAttributesObj[attr] : elementAttributesObj[attrInstance];
                            break;
                        default:
                            // use the normal attribute and assign the attribute to it... example element.title or element.href
                            this[attrInstance] = utilizeMapping ? elementAttributesObj[attr] : elementAttributesObj[attrInstance];
                    }

                } else {

                    // this is when a custom attribute is passed to the specific element
                    this.setAttribute( ( utilizeMapping ? attributeMappingObj[attr] : attr ), elementAttributesObj[attr] );

                }

            }

            return this;

        };

        extendElement.call(this, elementAttributesObj, elementBindedDataAttributesObj);

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
                console.log("binding from a string");
                for(var i in dataBindingObj){
                    _this[i] = dataToBindRender;
                }
                break;
            case "object":
                console.log("binding from a Object");
                if(dataToBindRender.length){
                    console.log("binding from a Object array", dataBindingObj, dataToBindRender);

                } else {
                    console.log("binding from more proper Object", dataBindingObj, dataToBindRender);

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
    * @namespace window.Objectified
    * @method createElement
    * @param {Object} REQUIRED - The desired DOM element with tagName and optional attributes and childNodes/children
    * @return {Object}
    */
    function createElement (createElementObj, createElementRenderingData) {

        if(typeof createElementObj === "object"){

            if(createElementObj.length){
                console.log(createElementObj, renderingData, "I get here");

                if(createElementRenderingData){
                    // parse thru the object
                } else {
                    if(renderingData){
                        console.log("do something with this", createElementObj, renderingData)

                        return document.createTextNode()
                    } else {
                        // odds is you gave me an array but didnt give me the data to parse through... and I dont want those...
                        return UTILS.error.throwOne("This is an object with a length attribute aka most likely an array and I dont want those...");
                    }
                }

            } else {

                var element,
                    elementName,
                    containerElementName,
                    children,
                    nodeText;

                if(!createElementRenderingData){

                    //console.log(createElementObj, createElementRenderingData)

                    if(createElementObj.nodeType && createElementObj.nodeType !== 1){

                        switch(createElementObj.nodeType){
                            case 3: // textNode
                                if( (nodeText = createElementObj.text) && typeof createElementObj.text === "string" ){
                                    element = doc.createTextNode(nodeText);
                                } else {
                                    return UTILS.error.throwOne("You specified a text node but you didnt give me a string for the text");
                                }
                                break;
                            /*
                            working on this
                            case 8: // comment
                                if(nodeText = createElementObj.commentText || createElementObj.text){
                                    element = document.createComment(nodeText);
                                } else {
                                    return UTILS.error.throwOne("You tried making an element with a tag/nodeName that was not a string... what the hell am I supposed to do with this...");
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

                        elementName = createElementObj.tagName || createElementObj.tag || createElementObj.nodeName;

                        if(typeof elementName !== "string" && elementName !== undefined){
                            return UTILS.error.throwOne("You tried making an element with a tag/nodeName that was not a string... what the hell am I supposed to do with this...");
                        }

                        //  nodeName??? yes that does exist... but please use tagName there are differences otherwise if all those arent defined just make a div
                        element = doc.createElement(elementName || "div");

                        if(createElementObj.dataBindedAttributes){
                            if(!createElementObj.attributes){
                                createElementObj.attributes = {};
                            }

                            console.log("THIS WAS ADDED", element)

                            createElementObj.dataBindedAttributes && bindAttributes.call(createElementObj.attributes, createElementObj.dataBindedAttributes, renderingData);

                            element.bitching = true;
                            element.dataBindedAttributes = createElementObj.dataBindedAttributes;
                            element.bindedAttributesMapping = function(){
                                console.log(this,"ok cool", arguments);
                            };

                        }

                        //  console.log(createElementObj);

                        //  if createElementObj exists the call extend with the element as the this
                        createElementObj.attributes && extendElement.call(element, createElementObj.attributes);

                        createElementObj.on && addEventToElement.call(element, createElementObj.on);

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
                            console.log("hey mommy in this instance", createElementObj.childrenDataHandling, createElementObj.dataBind || renderingData);

                            if(createElementObj.childrenDataHandling.length){
                                console.log("up in here");
                                for(var i=0;i<createElementObj.childrenDataHandling.length;i++){
                                    console.log(createElementObj.childrenDataHandling[i]);
                                }
                                element.appendChild( createElement(createElementObj.childrenDataHandling, createElementObj.dataBind || renderingData) );
                            } else {
                                var dataToLoop = createElementObj.dataBind || renderingData,
                                    instanceElement,
                                    instanceDataBinded;

                                console.log("fall into here", createElementObj, dataToLoop);

                                instanceDataBinded = createElementObj.childrenDataHandling.dataBindedAttributes && bindAttributes.call({}, createElementObj.childrenDataHandling.dataBindedAttributes, dataToLoop);

                                for(var i in instanceDataBinded){
                                    console.log(i)

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

                    //console.log("Now in this one ", createElementObj, createElementRenderingData);

                    containerElementName = document.createDocumentFragment();

                    // i have the data
                    if(typeof createElementRenderingData === "object"){

                        if( dataArrayCount = createElementRenderingData.length){

                            console.log("in here ok", createElementRenderingData);
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
                            console.log("I am in this instance... given an object", createElementRenderingData);

                        }
                    } else {
                        console.log("what the fuck am I dealing with here");
                    }

                    return containerElementName;

                }


            }

        } else if(typeof createElementObj === "string") {

            return doc.createTextNode(createElementObj)

        } else {

            // i will just fail if you dont use the api correctly
            return UTILS.error.throwOne("The first argument should be an object... you passed me "+createElementObj+" which is a "+(typeof createElementObj)+"... I dont want that...");

        }

    }


    /**
    * This is basically mapped to the only public function/method within the objectified framework...
    * @namespace window.Objectified
    * @method render
    * @param {Object} REQUIRED - You wil pass an object that will hopefully look like a JSON representation of a DOM
    * @return {Object}
    */
    function render (createElementObj, dataObjToRender, renderConfigObj) {

        if(!createElementObj){
            return UTILS.error.throwOne("I think it would be good to at least give me an object to start with - err-0");
        }

        if(typeof createElementObj !== "object" || typeof createElementObj.length === "number" ){
            return UTILS.error.throwOne("You either gave me something that is not an object like i am expecting, or probably an array");
        }

        var propsMethodsExist = false,
            validPropertiesExist = false;

        if(createElementObj.length){
            console.log("have to be able to have createElementObj be an array to... this is next")
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
            return UTILS.error.throwOne("Well thats nice you gave me an empty object... what you want me to do with it...");
        }

        if(!validPropertiesExist){
            return UTILS.error.throwOne("Well you gave me an object... thats cool but there is really nothing I can do with this...");
        }

        var containerFragment = doc.createDocumentFragment();

        if(dataObjToRender){
            renderingData = dataObjToRender;
        }

        containerFragment.appendChild( createElement(createElementObj) );

        if(renderConfigObj){
            failSilently = renderConfigObj.failSilently;

            if(renderConfigObj.renderString){
                return containerFragment.toString();
            }
        }

        return containerFragment;

    }

    _this.DOM = {
        render : render,
        extendElement : extendElement
    }

    return _this;

}).call(Objectified || null, window);
