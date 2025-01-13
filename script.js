// Active/desactive le "Mode Sombre"
const toggleThemeButton = document.getElementById("dark-mode-toggle");

toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Sélectionne les éléments nécessaires

const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";

// Met à jour l'écran
function updateScreen(value) {
  screen.textContent = value || "0";
}

// Écoute les clics sur les boutons

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      // Ajoute un chiffre
      currentInput += number;
      updateScreen(currentInput);
    } else if (action) {
      switch (action) {
        case "add":
          handleOperator("+");
          break;
        case "subtract":
          handleOperator("-");
          break;
        case "multiply":
          handleOperator("*");
          break;
        case "divide":
          handleOperator("/");
          break;
        case "equal":
          calculateResult();
          break;
        case "clear":
          clearAll();
          break;
        case "delete":
          deleteLast();
          break;
      }
    }
  });
});

// Gère les opérateurs
function handleOperator(op) {
  if (currentInput === "") return;
  if (currentInput !== "") calculateResult();
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

// Calcule le résultat
function calculateResult() {
  if (currentInput === "" || previousInput === "") return;
  const result = eval(`${previousInput} ${operator} ${currentInput}`);
  currentInput = result.toString();
  previousInput = "";
  operator = "";
  updateScreen(currentInput);
}

// Réinitialise tout
function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateScreen("0");
}

// Supprime le dernier caractère
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateScreen(currentInput);
}
