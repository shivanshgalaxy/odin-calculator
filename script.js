const display = document.querySelector(".display");
const delButton = document.querySelector('#del');
const acButton = document.querySelector('#ac');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');
const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
const multiplyButton = document.querySelector('#multiply');
const divideButton = document.querySelector('#divide');
const modulusButton = document.querySelector('#modulus');
let curOperation = null;
const validOperators = new Set(["+", "-", "*", "/", "%"]);

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        addToDisplay(event.target.innerText);
    });
})

const operatorButtons = document.querySelectorAll(".operation-button");
operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (curOperation !== null) {
            deleteDisplay();
        }
        curOperation = event.target.innerText
        display.innerText += curOperation;
    })
})

function addToDisplay(element) {
    if(display.innerText === "0") {
        display.innerText = "";
    }
    display.innerText += element;
}

function clearDisplay() {
    curOperation = null;
    display.innerText = "0";
}

function deleteDisplay() {
    const lastChar = String(display.innerText.slice(-1));
    if(validOperators.has(lastChar)) {
        curOperation = null;
    }
    display.innerText = display.innerText.slice(0, -1);
    if(display.innerText === "") {
        display.innerText = 0;
    }
}

function parseString() {
    const displayText = String(display.innerText);
    const regex = /(\d*\.?\d*)([+\-*/%]*)(\d*\.?\d*)/;
    const match = displayText.match(regex);
    if (match) {
        const num1 = match[1];
        const operator = match[2];
        const num2 = match[3];
        return {num1, operator, num2};
    } else {
        return null;
    }
}

function computeResult() {
    const parsedString = parseString();
    const num1 = parseInt(parsedString["num1"]);
    const operator = parsedString["operator"];
    const num2 = parseInt(parsedString["num2"]);
    console.log(num1);
    console.log(num2);

    let result;
    if(!isNaN(num1) &&
        operator !== "" &&
        !isNaN(num2)) {
        switch(operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            case "%":
                result = num1 % num2;
                break;
        }
        curOperation = null;
        display.innerText = parseInt(`${result * 100}`) / 100;
    }
}

equalsButton.addEventListener("click", computeResult);

delButton.addEventListener("click", deleteDisplay);
acButton.addEventListener("click", clearDisplay);

