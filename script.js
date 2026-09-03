const buttons = document.querySelectorAll("#buttonList button");

buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
    const button = event.target;

    if (button.classList.contains("numberButton")) {
        handleNumber(button.textContent);
    }
    else if (button.classList.contains("operatorButton")) {
        handleOperator(button.textContent);
    }
    else if (button.classList.contains("equalsButton")) {
        calculate();
    }
}

function updateDisplay() {
    document.querySelector("#topBarNumbers").textContent = currentNumber || "0";
}

function handleOperator(newOperator) {
    if (currentNumber === "") {
        return;
    }

    storedNumber = Number(currentNumber);
    operator = newOperator;
    currentNumber = "";

    updateDisplay();
}

function handleNumber(number) {
    currentNumber += number;
    updateDisplay();
}

function calculate() {
    if (storedNumber === null || operator === null || currentNumber === "") {
        return;
    }

    const secondNumber = Number(currentNumber);
    let result;

    switch (operator) {
        case "+":
            result = storedNumber + secondNumber;
            break;

        case "-":
            result = storedNumber - secondNumber;
            break;

        case "x":
            result = storedNumber * secondNumber;
            break;

        case "÷":
            result = storedNumber / secondNumber;
            break;
    }

    currentNumber = String(result);
    storedNumber = null;
    operator = null;

    updateDisplay();
}