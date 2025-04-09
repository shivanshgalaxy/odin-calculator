const display = document.querySelector(".display");
const delButton = document.querySelector("#del");
const acButton = document.querySelector("#ac");
const decimalButton = document.querySelector("#decimal");
const equalsButton = document.querySelector("#equals");
let curOperation = null;
const validOperators = new Set(["+", "-", "*", "/", "%"]);

function addToDisplay(element) {
  if (display.innerText === "0") {
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
  if (validOperators.has(lastChar)) {
    curOperation = null;
  }
  display.innerText = display.innerText.slice(0, -1);
  if (display.innerText === "") {
    display.innerText = 0;
  }
}

function parseDisplay() {
  const displayText = String(display.innerText);
  const regex = /(-?\d*\.?\d*)([+\-*\/%]*)(-?\d*\.?\d*)/;
  const match = displayText.match(regex);
  if (match) {
    const num1 = match[1];
    const operator = match[2];
    const num2 = match[3];
    return { num1, operator, num2 };
  } else {
    return null;
  }
}

function computeResult() {
  const parsedString = parseDisplay();
  const num1 = Number(parsedString["num1"]);
  const operator = parsedString["operator"];
  const num2 = Number(parsedString["num2"]);
  console.log(num1);
  console.log(num2);

  let result;
  if (!isNaN(num1) && operator !== "" && !isNaN(num2)) {
    switch (operator) {
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

function addDecimal() {
  const { num1, operator, num2 } = parseDisplay();

  if (!operator) {
    if (!num1.includes(".")) {
      addToDisplay(".");
    }
  } else {
    if (!num2.includes(".")) {
      addToDisplay(".");
    }
  }
}

function addOperator(operator) {
  if (operator === "-" && display.innerText === "0") {
    display.innerText = "-";
    return;
  }

  if (curOperation !== null) {
    if (parseDisplay()["num2"] === "") {
      deleteDisplay();
    } else {
      computeResult();
    }
  }
  curOperation = operator;
  display.innerText += curOperation;
}

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    addToDisplay(event.target.innerText);
  });
});

const operatorButtons = document.querySelectorAll(".operation-button");
operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const operator = event.target.innerText;
    addOperator(operator);
  });
});

equalsButton.addEventListener("click", computeResult);
decimalButton.addEventListener("click", addDecimal);
delButton.addEventListener("click", deleteDisplay);
acButton.addEventListener("click", clearDisplay);
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    addToDisplay(key);
  }

  if (validOperators.has(key)) {
    addOperator(key);
  }

  if (key === ".") {
    addDecimal();
  }

  if (key === "Backspace") {
    deleteDisplay();
  }

  if (key === "Escape") {
    clearDisplay();
  }

  if (key === "Enter" || key === "=") {
    computeResult();
  }
});
