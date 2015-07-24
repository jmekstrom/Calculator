//global varibale declarations
///////////////////////////////
var display_val = "";
var new_operand = "";
var equation_array = [];
var answer = "";
var new_operator = '';
var digit_click_num = 0;
var operator_click_num = 0;
var divid_by_zero = false;
var mult_by_neg1 = false;
var equals_just_used;
var edited_operand = "";
///////////////////////////////


//Input Functions, functions are all called by a button click
///////////////////////////////////////////////////////////////////////////////////
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
	if(is_operator(equation_array[0])){
		return;
	}
	var negated_element = parseFloat(equation_array[0])*(-1);
	equation_array[0] = negated_element.toString();
	console.log(negated_element);

	update_display();
}

function AC() {
	digit_click_num = 0;
    $("#display_input").val("");
    display_val = "";
    equation_array = [];
    new_operand = "";
    console.log("All Cleared",equation_array)
}

function C() {
	//checks to see if the equation array is already empty from previous C() calls
	if(equation_array[0] == "" || equation_array.length == 0){
   		AC();
   		return;
   	}
	//delete last character in the display
    display_val = display_val.substr(0,display_val.length-1);
    //deletes the last element in the equation array
    edited_operand = equation_array.pop();
    if(edited_operand == ""){
    	edited_operand = equation_array.pop();
    }
    edited_operand = edited_operand.substr(0,edited_operand.length-1);
    equation_array.push(edited_operand);
    console.log("Last input cleared");
    update_display();
}

function equals(e) {
	//stores equation to be calculated into the history display
	$("#display_history").val(display_val);

	calculate();
	console.log("divid_by_zero being called",divid_by_zero,display_val)
	//checks to see if a division of zero has occured, if not proceed as normal
	if(!divid_by_zero){
		display_val = answer;
		equation_array = [];
		equation_array[0] = display_val.toString();
	}

	update_display(); 
	equals_just_used = true;

	
}

function parenthesis(){

}

function percentage(){
	equals();
}
/////////////////////////////////////////////////////////////////////////////////////////


//Calculation functions
/////////////////////////////////////////////////////////////////////////////////////////
function calculate() {
	// sorts values to calculate
	var operand1 = '';
	var operator = '';
	var operand2 = '';

	special_cases();

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

function special_cases(){
	//Inserts a zero into index 1 of equation array if the first input is an operation
	if(is_operator(equation_array[0])){
				equation_array.unshift("0");
	};

	//Checks for a divid by zero case		
	for (var i = 0; i < equation_array.length; i++) {
		if(equation_array[i] == "/" && equation_array[i+1] == 0){
			display_val = "Cannot Divid By Zero!"
			divid_by_zero = true;
		}
	};

	//Checks if an equation ends with an operation, if true duplicates last input
	if(is_operator(equation_array[equation_array.length-1])){
		equation_array.push(equation_array[equation_array.length-2]);
	};

}
///////////////////////////////////////////////////////////////////////////


//data management and updating
//////////////////////////////////////////////////////////////////////////
function update_display(){
	
	display_val = '';
	for (i = 0; i < equation_array.length; i++){
		display_val += equation_array[i];
	}
	$("#display_input").val(display_val);
	
	console.log("Equation Array is:",equation_array);
	console.log("Display value is:",display_val);
}

function update_variables(state,input){
	switch(state){

		case 'digit':
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
			}
				new_operand = '';
				new_operator = '';
    		break;

}
}

/*******************************************************************
* Function name: is_operator
* Purpose: to easily check if a string is a known operator
* Parameters: one string, x
* Returns: one boolean, True if x is a known operator, false if not
*******************************************************************/
function is_operator(x){
	switch(x){
		case "+":
			return true;
			break;
		case "-":
			return true;
			break;
		case "x":
			return true;
			break;
		case "/":
			return true;
			break;
		case "^":
			return true;
			break;
		default:
			return false;
	}

}
///////////////////////////////////////////////////////////////////////////



