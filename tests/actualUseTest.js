var assert = require("assert"),
	Objectified = require("../js/Objectified.js"),
//	These below are used for testing purposes...
	invalidObject = {
		asdf:{}
	},
	invalidTagAsArray = {
		tag:[]
	},
	nearInfiniteDomAddition = {
		tag:"div"
	},
	basic = {
		tag:"div"
	};


// call render with an empty object 
describe("Objectified", function(){
	describe('#render()', function(){
		it("should return \"error\" on Objectified.render() when and empty object is passed thru", function(){
			assert.throws(
				function(){
					Objectified.render({});
				}, function(err){
					if( err instanceof Error ){
						return true;
					} else {
						return false;
					}
				},"oh no you gave me an empty object");
		});
	});
});


// call render with an object that has no valid properties
describe("Objectified", function(){
	describe('#render()', function(){
		it("should return \"error\" on Objectified.render() when an object with no valid properties is passed thru", function(){
			assert.throws(
				function(){
					Objectified.render(invalidObject);
				}, function(err){
					if( err instanceof Error ){
						return true;
					} else {
						return false;
					}
				},"Aww man you gave me an object that doesnt have the right properties we are looking for... aka not the right format");
		});
	});
});


// call render with an object that has a tag property that is an array... weird but still
describe("Objectified", function(){
	describe('#render()', function(){
		it("should return \"error\" on Objectified.render() when an object with the tag property given a value of an array... that sentence sounds weird", function(){
			assert.throws(
				function(){
					Objectified.render(invalidTagAsArray);
				}, function(err){
					if( err instanceof Error ){
						return true;
					} else {
						return false;
					}
				},"ok so tag, tagName and nodeName can only be a String type, anything else and you will have me questioning you...");
		});
	});
});


// Actually creating DOM elements but various ways
describe("Objectified", function(){
	describe('#render()', function(){
		it("So I should recieve P elements while using either tag, tagName, or nodeName(but nodeName needs a 1 as the nodeType)", function(){
			// actually I have to do this...
		});
	});
});
