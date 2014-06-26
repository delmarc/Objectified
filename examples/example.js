/*
	example.js
	===========

*/

var Objectified = require("../js/Objectified.js");

/*
console.log("doing the fullon render", Objectified.render({
		tag:"ul",
		dataBind:dataObj,
		childrenDataHandling:{
			tagName : "li"*,
			innerHTML : dataObj.list*
		}
	},{	
		list : ["home","about","test","contact us","love, peace &amp; chicken grease"]
	}));
*/


/*
console.log("doing the fullon render", Objectified.render({
	tag:"html",
	attributes:{
		"data-yes":null,
		"data-yea":"",
		"className":"yeaboy"
	}
}) );
*/

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

console.log("-----")


console.log("doing the fullon render with a simple object", Objectified.render({
        tag:"div",
        children:[{
            tag:"h1",
            dataBindedAttributes:{
                innerHTML:["header","text"]
            },
            children:[{
                tag:"a",
                attributes:{
                    innerHTML:"linky link"
                },
                dataBindedAttributes:{
                    href:["header","link"]
                }
            }]
        },{
            tag:"p",
            dataBindedAttributes:{
                innerHTML:["text"]
            }
        }]
    }, {
        "header":{
            "text":"another header text",
            "link":"#"
        },
        "text":"well the p text"
    })
);
