describe("reach.tmpl", function() {
	var TemplatedView, view;

	beforeEach(function() {
		TemplatedView = reach.extend({
			include: reach.template
		});
		view = new TemplatedView;
	});

	it("has template", function() {
		expect(view.tmpl).toBeDefined();
	});

	it("executes the template", function() {
		var data = {
			firstName: 'John',
			lastName: 'Smith'
		};
		var markup = "Hello <%= firstName %> <%= lastName %>!";
		var rendered = view.tmpl(markup, data);
		expect(rendered).toBeDefined('Hello John Smith!');
	});	
});