Backbone.Model.prototype.increase = function (key, addition) {
	this.set(key, this.get(key) + addition)
};
	bits = document.getElementById('bits').value;
var Cell = Backbone.Model.extend({
	defaults: {
		value: 0
	},
	inc: function (c) {
		this.set("value", (this.get("value") + c)% Math.pow(2, bits));
	},
	dec: function (c) {
		var val = this.get("value") - c;
		if (val < 0) {
		  val += Math.pow(2, bits)*(Math.ceil(-val/Math.pow(2, bits)));
		}
		this.set("value", val);
	},
	put: function (c) {
		this.set("value", c.charCodeAt(0));
	},
	char: function () {
		return String.fromCharCode(this.get("value"))
	}
});
var Tape = Backbone.Collection.extend({
	model: Cell
});

var Pointer = Backbone.Model.extend({
	defaults: {
		index: 0
	},
	left: function (c) {
		this.increase("index", -c);
	},
	right: function (c) {
		this.increase("index",  c);
	}
});
