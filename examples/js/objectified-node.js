/*
	example.js
	===========

*/

var Objectified = require("../../built/Objectified-node.js");

console.log("-- Objectified Node --");

console.log(Objectified);

console.log("-----");

var O = Objectified.init({
    "modulePropertiesObject":{
        "render":{
            "attributeMapping":{
                "iH":"innerHTML",
                "c":"className",
                "i":"id",
                "S":"style"
            }
        }
    }
});

console.log(O.render({
    "tagName":"header",
    "attributes":{
        "c":"someClass",
        "i":"header",
        "iH":"INNER STUFF",
        "S":{
            "border":"1px solid #ff0000"
        }
    }
}));

console.log("-----");
