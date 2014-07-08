/*
	example.js
	===========

*/

var Objectified = require("../js/Objectified.js");

console.log("doing the fullon render", Objectified.render({
            tag:"div",
            children:[{
                tag:"p",
                dataBindedAttributes:{
                    innerHTML:["p","text"]
                },
                attributes:{
                    className:"oh snap",
                    style:{
                        color:"#ff00ff",
                        borderBottom:"1px solid #ff0000"
                    }
                }
            }],
            attributes:{
                id:"someid",
                dataset:{
                    hello:"mom",
                    HelloYOmom:"yea buddy"
                }
            }

        },{
            "p":{
                "text":"lorem ipsum text"
            },
            "text":"well the p text"
        })
);
