const display = document.getElementById('display');
const previousAnswerDisplay = document.querySelector('.previous-answer');

let currentInput = '0';
let operator = null;
let firstOperand = null;
let shouldResetDisplay = false;
let lastResult = 0; // To store the result for "Previous Answer"

function updateDisplay() {
    display.value = currentInput;
}

function updatePreviousAnswerDisplay(value = lastResult) {
    previousAnswerDisplay.textContent = `Previous Answer: ${value}`;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        // Limit display length if needed
        if (currentInput.length < 15) {
             currentInput += number;
        }
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    operator = null;
    firstOperand = null;
    shouldResetDisplay = false;
    updateDisplay();
    // Optionally reset previous answer display or keep last result
    // updatePreviousAnswerDisplay(0); // Uncomment to reset prev answer too
}

function appendOperator(op) {
    // If an operator is already pressed, calculate the intermediate result first
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }

    // Handle case where user presses operator right after equals
    if(shouldResetDisplay && firstOperand == null) {
        firstOperand = currentInput; // Use the result as the first operand
    } else if (!shouldResetDisplay) {
         firstOperand = currentInput;
    }


    operator = op;
    shouldResetDisplay = true; // Ready for the next number input
    // Don't clear currentInput here yet, allow chaining like 5 * + 3 (uses 5*3)
}

function calculate() {
    if (operator === null || firstOperand === null || shouldResetDisplay) {
        // Don't calculate if no operator or second operand hasn't been entered yet
        // Or if equals was just pressed without a new operation
        return;
    }

    const secondOperand = currentInput;
    let result;

    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    if (isNaN(num1) || isNaN(num2)) {
        currentInput = "Error";
        updateDisplay();
        return;
    }


    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                currentInput = "Error"; // Division by zero
                updateDisplay();
                // Reset state after showing error
                operator = null;
                firstOperand = null;
                shouldResetDisplay = true; // Force reset on next input
                return;
            }
            result = num1 / num2;
            break;
        default:
            return; // Should not happen
    }

    // Format result (e.g., limit decimal places if needed)
    // result = parseFloat(result.toFixed(10)); // Example: limit to 10 decimals

    currentInput = String(result);
    lastResult = result; // Store for previous answer display
    operator = null;
    firstOperand = null; // Reset for next calculation starting point
    shouldResetDisplay = true; // Display will reset on next number input

    updateDisplay();
    updatePreviousAnswerDisplay(); // Update previous answer with the new result
}

// Initialize
updateDisplay();
updatePreviousAnswerDisplay(0); // Initial previous answer