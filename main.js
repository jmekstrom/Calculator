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
var operator_index_array = [];
var ordered_index;
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
	if(x != "%"){
		operator_click_num++;
	}
	update_variables('operator',x);
	update_display();
}

function negate(){
	if(is_operator(equation_array[0])){
		return;
	}
	var negated_element = parseFloat(equation_array[0])*(-1);
	equation_array[0] = negated_element.toString();

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

	//checks to see if a division of zero has occured, if not proceed as normal
	if(!divid_by_zero){
		display_val = answer;
		equation_array = [];
		equation_array[0] = display_val.toString();
	}

	update_display(); 
	equals_just_used = true;

	
}

function parentheses(p){
	update_variables('operator',p);
	update_display();
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
	order_of_operations();

	if(divid_by_zero){
		return;
	}
	
	if(equation_array.length == 1){
		answer = equation_array[0];  
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
		case "%":
			answer = parseFloat(operand1) / parseFloat(operand2);
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

	//Checks for percentage sign		
	for (var i = 0; i < equation_array.length; i++) {
		if(equation_array[i] == "%"){
			equation_array.splice(i+1,0,"100");
		}
	};

}

/*******************************************************************
* Function name: order_of_operations
* Purpose: Used to sort through and find the index of the first operation to be performed.  
* 		   Once the first is found it exits and is used in the calculate function. When 
*		   that answer is found the the function is called again until it finds no more
*		   operations to be perform and returns true to indicate that it is finished
*		   searching.		
* Parameters: none. looks at global variable equation_array
* Returns: one boolean, True if x is a known operator, false if not
*******************************************************************/
function order_of_operations(){
	var percentage_indexOf = equation_array.indexOf("%");
	var exponent_indexOf =   equation_array.indexOf("^");
	var mult_indexOf     =   equation_array.indexOf("x");
	var divid_indexOf    =   equation_array.indexOf("/");
	var add_indexOf      =   equation_array.indexOf("+");
	var sub_indexOf      =   equation_array.indexOf("-");
	var operators_digested = false;

	if(percentage_indexOf >= 0){
		ordered_index = percentage_indexOf;
		var percentages_found = true;
	}
	else if(percentage_indexOf < 0 && percentages_found){
			percentages_found = false; 
		return;
	}
	else if(exponent_indexOf >= 0){
		var exponents_found = true;
		ordered_index = exponent_indexOf;
	}
	else if(exponent_indexOf < 0 && percentages_found){
		exponents_found = false; 
		return;
	}
	else if(mult_indexOf >= 0){
		var mult_found = true;
		ordered_index = mult_indexOf;
	}
	else if(mult_indexOf < 0 && mult_found){
		mult_found = false; 
		return;
	}
	else if(divid_indexOf >= 0){
		var divid_found = true;
		ordered_index = divid_indexOf;
	}
	else if(divid_indexOf < 0 && divid_found){
		divid_found = false; 
		return;
	}
	else if(add_indexOf >= 0){
		var add_found = true;
		ordered_index = add_indexOf;
	}
	else if(add_indexOf < 0 && add_found){
		add_found = false; 
		return;
	}
	else if(sub_indexOf >= 0){
		var sub_found = true;
		ordered_index = sub_indexOf;
	}
	else if(sub_indexOf < 0 && sub_found){
		sub_found = false; 
		return;
	}
	else{
		return operators_digested = true;
	}
	
	console.log("Operator index array:",ordered_index);
	
}
///////////////////////////////////////////////////////////////////////////


//data management and updating
//////////////////////////////////////////////////////////////////////////
/*******************************************************************
* Function name: update_display
* Purpose: Takes values from the equation array to update the screen/display.  Used a lot.
* Parameters: none
* Returns: updates global variable display_val and outputs it to the screen
*******************************************************************/
function update_display(){
	//if no divid by zero case is found, this for loop runs through each index of the equation array and concatenates it to the display_val variable
	if(!divid_by_zero){
	display_val = '';
	for (i = 0; i < equation_array.length; i++){
		display_val += equation_array[i];
	}
	}
	//if a divid by zero case is found this else statement re-initializes variables.  Same as calling the all clear (AC()) function but does not clear the display.
	else{
		equation_array = [];
		new_operand = "";
		digit_click_num = 0;
		divid_by_zero = false;
	}

	//this function updates the value of the screen by targeting the DOM with id "display_input" with the contents of the variable display_val
	$("#display_input").val(display_val);
	
	//console log to keep track of data
	console.log("Equation Array is:",equation_array);
	console.log("Display value is:",display_val);
}


/*******************************************************************
* Function name: update_variables
* Purpose: to clean up the repeative variable updating, not as useful as I thought it would be
* Parameters: state, string, tells you what function needs updating | input, string, used to pass specific button value to update variables
* Returns: updates global variables
*******************************************************************/
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

