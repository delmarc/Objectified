/*

*/

(function (root, factory){
	if (typeof exports === "object" && exports) {
		// CommonJS
		factory(exports);
	} else {
		var objectified = {};
		factory(objectified);
		if (typeof define === "function" && define.amd) {
			// AMD
			define(objectified);
		} else {
			// <script> aka normal circumstances
			root.Objectified = objectified;
		}
	}
}(this, function(objectified){

	// shortener
	var d = document,
		b = d.body;

	function createA(elementString){
		return d.createElement(elementString);
	}
	function createATextNode(textString){
		return d.createTextNode(textString);
	}


	function extendAttrOnObj(element, attributes){
		for(var attr in attributes){
			if( element.hasOwnProperty(attr) ){
				element[attr] = attributes[attr];
			} else {
				element.setAttribute(attr,attributes[attr]);
			}
		}
	}

	function renderAnElementForMe(appendingElem, JSONdata, obj, returnElem){
		var element = createA(obj.tag);
		var attributes = obj.attributes;

		extendAttrOnObj(element, attributes);

		if(obj.data){
			if(typeof JSONdata[obj.data] === "string"){
			//if(typeof obj.data === "string"){
				renderATextNodeForMe(element,JSONdata[obj.data]);
			} else if(typeof JSONdata[obj.data] === "object"){
				//console.log(element, obj, JSONdata);
				extendAttrOnObj(element, JSONdata[obj.data]);
			}
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
			if(typeof JSONtemplate.childNodes[i] === "string"){
				renderATextNodeForMe(containerFragment,JSONtemplate.childNodes[i]);
			} else if(typeof JSONtemplate.childNodes[i] === "object" && JSONtemplate.childNodes[i].childLooped){
				var childContainer = renderAnElementForMe(containerFragment,JSONdata,JSONtemplate.childNodes[i],true);
				for(var j = 0;j<JSONdata[JSONtemplate.childNodes[i].childData].length;j++){
					renderAnElementForMe(childContainer,
						JSONdata[JSONtemplate.childNodes[i].childData][j],
						JSONtemplate.childNodes[i].childNodes[0]);
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

	function render(JSONtemplate, JSONdata, whereToPlaceIt){
		var containerFragment = d.createDocumentFragment();

		renderForMe(JSONtemplate,JSONdata,containerFragment);

		if(whereToPlaceIt){
			document.getElementbyId(whereToPlaceIt).appendChild(containerFragment);
		} else {
			b.appendChild(containerFragment);
		}
	}

	objectified.name = "Objectified.js";
	objectified.version = "0.0.1";
	objectified.render = render;

}));
