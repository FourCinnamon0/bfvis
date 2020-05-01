class InputBuffer {
	initialized = false;
	buffer = '';
	hasInput() {
		if (!this.initialized) {
			this.init();
		}
		return (this.buffer.length > 0);
	}
	init() {
		for (var i = 0, pipe = false; i < source.length; i++) {
			if (pipe) {
				this.buffer += source[i];
			}

			if (source[i] == '!') {
				pipe = true;
			}
		}
		this.initialized = true;
	};
	getNext() {
		var c = this.buffer.charCodeAt(0);
		this.buffer = this.buffer.substring(1);
		return c;
	};
}
class Interpreter {
	inputBuffer = new InputBuffer();
	tokens = "<>+-.,[]!";
	jumps = [];
	instrPtr = 0;
	/**
	 * 
	 * @param {string} source 
	 * @param {*} tape 
	 * @param {*} pointer 
	 * @param {(char: string) => void} out 
	 * @param {*} awaitInput 
	 * @param {*} instruction 
	 */
	constructor(source, tape, pointer, out, awaitInput, instruction) {
		this.source = source;
		this.tape = tape;
		this.pointer = pointer;
		this.out = out;
		this.awaitInput = awaitInput;
		this.instruction = instruction;
	}
	checkSyntax() {
		var d = 0, i = 0, token = "";
		while (i < this.source.length) {
			token = source[i++];

			if (token === "[") d++;
			else if (token === "]") d--;

			if (d < 0) break;
		}
		if (d > 0) throw new Error("SyntaxError: Missing parenthesis \"]\"");
		else if (d < 0) throw new Error("SyntaxError: Wrong parenthesis \"]\"");
	}
	next(optimize) {
		if (this.instrPtr >= this.source.length) {
			if (this.jumps.length === 0) throw {
				"name": "End",
				"message": "End of BF script."
			};
			else {
				throw new Error("Mismatched parentheses.");
			}
		}

		// Skip non-code characters
		if (this.tokens.indexOf(this.source[this.instrPtr]) === -1) {
			this.instrPtr++;
			return this.next(optimize);
		}
		let ramPtr = this.pointer.get("index");
		if (ramPtr < 0 || ramPtr >= this.tape.models.length) {
			throw new Error("Memory error: " + ramPtr);			//TODO: rollover pointer
		}
		this.instruction(this.instrPtr);
		let token =  this.source[this.instrPtr];
		let cell = this.tape.models[ramPtr];
		let lookahead;
		switch (token) {
			case "<":
				lookahead = 1;
				while (optimize && source[this.instrPtr + lookahead] === "<") {
					lookahead++;
				}
				this.instrPtr += lookahead - 1;
				this.pointer.left(lookahead);
				break;

			case ">":
				lookahead = 1;
				while (optimize && source[this.instrPtr + lookahead] === ">") {
					lookahead++;
				}
				this.instrPtr += lookahead - 1;
				this.pointer.right(lookahead);
				break;

			case "-":
				lookahead = 1;
				while (optimize && source[this.instrPtr + lookahead] === "-") {
					lookahead++;
				}
				this.instrPtr += lookahead - 1;
				cell.dec(lookahead);
				break;

			case "+":
				lookahead = 1;
				while (optimize && source[this.instrPtr + lookahead] === "+") {
					lookahead++;
				}
				this.instrPtr += lookahead - 1;
				cell.inc(lookahead);
				break;

			case ",":
				if ($('#exclaim').is(':checked')) {																//optimise
					if (inputBuffer.hasInput()) {
						cell.set("value", inputBuffer.getNext());
					} else {
						this.awaitInput(cell);
					}
				} else {
					this.awaitInput(cell);
				}
				break;

			case ".":
				this.out(cell);																						//optimise
				break;

			case "[":
				if (optimize && source[this.instrPtr + 1] === "-" && source[this.instrPtr + 2] === "]") {
					cell.set("value", 0);
				}
				if (cell.get("value") != 0) {
					this.jumps.push(this.instrPtr);
				} else {
					var loops = 1;
					while (loops > 0) {
						this.instrPtr++;
						if (this.instrPtr >= source.length) {
							throw error("Mismatched parentheses.");
						}

						if (source[this.instrPtr] === "]") {
							loops--;
						} else if (source[this.instrPtr] === "[") {
							loops++;
						}
					}
				}
				break;

			case "]":
				if (this.jumps.length === 0) {
					throw error("Mismatched parentheses.");
				}

				if (cell.get("value") != 0) {
					this.instrPtr = this.jumps.slice(-1)[0];
				} else {
					this.jumps.pop();
				}
				break;
			case "!":
				this.tokens = "";
				break;
		}
		return this.instrPtr++;
	}
}