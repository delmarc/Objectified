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

	function renderAnElementForMe(appendingElem, JSONdata, obj){
		var element = createA(obj.tag);
		var attributes = obj.attributes;

		for(var attr in attributes){
			if( element.hasOwnProperty(attr) ){
				element[attr] = attributes[attr];
			} else {
				element.setAttribute(attr,attributes[attr]);
			}		
		}

		if(obj.data){
			if(typeof obj.data === "string"){
				renderATextNodeForMe(element,obj.data);
			//} else if(typeof obj.data === "object"){
			}
		}

		if(obj.childNodes){
			renderForMe(obj, JSONdata, element);
		}

		appendingElem.appendChild(element);
	}

	function renderATextNodeForMe(appendingElem, obj){
		var element = createATextNode(obj);
		appendingElem.appendChild(element);
	}

	function renderForMe(JSONtemplate,JSONdata,containerFragment){
		for(var i in JSONtemplate.childNodes){
			if(typeof JSONtemplate.childNodes[i] === "string"){
				renderATextNodeForMe(containerFragment,JSONtemplate.childNodes[i]);
			} else if(typeof JSONtemplate.childNodes[i] === "object"){
				if(JSONtemplate.childNodes[i].tag){
					renderAnElementForMe(containerFragment,JSONdata,JSONtemplate.childNodes[i]);
				}
			}
		}
	}

	function render(JSONtemplate,JSONdata,whereToPlaceIt){
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
