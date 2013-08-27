describe("reach.Events", function() {
	var Product, product;

	beforeEach(function() {
		Product = reach.extend({
			include: reach.events
		});
		product = new Product;
	});

	it("gets Events methods", function() {
		expect(product.on).toBeDefined();
		expect(product.trigger).toBeDefined();
	});

	it("has 'on' and 'trigger'", function() {
		var triggered = 0;
		product.on('test:event', function() {
			triggered++;
		});
		product.trigger('test:event');
		expect(triggered).toBe(1);
		product.trigger('test:event');
		expect(triggered).toBe(2);
	});
});