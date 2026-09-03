// CALCULATOR PROGRAM

const display = document.getElementById("display");
const buttons = document.querySelectorAll("#keys button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        
        // normal buttons
        if (value !== "equals" && value !== "clear") appendToDisplay(value);
        
        // clearDisplay button
        if (value === "clear") clearDisplay();

        // equals button
        if (value === "equals") calculate();
    });
});


function appendToDisplay(input) {
    if (display.value === "Error") display.value = "";
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function tokenize(expression) {
    return expression.match(/\d+(\.\d+)?|[+\-*/]/g);
}

function calculate() {
    const expression = display.value;
    const tokens = tokenize(expression);

    if (!tokens) {
        display.value = "Error";
        return;
    }

    // Expression cannot end with an operator
    const lastToken = tokens[tokens.length - 1];

    if (["+", "-", "*", "/"].includes(lastToken)) {
        display.value = "Error";
        return;
    }

    // Expression cannot start with an operator
    const firstToken = tokens[0];

    if (["+", "-", "*", "/"].includes(firstToken)) {
        display.value = "Error";
        return;
    }

    // Converts numbers to Number
    for (let i = 0; i < tokens.length; i++) {
        if (!isNaN(tokens[i])) {
            tokens[i] = Number(tokens[i]);
        }
    }

    // First pass: * and /
    for (let i = 1; i < tokens.length - 1; i += 2) {

        if (tokens[i] !== "*" && tokens[i] !== "/") {
            continue;
        }

        const left = tokens[i - 1];
        const operator = tokens[i];
        const right = tokens[i + 1];

        let result;

        if (operator === "*") {
            result = left * right;
        } else {
            result = left / right;
        }

        tokens.splice(i - 1, 3, result);

        i -= 2;
    }

    // Second pass: + and -
    let result = tokens[0];

    for (let i = 1; i < tokens.length; i += 2) {

        const operator = tokens[i];
        const number = tokens[i + 1];

        if (operator === "+") {
            result += number;
        } else if (operator === "-") {
            result -= number;
        }
    }

    if (!Number.isFinite(result)) {
        display.value = "Error";
        return;
    }

    display.value = result;
}