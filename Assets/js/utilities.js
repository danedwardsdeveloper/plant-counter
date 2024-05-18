const accordionButtons = document.querySelectorAll(".accordion");

accordionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    toggleAccordionPanel(this);
  });
});

function toggleAccordionPanel(button) {
  button.classList.toggle("active");
  const panel = button.nextElementSibling;
  const toggleIcon = button.querySelector(".toggle-icon");

  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    toggleIcon.classList.remove("upside-down");
    button.setAttribute("aria-expanded", "false");
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    toggleIcon.classList.add("upside-down");
    button.setAttribute("aria-expanded", "true");
  }
}
