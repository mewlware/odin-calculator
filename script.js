const numbersBtns = document.querySelector(".numbers");
const operatorsBtns = document.querySelector(".operators");
const clearBtn = document.querySelector("#clear");
const backspaceBtn = document.querySelector("#backspace");
const resultBtn = document.querySelector("#showResult")

const calculationText = document.querySelector(".calculation");
const operandText = document.querySelector(".operand");
const resultText = document.querySelector(".result");

let operand1 = "0";
let operand2 = "0";
let operation = "";

clearBtn.addEventListener('click', clear);
backspaceBtn.addEventListener('click', backspace);
resultBtn.addEventListener('click', showResult);

for (let number of numbersBtns.children) {
    number.addEventListener('click', (e) => {
        addNumber(e.currentTarget.textContent);
    })
}

for (let operator of operatorsBtns.children) {
    operator.addEventListener('click', (e) => {
        addOperator(e.currentTarget.textContent)
    })
}

function addNumber(num) {
    hideResultandShowNumber()
    if (operand1 === 'ERROR' || operand2 === 'ERROR'){
        return;
    }

    let currentOperand = "";
    if (!operation) {
        currentOperand = operand1;
        console.log(`operating on operand1 which is ${operand1}`)
    } else {
        currentOperand = operand2;
        console.log(`operating on operand2 which is ${operand2}`)
    }

    if ((num == "0" || num == "00") && currentOperand == "0") {
        return;
    } else if (currentOperand.length == 13) {
        return;
    } else if (num == "." && currentOperand.includes(".")) {
        return;
    } else if (num == "." && currentOperand == "0") {
        currentOperand = "0.";
    } else if (currentOperand == "0") {
        currentOperand = num;
    } else {
        currentOperand += num;
    }

    if (!operation) {
        operand1 = currentOperand;
    } else {
        operand2 = currentOperand;
    }

    console.log(`first number is ${operand1} and 2nd number is ${operand2}`)

    operandText.textContent = currentOperand;
}


function addOperator(operator) {
    if (operand1 === 'ERROR' || operand2 === 'ERROR'){
        return;
    }
    if (operation) {
        operand1 = calculate();
    }

    operation = operator;

    if (operation === "√") {
        calculationText.textContent = "x√" + operand1;
        return;
    } else if (operation === "2√") {
        calculationText.textContent = "√" + operand1;
        return;
    } 

    calculationText.textContent = operand1 + " " + operation;
}

function backspace() {
    if (operand1 === 'ERROR' || operand2 === 'ERROR'){
        return;
    }

    textLength = operandText.textContent.length;
    if (textLength == 1) {
        operandText.textContent = "0";
    } else {
        operandText.textContent = operandText.textContent.slice(0, textLength - 1);
    }
}

function clear() {
    operand1 = "0";
    operand2 = "0";
    operation = "";
    operandText.textContent = "0";
    resultText.textContent = "";
    calculationText.textContent = "";

    hideResultandShowNumber()
}

function showResultandhideNumber() {
    operandText.classList.add('hidden');
    resultText.classList.remove('hidden');
}

function hideResultandShowNumber() {
    operandText.classList.remove('hidden');
    resultText.classList.add('hidden');
}

function showResult() {
    if (operation && calculationText.textContent.includes("=")) {
        return;
    } else if (operation === "2√") {
        calculationText.textContent += " =";
    } else if (operation === "√") {
        calcTextArray = calculationText.textContent.split("√");
        calcTextArray[0] = operand2;
        calculationText.textContent = calcTextArray.join("√")
    } else {
        calculationText.textContent += " " + operand2 + " =";
    }
    result = calculate();
    resultText.textContent = Math.round(result * 100000000000)/100000000000;
    operandText.textContent = "0";
    operation = "";

    showResultandhideNumber();
}

function calculate() {
    let result = chooseOperator(operation, Number(operand1), Number(operand2));
    operand1 = result;
    operand2 = "0";
    return result;
}

function chooseOperator(operator, num1, num2) {
    switch(operator){
        case "+":
            return addition(num1, num2);
        case "-":
            return substraction(num1, num2);
        case "x":
            return multiplication(num1, num2);
        case "/":
            return division(num1, num2);
        case "^":
            return exponentiation(num1, num2);
        case "%":
            return remainder(num1, num2);
        case "2√":
            return squareroot(num1);
        case "√":
            return rootOf(num1, num2);
        default:
            return 0;
    }
}

function addition(num1, num2) {
    return num1 + num2;
}

function substraction(num1, num2) {
    return num1 - num2;
}

function multiplication(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    if (num2 !== 0) {
        return num1 / num2;
    } else {
        return NaN;
    };
}

function exponentiation(num1, num2) {
    return num1 ** num2;
}

function remainder(num1, num2) {
    return num1 % num2;
}

function squareroot(num1) {
    if (num1 <= 0) {
        return 'ERROR';
    }
    return Math.sqrt(num1);
}

function rootOf(num1, num2) {
    if (num1 <= 0 || num2 <= 0) {
        return 'ERROR';
    }
    return Math.pow(num1, 1/num2)
}