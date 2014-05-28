/*
	example.js
	===========

*/

var Objectified = require("../js/Objectified.js");

console.log("doing the fullon render", Objectified.render({
	tag:"html",
	attributes:{
		"data-yes":null,
		"data-yea":"",
		"className":"yeaboy"
	}
}) );


/*
console.log("doing the fullon render", Objectified.render({
	tag:"div",
	attributes:{
		"data-yes":null,
		"data-yea":"",
		"className":"yeaboy"
	}
}) );
*/
//console.log("doing the fullon render", Objectified.render({tag:"div"}) );

//console.log("doing the fullon render", Objectified.render({tag:"hr"}) );

/*
console.log("doing the fullon render", Objectified.render({
		tag:"div",
		attributes:{
			title:"popo",
			id:"someContainer",
			className:"haha",
			textContext:"I am textContent"
		},
		children:[{
			tag:"p",
			attributes:{
				className:"hello mom"
			},
			childNodes:[{
				nodeType:3,
				text:"some text"
			}]

		}]
	}) 
);
*/


/*
console.log("doing the fullon render", Objectified.render({
		tag:"div",
		attributes:{
			title:"popo",
			id:"someContainer",
			className:"haha",
			innerHTML:"I am innerhtml",
			textContext:"I am textContent"
		},
		children:[{
			tag:"p",
			attributes:{
				className:"hello mom",
				textContext:"some text"
			},
			children:[{
				tag:"hr",
				attributes:{
					className:"nice"
				}
			}]

		}]
	}) 
);
*/