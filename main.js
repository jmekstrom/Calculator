//global varibale declarations
var display_val = "";
var new_operand = "";
var equation_array = [];
var answer = "";
var new_operator = '';
var digit_click_num = 0;
var operator_click_num = 0;
var divid_by_zero = false;
var neg = 1;
var equals_just_used;
///////////////////////////////



function input_digit(n) {
	if(equals_just_used){
		AC();
	}
	equals_just_used = false;
	operator_click_num = 0;
	digit_click_num++;
    update_variables('digit',n);
    update_display();
    
};

function operator(x){
	equals_just_used = false;
	digit_click_num = 0;
	operator_click_num++;
	update_variables('operator',x);
	update_display();
}

function negate(){
	neg = neg * (-1);
	console.log(neg);
	if(neg == -1){
		display_val= "-"+display_val;
	}
	else{
		console.log(display_val);
		display_val = display_val.substr(1);
	}
	update_display();

}

function update_display(){
	$("#display_input").val(display_val);
	console.log("Display value is:",display_val);
	console.log("equation Array is:",equation_array);
}

function AC() {
	digit_click_num = 0;
    $("#display_input").val("");
    display_val = "";
    equation_array = [];
    new_operand = "";
    console.log("input display cleared",equation_array)
}

function C() {
	//delete last character in the display
    display_val = display_val.substr(0,display_val.length-1);
    //deletes the last element in the array
    equation_array.pop();
    console.log("last character deleted");
    update_display();
}

function equals(e) {
	$("#display_history").val(display_val);
	calculate();
	if(!divid_by_zero){
		display_val = neg * answer;
		display_val = display_val.toString();
	}
	update_display(); 
	update_variables();
	equals_just_used = true;
}

function calculate() {
	// sort values to calculate
	var operand1 = '';
	var operator = '';
	var operand2 = '';
	special_case();

	if(divid_by_zero){
		return;
	}
	for (var i = 0; i < equation_array.length; i+=2) {
		if(i == 0){
			operand1 = equation_array[i];
		}
		else{
			operand1 = answer;
		}
		operator = equation_array[i+1];
		operand2 = equation_array[i+2];

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
		case "^":
			answer = Math.pow(parseFloat(operand1),parseFloat(operand2));
			break;	
	}
	}	

}

function update_variables(state,input){
	switch(state){

		case 'digit':
			display_val = display_val + input;
    		new_operand = new_operand + input;
    		if(digit_click_num <= 1){
    			equation_array.push(new_operand);
    		}
    		else{
    			equation_array[equation_array.length-1] = new_operand;
    		}
    		break;

    	case 'operator':
    			new_operator = input; 
    		if(operator_click_num <= 1){ 
				equation_array.push(new_operator);
    		}
    		else{
    			equation_array.pop();
    			equation_array.push(new_operator);
    			display_val = display_val.substr(0,display_val.length-1);
			}
				display_val = display_val + input;
				new_operand = '';
				new_operator = '';
    		break;

    	case equals:
    		equation_array = [];
    		equation_array.push(answer);
    		break;
}
}

function special_case(){
	//The inserts a zero if the first input is subtraction, to produce a negative number
	if(equation_array[0] == "-"){
				equation_array.unshift("0");
			}

	//Checks for a divid by zero case		
	for (var i = 0; i < equation_array.length; i++) {
		if(equation_array[i] == "/" && equation_array[i+1] == 0){
			display_val = "Cannot Divid By Zero!"
			divid_by_zero = true;
		}
	};

	//Need to add
	//Checks for an equation ending with an operation

}

function parenthesis(){
	
}
