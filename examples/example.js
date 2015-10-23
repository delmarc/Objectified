/*
	example.js
	===========

*/

var Objectified = require("../static/js/Objectified.js");


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
