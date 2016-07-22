/*
	example.js
	===========

*/

var Objectified = require("../../built/Objectified-container.js");

console.log("-- Objectified Container --");

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

var OH = Objectified.init({
    "modulePropertiesObject":{
        "render":{
            "attributeMapping":{
                "iH":"innerHTML"
            }
        }
    }
});

console.log(O);

console.log(O.instancePropertyObject.modulePropertiesObject);

console.log(OH.instancePropertyObject.modulePropertiesObject);
