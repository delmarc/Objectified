/**
* The attempt to make a template engine... you know instead of doing innerHTMLs with everything... and script tag hacks 
* though some may say I am just as guilty
* @namespace window.Objectified
*/

(function (root, factory){
    if(root.navigator){
        if (typeof exports === "object" && exports) {
            // CommonJS
            factory(exports);
        } else {
            var objectified = {};
            factory(root, objectified);
            if (typeof define === "function" && define.amd) {
                // AMD
                define(objectified);
            } else {
                root.Objectified = objectified;
                //  console.log("like usual");
            }
        }
    } else {
        //  console.log("node world");
        root = factory(root, factory, true);
    }
}(this, function (globalObj, objectified, emulateDocumentBool){
    var listOfValidProperties = ["tag","tagName","nodeName","childNodes","children","attributes"],
        failSilently = false,
        emulateDocumentBool = emulateDocumentBool || false,
        renderingData;

    //  UTILS
    function throwOne(text){
        if(failSilently){
            if(console && console.log){
                console.log(text);
            }
        } else {
            throw new Error(text);
        }
    }
    //  END UTILS

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


        /*@cc_on
            console.log("yea buddy");
        @*/

        if( emulateDocumentBool || ( globalObj.attachEvent ) ){

            extendElement = function(elementAttributesObj, elementBindedDataAttributesObj){

                // cycle through all the attributes of passed objects
                for(var attr in elementAttributesObj){

                    // checking if the attr in question is a normal attribute of said DOM element...
                    switch(attr){
                        case "style":
                        case "dataset":
                            for(var singleAttr in elementAttributesObj[attr]){
                                this[attr][singleAttr] = elementAttributesObj[attr][singleAttr];
                            }



                            break;
                        case "className":
                            this.setAttribute("class",elementAttributesObj[attr]);
                            break;
                        case "innerHTML":
                            this[attr] = elementAttributesObj[attr];
                            break;

                        /*
                            I have this in a switch cause where I work at we depend on a polyfill to do
                            dataset and classList for us... I will write this myself
                        */
                            break;
                        default:
                            // use the normal attribute and assign the attribute to it... example element.title or element.href
                            this.setAttribute(attr,elementAttributesObj[attr]);
                    }

                }
            }

        } else {

            extendElement = function(elementAttributesObj, elementBindedDataAttributesObj){

                // cycle through all the attributes of passed objects
                for(var attr in elementAttributesObj){

                    // checking if the attr in question is a normal attribute of said DOM element...
                    if( this.hasOwnProperty(attr) ){
                        // yea??? then add through usual conventions on the DOM...

                        switch(attr){
                            case "style":
                            case "dataset":
                                /*
                                    I have this in a switch cause where I work at we depend on a polyfill to do
                                    dataset and classList for us... I will write this myself
                                */
                                for(var singleAttr in elementAttributesObj[attr]){
                                    this[attr][singleAttr] = elementAttributesObj[attr][singleAttr];
                                }
                                break;
                            case "innerHTML":
                            /*
                                I have this in a switch cause where I work at we depend on a polyfill to do
                                dataset and classList for us... I will write this myself
                            */
                                this.innerHTML = elementAttributesObj[attr];
                                break;
                            default:
                                // use the normal attribute and assign the attribute to it... example element.title or element.href
                                this[attr] = elementAttributesObj[attr];
                        }
                    } else {
                        // this is when a custom attribute is passed to the specific element
                        this.setAttribute(attr,elementAttributesObj[attr]);
                    }

                }

                if(elementBindedDataAttributesObj){
                    console.log(elementBindedDataAttributesObj)

                }

            }

        }

        extendElement.call(this, elementAttributesObj, elementBindedDataAttributesObj);

    }


    /**
    * The method that takes the data and maps it to the attributes that will then be used in the extendElements Obj
    * @method bindAttributes
    * @param {Object}
    * @return {Object}
    */

    function bindAttributes(dataBindingObj, dataToBindRender){

        switch(typeof dataToBindRender){
            case "string":
                for(var i in dataBindingObj){
                    this[i] = dataToBindRender;
                }
                break;
            case "object":

                if(dataToBindRender.length){


                    console.log(dataBindingObj, dataToBindRender)


                } else {

                    for(var i in dataBindingObj){
                        var referenceObj = dataToBindRender,
                            accessArray = dataBindingObj[i],
                            accessArrayLength = accessArray.length;

                        for(var j = 0;j<accessArrayLength;j++){
                            referenceObj = referenceObj[accessArray.shift()];
                        }

                        this[i] = referenceObj;
                    }

                }

                break;
        }

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

                // odds is you gave me an array... and I dont want those...
                return throwOne("This is an object with a length attribute aka most likely an array and I dont want those... either you passed an array or you name your attributes weirdly...");

            }

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
                                element = d.createTextNode(nodeText);
                            } else {
                                return throwOne("You specified a text node but you didnt give me a string for the text");
                            }
                            break;
                        /*
                        working on this
                        case 8: // comment
                            if(nodeText = createElementObj.commentText || createElementObj.text){
                                element = document.createComment(nodeText);
                            } else {
                                return throwOne("You tried making an element with a tag/nodeName that was not a string... what the hell am I supposed to do with this...");
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
                        return throwOne("You tried making an element with a tag/nodeName that was not a string... what the hell am I supposed to do with this...");
                    }

                    //  nodeName??? yes that does exist... but please use tagName there are differences otherwise if all those arent defined just make a div
                    element = d.createElement(elementName || "div");

                    if(createElementObj.dataBindedAttributes){
                        if(!createElementObj.attributes){
                            createElementObj.attributes = {}
                        }

                        createElementObj.dataBindedAttributes && bindAttributes.call(createElementObj.attributes, createElementObj.dataBindedAttributes, renderingData);
                    }

                    //  console.log(createElementObj);

                    //  if createElementObj exists the call extend with the element as the this
                    createElementObj.attributes && extendElement.call(element, createElementObj.attributes);

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
                        //console.log("in this instance", element, createElementObj);
                        element.appendChild( createElement(createElementObj.childrenDataHandling, createElementObj.dataBind || renderingData) );
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

                        //console.log("in here ok", createElementRenderingData);
                        for(var i = 0;i<dataArrayCount;i++){

                            elementName = createElementObj.tagName || createElementObj.tag || createElementObj.nodeName;

                            element = d.createElement(elementName || "div");
                            
                            if(createElementObj.dataBindedAttributes){
                                if(!createElementObj.attributes){
                                    createElementObj.attributes = {}
                                }

                                createElementObj.dataBindedAttributes && bindAttributes.call(createElementObj.attributes, createElementObj.dataBindedAttributes, createElementRenderingData[i]); 
                            }

                            createElementObj.attributes && extendElement.call(element, createElementObj.attributes);

                            containerElementName.appendChild(element);
                        }
                    } else {
                        console.log("I am in this instance... given an object");
                    }
                } else {
                    console.log("what the fuck am I dealing with here");
                }

                return containerElementName;

            }

        } else {

            // i will just fail if you dont use the api correctly
            return throwOne("The first argument should be an object... you passed me "+createElementObj+" which is a "+(typeof createElementObj)+"... I dont want that...");

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
            return throwOne("I think it would be good to at least give me an object to start with - err-0");
        }

        if(typeof createElementObj !== "object" || typeof createElementObj.length === "number" ){
            return throwOne("You either gave me something that is not an object like i am expecting, or probably an array");
        }

        var propsMethodsExist = false,
            validPropertiesExist = false;

        for(var i in createElementObj){
            propsMethodsExist = true;

            //  indexOf doesnt work in old IE god damn
            for(var j=0; j<listOfValidProperties.length; j++){
                if(listOfValidProperties[j] === i){
                    validPropertiesExist = true;
                    break;
                }
            }
        }

        if(!propsMethodsExist){
            return throwOne("Well thats nice you gave me an empty object... what you want me to do with it...");
        }

        if(!validPropertiesExist){
            return throwOne("Well you gave me an object... thats cool but there is really nothing I can do with this...");
        }

        var containerFragment = d.createDocumentFragment();

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

	objectified.name = "Objectified.js";
	objectified.version = "0.7.3";

	objectified.atTheTime = {
		song : "Bastard Child",
		artist : "Master P"
	};

    if(emulateDocumentBool){

        var selfClosingElements = {
            area:1,
            base:1,
            basefont:1,
            br:1,
            col:1,
            command:1,
            embed:1,
            frame:1,
            hr:1,
            img:1,
            input:1,
            isindex:1,
            link:1,
            meta:1,
            param:1,
            source:1
        },

            psuedoElement = function(tagName){
                /* jshint -W001 */
                var self = this;
                this.tagName = tagName;
                this.nodeName = this.tagName;
                this.children = [];
                this.innerHTML = "";
                this.innerText = this.textContext = "";
                this.attributeList = {};
                this.style = {};
                this.dataset = {};
                this.cssText = {};

                this.appendChild = function(childElement){
                    self.children.push(childElement);
                };

                this.setAttribute = function(attributeName, attributeValue){
                    switch(attributeName){
                        case "className":
                            self.attributeList["class"] = attributeValue;
                            break;
                        case "innerHTML":
                        case "innerText": case "textContext":

                            switch(attributeName){
                                case "innerHTML":
                                    this.innerHTML = attributeValue;
                                    break;
                                default:
                                    this.textContext = new psuedoTextNode(attributeValue);
                            }
                            break;
                        default:
                            self.attributeList[attributeName] = attributeValue;
                    }
                };

                this.hasOwnProperty = function(){
                    return false;
                };

                this.renderChildren = function(){
                    var childrenHTMLString = "";
                    for(var i = 0; i < self.children.length; i++){
                        childrenHTMLString += self.children[i].renderSelf();
                    }
                    return childrenHTMLString;
                };

                this.renderAllStyles = function(){
                    var stylesString = "style=\"";
                    for(var i in self.style){
                        if(self.style[i] !== ""){
                            stylesString += i+":"+self.style[i]+";";
                        }
                    }
                    stylesString += "\"";

                    return stylesString;
                };

                this.renderAllAttributes = function(){
                    var attrString = "";
                    for(var i in self.attributeList){
                        if(self.attributeList[i] !== ""){
                            attrString += " "+i+"=\""+self.attributeList[i]+"\"";
                        } else {
                            attrString += " "+i+"";
                        }
                    }
                    return attrString;
                };

                this.renderSelf = function(){
                    //console.log(self.renderAllStyles());
                    if(selfClosingElements[self.tagName]){
                        return "<"+self.tagName+""+self.renderAllAttributes()+">";
                    } else {
                        return "<"+self.tagName+""+self.renderAllAttributes()+">"+self.textContext+""+self.innerHTML+""+self.renderChildren()+"</"+self.tagName+">";
                    }
                };
                this.toString = function(){
                    return this.renderSelf();
                };
            },

            psuedoTextNode = function(text){
                /* jshint -W001 */
                var self = this;
                this.innerText = this.textContext = text;

                this.appendChild = function(childElement){
                    // error out here
                };
                this.setAttribute = function(attributeName, attributeValue){
                    // error out here
                };
                this.hasOwnProperty = function(){
                    return false;
                };
                this.renderChildren = function(){
                    // this needs to error out
                };
                this.renderAllAttributes = function(){
                    // this needs to error out
                };
                this.renderSelf = function(){
                    return self.textContext;
                };
                this.toString = function(){
                    return this.renderSelf();
                };
            },

            psuedoFragment = function(tagName){
                var self = this;
                this.children = [];

                this.appendChild = function(childElement){
                    self.children.push(childElement);
                };
                this.renderChildren = function(){
                    var childrenHTMLString = "";
                    for(var i = 0; i < self.children.length; i++){
                        childrenHTMLString += self.children[i].renderSelf();
                    }
                    return childrenHTMLString;
                };
                this.renderSelf = function(){
                    return self.renderChildren();
                };
                this.toString = function(){
                    return this.renderSelf();
                };
            };

        globalObj.render = function(createElementObj, dataObjToRender){
            return render(createElementObj, dataObjToRender, {
                renderString: true
            });
        };
        // globalObj.extend = extendElement;

        globalObj.document = {
            /*
            got to think these thru cause they reflect the DOM in its 'current' state so its like I would
            have to return those specific elements at the time of it being called/referred to...

            body : function(){
            },
            head : function(){
            },
            documentElement : function(){
            },
                */
            createComment : function(){
                return new psuedoFragment();
            },
            createComment : function(){
                return new psuedoFragment();
            },
            createAttribute : function(){
                return new psuedoFragment();
            },
            createDocumentFragment : function(){
                return new psuedoFragment();
            },
            createTextNode : function(text){
                return new psuedoTextNode(text);
            },
            createElement : function(tagName){
                return new psuedoElement(tagName);
            }
        };

    } else {
        objectified.render = render;
        // objectified.extend = extendElement;        
    }


    var d = globalObj.document;

    return objectified;
}));
