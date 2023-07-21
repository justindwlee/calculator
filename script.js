let operators = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "× ": (a,b) => a * b,
    "÷": (a,b) => a / b,
    "^": (a,b) => Math.pow(a,b),
    ".": "decimal point"

}

let operand1, operator, operand2;

function operate(a, op, b) {
    return operators[op](a,b);
}


const screenDisplayPart = document.querySelector('#display-part');
const resultPart = document.querySelector('#result-part');

const numberButtons = document.querySelectorAll('.number-button');

numberButtons.forEach((button) => {
    button.addEventListener('click', function(){
        if(screenDisplayPart.textContent == '0')
            screenDisplayPart.textContent = button.textContent;
        else
            screenDisplayPart.textContent += button.textContent;
    })
})

const operatorButtons = document.querySelectorAll('.operator-button');

operatorButtons.forEach((button) => {
    button.addEventListener('click', function(){
            let currentExpression = screenDisplayPart.textContent;
            let lastComponent = currentExpression.split('')[currentExpression.length-1];
            if (operators[lastComponent])
                return;
            else
                screenDisplayPart.textContent += button.textContent;
    })
})

const exponentialButton = document.querySelector('#exponential');

exponentialButton.addEventListener('click', function(){
    let currentExpression = screenDisplayPart.textContent;
    let lastComponent = currentExpression.split('')[currentExpression.length-1];
    if (operators[lastComponent])
        return;
    else
        screenDisplayPart.textContent += '^';
})

const allClearButton = document.querySelector('#all-clear');

allClearButton.addEventListener('click', function(){
    screenDisplayPart.textContent = '0';
})

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', function(){
    let expressionToArray = screenDisplayPart.textContent.split('');
    expressionToArray.pop();
    screenDisplayPart.textContent = expressionToArray.join('');
    
})