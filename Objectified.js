/*
	
*/

(function (root, factory){
	if (typeof exports === "object" && exports) {
		// CommonJS
		factory(exports);
	} else {
		var objectified = {};
		factory(objectified,root);
		if (typeof define === "function" && define.amd) {
			// AMD
			define(objectified);
		} else {
			// <script> aka normal circumstances
			root.Objectified = objectified;
		}
	}
}(this, function(objectified, globalObj){
	// have to do catches for node and such
	// console.log(globalObj);

	var d = document,
		b = d.body,
		areYouIE = !!globalObj.attachEvent;


	function createA(elementString){
		return d.createElement(elementString);
	}
	function createATextNode(textString){
		return d.createTextNode(textString);
	}


	function applyStylesOnObj(DOMobject, styles){
		for(var style in styles){
			DOMobject.style[style] = styles[style];
		}
	}

	function extendAttrsOnObj(element, attributes){
		for(var attr in attributes){
			try{
				if(attr === "style"){
					applyStylesOnObj(element,attributes[attr]);
				} else if( element.hasOwnProperty(attr) ){
					element[attr] = attributes[attr];
				} else {
					switch(attr){
						case "class":
						case "className":
						case "c":
							if(element.className){
								element.className = attributes[attr];
							} else {
								element.setAttribute("class",attributes[attr]);
							}
							break;
						case "innerText":
						case "text":
						case "Text":
						case "t":
							if(element.innerText){
								element.innerText = attributes[attr];
							} else {
								element.textContent = attributes[attr];
							}
							break;
						case "innerHTML":
						case "html":
						case "HTML":
						case "H":
							element.innerHTML = attributes[attr];
							break;
						default:
							element.setAttribute(attr,attributes[attr]);
					}
				}
			} catch(e){
				// catching something cause i needed to know what was happening
				console.error(e)
				console.log(element, attributes)
			}
		}
	}

	function renderAnElementForMe(appendingElem, JSONdata, obj, returnElem){
		var element = createA(obj.tag),
			attributes = obj.attributes;

		if(attributes){
			extendAttrsOnObj(element, attributes);
		}

		if(obj.data){
			if(typeof JSONdata[obj.data] === "string"){
				renderATextNodeForMe(element,JSONdata[obj.data]);
			} else if(typeof JSONdata[obj.data] === "object"){
				extendAttrsOnObj(element, JSONdata[obj.data]);
			}
		} else if (obj.passedData){
			extendAttrsOnObj(element, obj.passedData);
		}

		if(obj.childNodes && !obj.childLooped){
			renderForMe(obj, JSONdata, element);
		}

		appendingElem.appendChild(element);

		if(returnElem){
			return element
		}
	}

	function renderATextNodeForMe(appendingElem, obj){
		var element = createATextNode(obj);
		appendingElem.appendChild(element);
	}

	function renderForMe(JSONtemplate,JSONdata,containerFragment){
		for(var i in JSONtemplate.childNodes){
			if(typeof JSONtemplate.childNodes[i] === "function"){
				// have to do a better check and not only depend on typeof
				containerFragment.appendChild( document.createElement("p") );
			} else if(typeof JSONtemplate.childNodes[i] === "string"){
				renderATextNodeForMe(containerFragment,JSONtemplate.childNodes[i]);
			} else if(typeof JSONtemplate.childNodes[i] === "object" && JSONtemplate.childNodes[i].childLooped){
				var childContainer = renderAnElementForMe(containerFragment,JSONdata,JSONtemplate.childNodes[i],true);

				if(typeof JSONtemplate.childNodes[i].childData === "object"){
					for(var j = 0;j<JSONtemplate.childNodes[i].childData.length;j++){
						JSONtemplate.childNodes[i].childNodes[0].passedData = JSONtemplate.childNodes[i].childData[j];

						renderAnElementForMe(childContainer,
							JSONtemplate.childNodes[i].childData[j],
							JSONtemplate.childNodes[i].childNodes[0]);
					}
				} else {
					for(var j = 0;j<JSONdata[JSONtemplate.childNodes[i].childData].length;j++){
						JSONtemplate.childNodes[i].childNodes[0].passedData = JSONdata[JSONtemplate.childNodes[i].childData][j];

						renderAnElementForMe(childContainer,
							JSONdata[JSONtemplate.childNodes[i].childData][j],
							JSONtemplate.childNodes[i].childNodes[0]);
					}
				}
			} else if(typeof JSONtemplate.childNodes[i] === "object" && JSONtemplate.childNodes[i].tag) {
				if(JSONtemplate.childNodes[i].data || JSONtemplate.childNodes[i].childData){
					renderAnElementForMe(containerFragment,JSONdata,JSONtemplate.childNodes[i]);
				} else {
					renderAnElementForMe(containerFragment,JSONdata,JSONtemplate.childNodes[i]);
				}
			}
		}
	}

	function render(JSONtemplate, JSONdata, whereToPlaceIt, callMeBack){
		var containerFragment = d.createDocumentFragment(),
			placedInTo = null;

		// think this again

		renderForMe(JSONtemplate,JSONdata,containerFragment);

		if(whereToPlaceIt){
			if(typeof whereToPlaceIt === "object"){
				whereToPlaceIt.appendChild(containerFragment);
			} else {
				var placedInTo = document.getElementbyId(whereToPlaceIt);
				placedInTo.innerHTML = "";
				placedInTo.appendChild(containerFragment);
			}
		} else {
			b.appendChild(containerFragment);
		}

		JSONtemplate.callback && JSONtemplate.callback(placedInTo || whereToPlaceIt);
	}

	objectified.name = "Objectified.js";
	objectified.version = "0.0.7";
	objectified.render = render;

}));
