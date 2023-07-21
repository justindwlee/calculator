let operators = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "×": (a,b) => a * b,
    "÷": (a,b) => a / b,
    "^": (a,b) => Math.pow(a,b)
}

let operand1, operator, operand2;

function operate(a, op, b) {
    return operators[op](a,b);
}


const screenDisplayPart = document.querySelector('#display-part');
const resultPart = document.querySelector('#result-part');

//Making the number buttons work

const numberButtons = document.querySelectorAll('.number-button');

numberButtons.forEach((button) => {
    button.addEventListener('click', function(){
        if(screenDisplayPart.textContent == '0')
            screenDisplayPart.textContent = button.textContent;
        else
            screenDisplayPart.textContent += button.textContent;
    })
})

//Making the operator buttons work

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

//Making the exponential button work

const exponentialButton = document.querySelector('#exponential');

exponentialButton.addEventListener('click', function(){
    let currentExpression = screenDisplayPart.textContent;
    let lastComponent = currentExpression.split('')[currentExpression.length-1];
    if (operators[lastComponent])
        return;
    else
        screenDisplayPart.textContent += '^';
})

//Making the AC button work

const allClearButton = document.querySelector('#all-clear');

allClearButton.addEventListener('click', function(){
    screenDisplayPart.textContent = '0';
    resultPart.textContent = '0';
})

//Making the clear button work

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', function(){
    let expressionToArray = screenDisplayPart.textContent.split('');
    expressionToArray.pop();
    screenDisplayPart.textContent = expressionToArray.join('');
    
})


//Dealing with the displayed expression and getting the result

function combineDigits(arr) {
    const result = [];
    let currentNumber = "";

    for (const item of arr) {
        if (!isNaN(Number(item)))
            currentNumber += item;
        else {
            if (currentNumber !== "") {
                result.push(currentNumber);
                currentNumber = "";
            }
            result.push(item);
        }
    }

    if (currentNumber !== "")
        result.push(currentNumber);
    return result;
}

function infixToPostfix(tokens) {
    const precedence = {
        "+": 1,
        "-": 1,
        "×": 2,
        "÷": 2,
        "^": 3
    }

    const outputQueue = [];
    const operatorStack = [];

    for (const token of tokens) {
        if (!isNaN(Number(token))) {
            outputQueue.push(token);
        }
        else if (token in precedence) {
            while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    }

    while (operatorStack.length > 0)
        outputQueue.push(operatorStack.pop());

    return outputQueue;
}

function evaluatePostfix(tokens) {
    while(tokens.length > 1) {
        for (let token of tokens) {
            if (operators[token]) {
                let indexOfToken = tokens.indexOf(token);
                let a = +tokens[indexOfToken-2];
                let b = +tokens[indexOfToken-1];
                
                let operatedNum = operate(a,token,b);
                tokens.splice(indexOfToken-2,3,operatedNum);
                break;
            }
        }
    }
    
    return tokens[0];
} 



function calculate() {
    let displayedExpression = screenDisplayPart.textContent;
    let expressionTokenized = combineDigits(displayedExpression.split(''));

    if (isNaN(expressionTokenized[expressionTokenized.length-1]))
        return;

    let expressionToPostFix = infixToPostfix(expressionTokenized);
    let finalResult = evaluatePostfix(expressionToPostFix);
    resultPart.textContent = finalResult;
}

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener("click", calculate);