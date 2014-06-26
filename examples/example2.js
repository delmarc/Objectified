/*
	example.js
	===========

*/

var Objectified = require("../js/Objectified.js");

console.log("doing the fullon render", Objectified.render({
                tag:"div",
                children:[{
                    tag:"h1",
                    dataBindedAttributes:{
                        innerHTML:["header","text"]
                    }
                },{
                    tag:"p",
                    dataBindedAttributes:{
                        innerHTML:["text"]
                    }
                }]
        }, {
            "header":{
                "text":"some bull that is a h1"
            },
            "text":"well the p text"
        }) 
);
