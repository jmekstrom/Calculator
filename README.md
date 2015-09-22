<h1>Calculator</h1>

<h2>Description of Project:</h2>

<h2>Feature List:</h2>
- Standard Functions (add, subtract, divide, multiply)
- Seperate Clear and All Clear buttons.
- Allows successive mathematical operations
- History window to show previous calculations
- Negate Functionality
- Percentage calculation (converts percentage to decimal equivalent)
- Calculates complex exponents, such as:  9^(2/3)
- Smart calculations, examples:
   - 9 + =  (calculates 9 + 9)
   - + 9 =  (calculates 0 + 9)
- Does not allow input of mulitple operators
- Order of Operations
- Parenthesis

<h2>3 Things I learned:</h2>
 - Complex Array manipulation using Javascript
 - Complex function integration
 - 

<h2>Screenshots of application:</h2>

<h2>Link to Live Preview:</h2>

## Calculator 0.1
HTML:
- Input: number_0
- Input: number_1
- div: result_display
- button: add
Functionality:
- function add_numbers()
- Adds two numbers together
- Two numbers are pulled from the inputs
- Result is put into result_display div’s contents

## Calculator 0.5
Additional Functionality:
- Add buttons / functions for:
   - subtract
   - divide
     - Take into account if the divisor is 0
   - multiply

## Calculator 1.0
HTML:
- 1 input (for operand/operator display)
- 1 input (for result display)
  - cannot be edited
- 10 buttons, 1 for each digit (0-9)
- 4 buttons, 1 per operator (+,-,/,*)
- 1 button, for an equal operator (=)
Functionality:
- add, subtract, divide, multiply functions
- Each takes 2 numbers as input
- Each returns 1 number as output, the result of its math
- calculate function
- called by = / enter button
- uses a switch to pick which math function to run
- updates the result input with the value of the mathematical operation

# Extra Credit
- add decimal point
- add sign inversion ("2" becomes "(-2)" and vice versa)
- add exponent button "x<sup>y</sup>" that calculates the first number raised to the power of the 2nd number"
- Add error message when dividing by 0

## Calculator 1.5
HTML:
- AC - clears all numbers, the operator, and the display
- Clear - clears only the current number and display

Functionality:
- Allow successive mathematical operations
   - For example, 2+3+4 should result in:
      - after pressing the 2nd +, should automatically total 2 + 3 and update the display (5)
      - Pressing 4 should take the previous result and show it added to 4 (5+4)
- Pressing a successive mathematical operation and then pressing = will perform the operation on that number as both number 1 and number 2, for example
   - press 1+2=   (gives you 3)
   - press +=  (gives you 6)
   - press +=  (gives you 12)

## Calculator 2.0

HTML: 
- Place a result field on the calculator to hold the result of all math
Functionality:
- Pressing successive mathematical operations does not complete the operation, for example
   - 1+2+3+4+5 would not do anything until the = key is pressed
   - after the = key is pressed, would perform all math, yielding 15
   - put all results into the result field
