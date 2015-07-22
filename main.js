var display_val = "";
var new_operand = "";
var equation_array = [];
var answer = "";

function input_digit(n) {
    display_val = display_val + n;
    new_operand = new_operand +n;
    update_display();
    
};

function operator(x){
	display_val = display_val + x;
	var new_operator = x; 
	equation_array.push(new_operand);
	new_operand = '';
	equation_array.push(new_operator);
	new_operator = '';
	update_display();
}

function update_display(){
	$("#display_input").val(display_val);
	console.log("Display value is:",display_val);
	console.log("equation Array is:",equation_array);
}

function AC() {
    $("#display_input").val("");
    display_val = "";
    equation_array = [];
    console.log("input display cleared")
}

function C() {
    display_val = display_val.substr(0,display_val.length-1);
    console.log("last character deleted");
    update_display();
}

function equals(e) {
	$("#display_history").val(display_val);
	equation_array.push(new_operand);
	new_operand = '';
	calculate();
	display_val = e + answer;
	update_display(); 
}

function calculate() {
	//// sort values to calculate
	var operand1 = '';
	var operator = '';
	var operand2 = '';
	for (var i = 0; i < equation_array.length; i+=3) {
		operand1 = equation_array[i];
		operator = equation_array[i+1];
		operand2 = equation_array[i+2];
	};
	console.log(operand1,operator,operand2);
	switch(operator){
		case "+":
			answer = parseFloat(operand1) + parseFloat(operand2);
			break;
		case "-":
			answer = parseFloat(operand1) - parseFloat(operand2);
			break;
		case "x":
			answer = parseFloat(operand1) * parseFloat(operand2);
			break;
		case "/":
			answer = parseFloat(operand1) / parseFloat(operand2);
			break;
	}

}
