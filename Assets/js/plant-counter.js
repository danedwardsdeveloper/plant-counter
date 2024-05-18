import plants from "./plants.js";
const plantButtonsContainer = document.getElementById("plant-buttons-container");

function renderButton(plant, selected) {
  let button = document.createElement("button");
  button.addEventListener("click", handleClick);
  button.innerText = plant.name;
  button.classList.add("button", selected ? "button--counted" : "button--not-counted");
  plantButtonsContainer.appendChild(button);
}

function renderInitialButtons() {
  plants.forEach((plant) => {
    renderButton(plant, false);
  });
}

window.addEventListener("load", function () {
  renderInitialButtons();
});

function handleClick(event) {
  toggleButton(event);
  updatePlantsArray(event);
  updateTotal();
}

function toggleButton(event) {
  const plantClass = event.target.classList;
  plantClass.contains("button--not-counted") ? plantClass.replace("button--not-counted", "button--counted") : plantClass.replace("button--counted", "button--not-counted");
  event.target.blur();
}

function updatePlantsArray(event) {
  const plantName = event.target.innerText;
  const plantToUpdate = plants.find((plant) => plant.name === plantName);
  plantToUpdate.selected = !plantToUpdate.selected;
}

function updateTotal() {
  const counter = document.getElementById("counter");
  let total = 0;
  for (const plant of plants) {
    if (plant.selected) {
      total++;
    }
  }
  counter.textContent = total;
  updateCounterColour(total);
}

function updateCounterColour(total) {
  if (total >= 30) {
    counter.style.backgroundColor = "var(--add)";
  } else if (total >= 20) {
    counter.style.backgroundColor = "var(--warning)";
  } else {
    counter.style.backgroundColor = "var(--very-light-neutral)";
  }
}

const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", toggleSortMethod);

function toggleSortMethod(event) {
  let buttonText = event.target.innerText;
  if (buttonText === "Alphabetical") {
    renderButtonsAlphabetically();
    event.target.innerText = "By Group";
  } else {
    renderButtonsDefault();
    event.target.innerText = "Alphabetical";
  }
}

function sortAlphabetically() {
  return plants.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

function renderButtonsAlphabetically() {
  let alphabeticalPlants = sortAlphabetically(plants);
  plantButtonsContainer.replaceChildren();
  alphabeticalPlants.forEach((plant) => {
    renderButton(plant, plant.selected);
  });
}

// Problem is here:
function renderButtonsDefault() {
  plantButtonsContainer.replaceChildren();
  // plantButtonsContainer.innerHTML = "<h2>Test</h2>";
  plants.forEach((plant) => {
    renderButton(plant, plant.selected);
  });
}

const resetButton = document.querySelector("#reset-button");

resetButton.addEventListener("click", function () {
  if (confirm("Are you sure you want to reset?")) {
    // document.getElementById("yourFormId").reset();
  }
});
