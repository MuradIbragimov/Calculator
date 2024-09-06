const calcDisplay = document.querySelector(".calc_display p");
const btnCalc = document.querySelectorAll(".btn");

let firstNumber = "";
let operator = "";
let secondNumber = "";

btnCalc.forEach((button) => {
  button.addEventListener("click", function (event) {
    const value = event.target.textContent;

    if (!isNaN(value) || value === ".") {
      buttonNumber(value);
    } else {
      actionButton(value);
    }
  });
});

function buttonNumber(value) {
  if (secondNumber.length >= 11) return;
  if (value === "." && secondNumber.includes(".")) return;
  secondNumber += value;
  updateDisplay();
}

function actionButton(value) {
  switch (value) {
    case "AC":
      clearAll();
      break;
    case "⌫":
      clearLastElement();
      break;
    case "=":
      equalsCalculation();
      break;
    case "/":
    case "×":
    case "-":
    case "+":
    case "%":
      setOperator(value);
      break;
  }
}
function clearAll() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  updateDisplay();
}

function clearLastElement() {
  if (secondNumber) {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator) {
    operator = "";
  } else {
    firstNumber = firstNumber.slice(0, -1);
  }
  updateDisplay();
}

function setOperator(value) {
  if (operator && !secondNumber) return;
  if (operator && secondNumber) {
    equalsCalculation();
  }
  operator = value;
  firstNumber = secondNumber;
  secondNumber = "";
  updateDisplay();
}

function equalsCalculation() {
  if (!firstNumber || !operator || !secondNumber) {
    displayError("Ошибка ввода");
    return;
  }

  let result;
  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);

  switch (operator) {
    case "+":
      result = sumCalculation(a, b);
      break;
    case "-":
      result = subtractCalculation(a, b);
      break;
    case "×":
      result = multiplyCalculation(a, b);
      break;
    case "/":
      if (b === 0) {
        return displayError("нельзя делить на 0");
      } else {
        result = divideCalculation(a, b);
      }
      break;
    case "%":
      result = percentageCalculation(a, b);
      break;
  }

  secondNumber = result.toFixed(2).toString();
  operator = "";
  firstNumber = "";
  updateDisplay();
}

function updateDisplay() {
  if (firstNumber && operator) {
    calcDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
  } else {
    calcDisplay.textContent = secondNumber || "0";
  }
}

function displayError(message) {
  calcDisplay.textContent = message;
}

function divideCalculation(a, b) {
  return a / b;
}

function multiplyCalculation(a, b) {
  return a * b;
}

function subtractCalculation(a, b) {
  return a - b;
}

function sumCalculation(a, b) {
  return a + b;
}

function percentageCalculation(a, b) {
  return (a * b) / 100;
}
