Objectified
===========

This is an attempt in order to get people thinking about templating differently... I mean lets be honest... the script tag being used the way it is with templates and such (while smart and understandable as to why it was done) is a hack...

###### Old Objectified was ended 7/22/16
###### Current Objectified was made master 7/22/16
###### Current version - 0.9.0 - 7/22/16

TODOS
-----

1. Get the Client based module working like it used to... rewrites suck like that
2. Follow up with the Node based module after the Client version is cool

Why???
------

More like why not... I am not a fan of where certain things are going on like with all these strings being processed on the fly by the client for example... I mean, I dont _mind_ but I was like "you know what... since I always say what I say about all this new stuff happening in the JavaScript world, why dont I do anything about it"

Well here it is... This is me doing something about it...


But still why???
----------------

I didn't like what I wrote before... it had the node handling and the client handling in the same code... not optimal... so did a module like pattern so we can build up exactly what we want and somewhat standardize what a module might look like but what it needs to play nice within this set way of doing things...

Setup
=====

Umm... just do npm install... then do npm start... and go to the examples folder and you'd get a idea of where I am going with this...


Basic Examples
==============

Objectified is nothing more then a template rendering engine if you will... it just returns documentFragments in which you can then append where ever you please... In a Node environment, I have lightly emulated the ability to create document fragments and elements... This is all done with JSON... so if you know how to properly build elements with javascript and understand the way it all works... This is nothing more then creating fragments or even whole documents with JSON...

First Example
-------------

Its pretty simple to explain so here is the first example

```javascript
Objectified.render({
	tagName:"p",
	attributes:{
		innerHTML:"some nice text"
	}
});
```

That will obviously produce what is below

```html
<p>some nice text</p>
```

You can either edit straight on the innerHTML, textContent/innerText or even do what is below...


Second Example
--------------

```javascript
Objectified.render({tagName:"div",
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
```

That will obviously produce what is below
```html
<div id="aNiceId">
    <h1 class="someClass">some header text</h1>
</div>
```


Third Example
--------------
```javascript
Objectified.render({
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
});
```


The data object that is the second parameter is used to populate the template from the first parameter...

```html
<div>
    <h1>some bull that is a h1</h1>
    <p>well the p text</p>
</div>
```

There is still alot more I have to do with this... but as with all things... its a process

I'll create a more understandable page with more examples but this will do for now...

Delmarc
