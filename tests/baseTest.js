var assert = require("assert"),

	Objectified = require("../built/Objectified.min.js"),
	publicMethodCount;

function toErIsHuman(){
	throw new Error();
}

// check if Objectified is an object
describe("Objectified", function(){
	it("should return \"Object\" on typeof of Objectified", function(){
		assert.equal("object", typeof Objectified);
	});
});

// check if Objectified.render is a function
describe("Objectified", function(){
	describe('#render', function(){
		it("should return \"function\" on typeof of Objectified.render", function(){
			assert.equal("function", typeof Objectified.render);
		});
	});
});

// check if Objectified.render being called 
describe("Objectified", function(){
	describe('#render()', function(){
		it("should return \"error\" on Objectified.render() when nothing is passed thru", function(){
			//assert.throws( Objectified.render(), "Error: I think it would be good to at least give me an object to start with" );
			assert.throws(
				function(){
					Objectified.render();
				}, function(err){
					if( err instanceof Error ){
						return true;
					} else {
						return false;
					}
				},"I think it would be good to at least give me an object to start with");
		});
	});
});

// make sure Objectified has only one public method...
describe("Objectified", function(){
	var publicMethodCount = 0;
	for(var i in Objectified){
		if( typeof Objectified[i] === "function" ){
			publicMethodCount++;
		}
	}

	it("should return 1 since the only public method/function is render, unless you running in a node-like environment you wont even have properties", function(){
		assert.equal(1, publicMethodCount);
	});
});
