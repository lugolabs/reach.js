(function() {

	var reach = this.reach = function() {};

	/* Simple JavaScript Inheritance
	 * By John Resig http://ejohn.org/
	 * MIT Licensed.
	 */
	// Inspired by base2 and Prototype
	(function(){
	  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	 
	  // Create a new Class that inherits from this class
	  reach.extend = function(prop) {
	    var _super = this.prototype;
	   
	    // Instantiate a base class (but only create the instance,
	    // don't run the init constructor)
	    initializing = true;
	    var prototype = new this();
	    initializing = false;
	   
	    // Copy the properties over onto the new prototype
	    for (var name in prop) {
	      // Check if we're overwriting an existing function
	      prototype[name] = typeof prop[name] == "function" &&
	        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
	        (function(name, fn){
	          return function() {
	            var tmp = this._super;
	           
	            // Add a new ._super() method that is the same method
	            // but on the super-class
	            this._super = _super[name];
	           
	            // The method only need to be bound temporarily, so we
	            // remove it when we're done executing
	            var ret = fn.apply(this, arguments);        
	            this._super = tmp;
	           
	            return ret;
	          };
	        })(name, prop[name]) :
	        prop[name];
	    }
	   
	    // The dummy class constructor
	    function reach() {
	     	if (this.include) {
	     		this._mixin.apply(this, this.include instanceof Array ? this.include : [this.include])
	     	}
	      // All construction is actually done in the init method
	      if ( !initializing && this.init )
	        this.init.apply(this, arguments);
	    }
	   
	    // Populate our constructed prototype object
	    reach.prototype = prototype;

	    // Enforce the constructor to be what we expect
	    reach.prototype.constructor = reach;
	 
	    // And make this class extendable
	    reach.extend = arguments.callee;

	    reach.prototype._mixin = function() {
	    	var arg, prop;
	    	for (arg = 0; arg < arguments.length; arg++) {
	    		for (prop in arguments[arg]) {
	    			if (arguments[arg].hasOwnProperty(prop)) {
	    				this[prop] = arguments[arg][prop];
	    			}
	    		}
	    	}
	    }
	   
	    return reach;
	  };
	})();

	/*	

		Inspired by the

		jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)

		Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.

		Original is (c) Dojo Foundation 2004-2009. Released under either AFL or new BSD, see:
		http://dojofoundation.org/license for more information.

	*/	

	reach.events = {

		// the topic/subscription hash
		__eventsCache: {},

		trigger: function(/* String */topic, /* Array? */args){
			// summary: 
			//		Publish some data on a named topic.
			// topic: String
			//		The channel to publish on
			// args: Array?
			//		The data to publish. Each array item is converted into an ordered
			//		arguments on the subscribed functions. 
			//
			// example:
			//		Publish stuff on '/some/topic'. Anything subscribed will be called
			//		with a function signature like: function(a,b,c){ ... }
			//
			//	|		$.publish("/some/topic", ["a","b","c"]);
			var handlers = this.__eventsCache[topic];
			if (!handlers) return;
			for (var i = 0, length = handlers.length; i < length; i++) {
				handlers[i].apply(this, args || [])
			}
		},

		on: function(/* String */topic, /* Function */callback){
			// summary:
			//		Register a callback on a named topic.
			// topic: String
			//		The channel to subscribe to
			// callback: Function
			//		The handler event. Anytime something is $.publish'ed on a 
			//		subscribed channel, the callback will be called with the
			//		published array as ordered arguments.
			//
			// returns: Array
			//		A handle which can be used to unsubscribe this particular subscription.
			//	
			// example:
			//	|	$.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
			//

			if(!this.__eventsCache[topic]){
				this.__eventsCache[topic] = [];
			}
			this.__eventsCache[topic].push(callback);
			return [topic, callback]; // Array
		}

	};

	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licensed
	reach.template = {
	  __templateCache: {},
	 
	  tmpl: function(str, data){
	    // Figure out if we're getting a template, or if we need to
	    // load the template - and be sure to cache the result.
	    var fn = !/\W/.test(str) ?
	      this.__templateCache[str] = this.__templateCache[str] ||
	        this.tmpl(document.getElementById(str).innerHTML) :
	     
	      // Generate a reusable function that will serve as a template
	      // generator (and which will be cached).
	      new Function("obj",
	        "var p=[],print=function(){p.push.apply(p,arguments);};" +
	       
	        // Introduce the data as local variables using with(){}
	        "with(obj){p.push('" +
	       
	        // Convert the template into pure JavaScript
	        str
	          .replace(/[\r\t\n]/g, " ")
	          .split("<%").join("\t")
	          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
	          .replace(/\t=(.*?)%>/g, "',$1,'")
	          .split("\t").join("');")
	          .split("%>").join("p.push('")
	          .split("\r").join("\\'")
	      + "');}return p.join('');");
	   
	    // Provide some basic currying to the user
	    return data ? fn( data ) : fn;
	  }
	};

})();