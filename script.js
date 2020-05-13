const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function darkTheme() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
}

function lightTheme() {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
}

function switchTheme(e) {
  if (e.target.checked) {
    darkTheme();
  } else {
    lightTheme();
  }
}



toggleSwitch.addEventListener("change", switchTheme, false);
