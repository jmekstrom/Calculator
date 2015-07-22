var display_val = "";
var new_operand = "";
var operands = [];

function input_digit(n) {
    display_val = display_val + n;
    new_operand = new_operand +n;
    update_display();
    
};

function operator(x){
	display_val = display_val + x;
	operands.push(new_operand);
	new_operand = '';
	update_display();
}

function update_display(){
	$("#display_input").val(display_val);
	console.log("Display value is:",display_val);
	console.log("Input Array:",operands);
}

function AC() {
    $("#display_input").val("");
    display_val = "";
    operands = [];
    console.log("input display cleared")
}

function C() {
    display_val = display_val.substr(0,display_val.length-1);
    console.log("last character deleted");
    update_display();
}

function equals(e) {
	$("#display_history").val(display_val);
	var answer = eval(display_val);
	display_val = answer;
	update_display(); 
}