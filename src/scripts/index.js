// // DOM selectors based on data
// buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-del]');
const ACButton = document.querySelector('[data-ac]');

////////////////////////////////////////////////////////////////////////

// // calculator class

class Calculator {
  constructor(prevNumValue, currentNumValue) {
    this.prevNumValue = prevNumValue;
    this.currentNumValue = currentNumValue;
    this.ac();
  }

  // check for dots and make number strings
  appendNumber(number) {
    // if type dot and currentOperand already contains a dot do nothing...
    // ... we do not want to spam dots we need only one!
    if (number === '.' && this.currentOperand.includes('.')) return;

    // otherwise make them as string to let JS calculate
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // select operation
  chooseOperation(operation) {
    // if operand is missing do nothing
    if (this.currentOperand === '') return;

    // if operand is not missing calculate
    if (this.previousOperand !== '') {
      this.calculate();
    }

    // set operation to the operand
    this.operation = operation;

    // set operand to current operation
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  // calculate outputs (prev and current)
  calculate() {
    // declare output
    let calculation;

    // make prev and current numbers floats to calculate
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // if NaN do nothing
    if (isNaN(prev) || isNaN(current)) return;

    // if number use switch to decide which operation to calculate
    switch (this.operation) {
      case '+':
        calculation = prev + current;
        break;
      case '-':
        calculation = prev - current;
        break;
      case '*':
        calculation = prev * current;
        break;
      case '÷':
        calculation = prev / current;
        break;
      default:
        return;
    }

    // set variables based on calculation
    this.currentOperand = calculation;
    console.log(typeof this.currentOperand);
    // resets after calculation
    this.operation = undefined;
    this.previousOperand = '';
  }

  // divide integers from decimals
  getDisplayNumber(number) {
    // make the number a string
    const stringNumber = number.toString();

    // get the integers by splitting and returning [0]
    const integerDigits = parseFloat(stringNumber.split('.')[0]);

    // get the decimals by splitting and returning [1]
    const decimalDigits = stringNumber.split('.')[1];

    // declare output
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      // set to english setting to get comma for thousands
      integerDisplay = integerDigits.toLocaleString('en', {
        // but exclude all decimals from this string
        maximumFractionDigits: 0,
      });
    }

    // now if you have decimals
    if (decimalDigits != null) {
      // concatenate integer and decimals with template literal
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      // otherwise return the integer as it is
      return integerDisplay;
    }
  }

  renderDisplay() {
    this.currentNumValue.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.prevNumValue.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.prevNumValue.innerText = '';
    }
  }

  // reset and all clear
  ac() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  // delete last digit
  del() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    console.log(this.currentOperand);
  }
}

// display
const prevNumValue = document.querySelector('[data-previous]');
const currentNumValue = document.querySelector('[data-current]');

// // Instantiate calculator
const calculator = new Calculator(prevNumValue, currentNumValue);

// //  Use methods

// Each time click on number button...
// ... event listener takes the text ...
// ... and updates the display
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.renderDisplay();
  });
});

// Each time click on operation button...
// ... event listener takes the text ...
// ... and updates the display
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.renderDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.calculate();
  calculator.renderDisplay();
});

ACButton.addEventListener('click', (button) => {
  calculator.ac();
  calculator.renderDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.del();
  calculator.renderDisplay();
});
