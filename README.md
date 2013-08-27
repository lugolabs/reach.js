#reach.js

A collection of scripts that extend JavaScript with Object Oriented features:

- *extend* to create classes (based on John Resig' simpleInheritance)
- *include* to include objects into modules
- *pubsub* to add custom events to classes (based on jQuery plugin, pubsub, by Peter Higgins)
- *tmpl* to add templating functionality to classes (based on microTemplating by Jogn Resig)

## Usage

Let's create a simple `Product` class:

```js
var Product = reach.extend({
	type: 'product',

	init: function() {
		this.price = 87;
	}
});
```

And now a child class of `Product`:

```js
var Fruit = Product.extend({
	type: 'fruit',

	init: function() {
		this._super();
		this.price = this.price + 10;
	}
});
var fruit = new Fruit;
```

Our new `fruit` object overrides the `type` property, and it now has a value = *fruit*. The `init` function serves as the constructor of the new instance. Calling `_super` in it, or in any other overriden method, calls the same method of the parent class. Check the [original article](http://ejohn.org/blog/simple-javascript-inheritance/) by John Resig.

## Specs

The specs are written in [jasmine](http://pivotal.github.io/jasmine/) and are run on [karma](http://karma-runner.github.io/0.10/index.html) with the jasmine adapter.

You can also check this [lugolabs](http://lugolabs.com/blog/2013/05/28/testing-javascript-with-karma) walkthrough, how to run the specs on karma.

#

MIT Licence