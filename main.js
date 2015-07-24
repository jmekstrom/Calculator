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
var decimal_clicked = false;
///////////////////////////////


//Input Functions, functions are all called by a button click
///////////////////////////////////////////////////////////////////////////////////
/****************************************************************************************
* Function name: input digit
* Purpose: 	Grabs the number string and uses it to update the equation array
* Parameters: n, string, specific number value
* Returns: updated equation array
*****************************************************************************************/
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

/****************************************************************************************
* Function name: operator
* Purpose: 	Grabs the operator string and uses it to update the equation array
* Parameters: x, string, specific operator value
* Returns: updated equation array
*****************************************************************************************/
function operator(x){
	decimal_clicked = false;
	equals_just_used = false;
	digit_click_num = 0;
	if(x != "%"){
		operator_click_num++;
	}
	update_variables('operator',x);
	update_display();
}

/****************************************************************************************
* Function name: negate
* Purpose: 	to negate the current input
* Parameters: none
* Returns: toggled negativity of index 0 of the equation array
*****************************************************************************************/
function negate(){
	if(is_operator(equation_array[0])){
		return;
	}
	var negated_element = parseFloat(equation_array[0])*(-1);
	equation_array[0] = negated_element.toString();
	update_display();
}

/****************************************************************************************
* Function name: AC or All Clear
* Purpose: 	Clears all variables and display
* Parameters: none 
* Returns: updated global variables
*****************************************************************************************/
function AC() {
	decimal_clicked = false;
	digit_click_num = 0;
    $("#display_input").val("");
    display_val = "";
    equation_array = [];
    new_operand = "";
    console.log("All Cleared",equation_array)
    //should I add a condition to delete history?
}

/****************************************************************************************
* Function name: C or Clear
* Purpose: 	deletes the inputs one by one, once nothing is left to clear it calls AC() 
* Parameters: none
* Returns: updated equation array
*****************************************************************************************/
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

/****************************************************************************************
* Function name: equals
* Purpose: 	To initiate calculation and store equation history
* Parameters: e as a string "=", as of now it is not used
* Returns: equals_just_used (boolean), clears equation_array and stores the answer as the 
*		   only element into the equation array.
*****************************************************************************************/
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

/****************************************************************************************
* Function name: parentheses (not complete)
* Purpose: 	
* Parameters:
* Returns: 
*****************************************************************************************/
function parentheses(p){
	update_variables('operator',p);
	update_display();
}

/////////////////////////////////////////////////////////////////////////////////////////


//Calculation functions
/////////////////////////////////////////////////////////////////////////////////////////
/****************************************************************************************
* Function name: calculate
* Purpose: 	To sort through the equation_array and calculate the answers
* Parameters: none, 
* Returns: answer, number 
* Updates needed: need to change the for loop to a while loop and incorporate the 
*                 order_of_operations function.
*****************************************************************************************/
//DWP THIS ONE
//This function takes the equation array and sorts through the elements in it to perform the
//desired operation
function calculate() {
	// sorts values to calculate
	//declares the varibale operand1 to be used for switch
	var operand1 = '';
	//declares the varibale operator to be used for switch
	var operator = '';
	//declares the varibale operand2 to be used for switch
	var operand2 = '';

	//calls the function special_cases to condition the equation variable to correct format
	special_cases();
	
	//check for a divid by zero case, if that case is true it aborts the function
	if(divid_by_zero){
		//return aborts function
		return;
	}
	
	//checks to see if the equation array has a need to be calculated. If not it just 
	//returns the equation array as the answer
	if(equation_array.length == 1){
		//setting the first index of the equation array to answer which will be displayed
		answer = equation_array[0];  
	}

	//for loop the iterates to the length of the equation array
	for (var i = 0; i < equation_array.length; i++) {

		//checks for intial conditions, if it is operand1 is the first index
		if(i == 0){
			//sets operand1 to the 0 index of equation array
			operand1 = equation_array[i];
		}
		//if not the answer from a previous calculation is operand1
		else{
			//sets operand1 to the previous answer
			operand1 = answer;
		}
		//finds the correct operator based on a pre-concieve equation array format
		operator = equation_array[i+1];
		//find the correct operand2 baces on a pre-concieved equation array format
		operand2 = equation_array[i+2];

	//checks the operator variable for the correct case
	switch(operator){
		//addition case
		case "+":
			answer = parseFloat(operand1) + parseFloat(operand2);
			break;
		//subtraction case	
		case "-":
			answer = parseFloat(operand1) - parseFloat(operand2);
			break;
		//multiplication case
		case "x":
			answer = parseFloat(operand1) * parseFloat(operand2);
			break;
		//divid case
		case "/":
			answer = parseFloat(operand1) / parseFloat(operand2);
			break;
		//exponent case
		case "^":
			//uses javascript math function to calculate the exponent
			answer = Math.pow(parseFloat(operand1),parseFloat(operand2));
			break;	
		//percentage case	
		case "%":
			answer = parseFloat(operand1) / parseFloat(operand2);
			break;  		
	}		
	}	

}

/****************************************************************************************
* Function name: special_cases
* Purpose: 	Manipulates the equation array to match expected formatting for special cases
* Parameters: none, equation_array is manipulated
* Returns: equation_array
*****************************************************************************************/
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

/****************************************************************************************
* Function name: order_of_operations
* Purpose: Used to sort through and find the index of the first operation to be performed.  
* 		   Once the first is found it exits and is used in the calculate function. When 
*		   that answer is found the the function is called again until it finds no more
*		   operations to be perform and returns true to indicate that it is finished
*		   searching.		
* Parameters: none. looks at global variable equation_array
* Returns: true if finished searching
*****************************************************************************************/
function order_of_operations(){
	var percentage_indexOf = equation_array.indexOf("%");
	var exponent_indexOf =   equation_array.indexOf("^");
	var mult_indexOf     =   equation_array.indexOf("x");
	var divid_indexOf    =   equation_array.indexOf("/");
	var add_indexOf      =   equation_array.indexOf("+");
	var sub_indexOf      =   equation_array.indexOf("-");
	

	if(percentage_indexOf >= 0){
		ordered_index = percentage_indexOf;
		var percentages_found = true;
	}
	else if(percentage_indexOf < 0 && percentages_found){
			percentages_found = false; 
		return false;
	}
	else if(exponent_indexOf >= 0){
		var exponents_found = true;
		ordered_index = exponent_indexOf;
	}
	else if(exponent_indexOf < 0 && percentages_found){
		exponents_found = false; 
		return false;
	}
	else if(mult_indexOf >= 0){
		var mult_found = true;
		ordered_index = mult_indexOf;
	}
	else if(mult_indexOf < 0 && mult_found){
		mult_found = false; 
		return false;
	}
	else if(divid_indexOf >= 0){
		var divid_found = true;
		ordered_index = divid_indexOf;
	}
	else if(divid_indexOf < 0 && divid_found){
		divid_found = false; 
		return false;
	}
	else if(add_indexOf >= 0){
		var add_found = true;
		ordered_index = add_indexOf;
	}
	else if(add_indexOf < 0 && add_found){
		add_found = false; 
		return false;
	}
	else if(sub_indexOf >= 0){
		var sub_found = true;
		ordered_index = sub_indexOf;
	}
	else if(sub_indexOf < 0 && sub_found){
		sub_found = false; 
		return false;
	}
	else{
		return true;
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
			if(input == "." && decimal_clicked){
    			return;
    		}
			if(input == "." && !decimal_clicked){
    		decimal_clicked = true;	
    		}

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

