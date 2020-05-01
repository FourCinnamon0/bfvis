var inp = document.getElementById("source");

function combine_char(pos, neg, code) {
	var sum = 0;

	for (var i = 0; i < code.length; i++) {
		if (code[i] === pos) {
			sum++;
		}
		else if (code[i] === neg) {
			sum--;
		}
		else {
			throw "Invalid match: " + code[i];
		}
	}

	if (sum >= 0) {
		return Array(sum + 1).join(pos);
	}
	else {
		return Array(-sum + 1).join(neg);
	}
}
var minified = false;
function minify() {
	var code = inp.value,
		compressed, old;
	// remove any non [],.<>+-
	compressed = code.replace(/[^\[\]\.,\+\-<>]/g, "");
	do {
		old = compressed;
		// remove leading [ comment ]
		compressed = compressed.replace(/^\[[^\[\]]*\]/g, "");

		// remove [-][...]
		compressed = compressed.replace(/(\[[\-\+]])\[[^\[\]]*\]/g, "$1");

		// remove useless +- and <> combinations
		compressed = compressed.replace(/[\+\-]*(?:\+-|-\+)[\+\-]*/g,
			combine_char.bind(this, "+", "-"));
		compressed = compressed.replace(/[<>]*(?:<>|><)[<>]*/g,
			combine_char.bind(this, "<", ">"));
	} while (old != compressed)
	inp.value = compressed;
	modal.style.display = "none";
	minified = true;
};
function beautify() {
	if (minified) {
		alert("Why would you want to beautify your code? You minified it in the first place, just press Ctrl + Z it's not that hard.")
	} else {
		alert("Why would you click this button? It's purely decorative and is built to do nothing whatsoever")
	}
	modal.style.display = "none";
}