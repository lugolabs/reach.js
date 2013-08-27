describe("reach", function () {
	var Product;

	beforeEach(function() {
		Product = reach.extend({
			type: 'product',

			init: function() {
				this.price = 4;
			}
		});
	});

	describe("#extend", function() {
		it("instantiates the class with properties in constructor or in lateral object", function() {
			var product = new Product;
			expect(product.type).toBe('product');
			expect(product.price).toBe(4);
		});

		it("inherits all the parent's properties", function() {
			var Orange = Product.extend({
			});
			var orange = new Orange;
			expect(orange.type).toBe('product');
			expect(orange.price).toBe(4);
		});

		it("overrides parent's properties", function() {
			var Orange = Product.extend({
				type: 'orange',
				init: function() {
					this.price = 7;
				}
			});
			var orange = new Orange;
			expect(orange.type).toBe('orange');
			expect(orange.price).toBe(7);
		});
	});

	describe("#include", function() {
		it("copies the methods from an object", function() {
			var storable = {
				store: 'Wharehouse',
				getStore: function() {
					return this.store;
				}
			};
			var StoredProduct = Product.extend({
				include: storable
			});
			var storedProduct = new StoredProduct;
			expect(storedProduct.store).toBe('Wharehouse');
			expect(storedProduct.getStore()).toBe('Wharehouse');
		});

		it("copies the methods from an array of objects", function() {
			var withSkin = {
				hasSkin: true
			};
			var seasonal = {
				getSummer: function() {
					return 'summer';
				}
			};
			var Pear = Product.extend({
				include: [withSkin, seasonal]
			});
			var pear = new Pear;
			expect(pear.hasSkin).toBe(true);
			expect(pear.getSummer()).toBe('summer');
		});

		it("overrides existing methods", function() {
			var withType = {
				type: 'withType'
			};
			var MultiTyped = Product.extend({
				include: [withType]
			});
			var multiTyped = new MultiTyped;
			expect(multiTyped.type).toBe('withType');
		});
	});
});