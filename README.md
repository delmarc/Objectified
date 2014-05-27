Objectified
===========

This is an attempt in order to get people thinking about templating differently... I mean lets be honest... the script tag being used the way it is with templates and such (while smart and understandable as to why it was done) is a hack...


###### Objectified was started 12/27/13
###### Current version - 0.6.1 - 5/20/14


TODOS
-----

1. have to write it to work with all the different module types... I have only worked with browsers and node


Why???
------

More like why not... I am not a fan of where certain things are going on like with all these strings being processed on the fly by the client for example... I mean, I dont _mind_ but I was like "you know what... since I always say what I say about all this new stuff happening in the JavaScript world, why dont I do anything about it"

Well here it is... This is me doing something about it...


But still why???
----------------

__Well__, there was a project that I had to start at work. Since I didnt want to use anything that already exists because I _partially_ hate them, this is what I did...


Basic Examples
===========

Objectified is nothing more then a template rendering engine if you will... it just returns documentfragments in which you can then append where ever you please... In a Node environment, I have lightly emulated the ability to create document fragments and elements... This is all done with JSON... so if you know how to properly build elements with javascript and understand the way it all works... This is nothing more then creating fragments or even whole documents with JSON...

First Example
-------------

Its pretty simple to explain so here is the first example

Objectified.render({
	tagName:"p",
	attributes:{
		innerHTML:"some nice text"
	}
});

That will obviously produce what is below

<p>some nice text</p>

You can either edit straight on the innerHTML or even do what is below...


Second Example
--------------

Objectified.render({
	tagName:"div",
	attributes:{
		id:"aNiceId"
	},
	childNodes:[{
		tagName:"h1",
		attributes:{
			className:"someClass"
		},
		childNodes:[{
			nodeType:3,
			text:"some header text"
		}]
	},{
		tagName:"p",
	}]
});

That will obviously produce what is below

<p>some nice text</p>


I'll create a more understandable page but this will do for now


Delmarc
