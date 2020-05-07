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

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);


//    SVG ANIMATION
// <?xml version="1.0" standalone="no"?>
// <svg
// id='svg'
//   width="600"
//   height="600"
//   viewBox="0 0 600 600"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <g transform="translate(300,300)">
//     <path d="M140,-108.8C180.9,-60.3,213.3,-2.1,203.2,48C193,98,140.3,140,86,158.5C31.7,176.9,-24.3,171.8,-80,150.8C-135.7,129.9,-191.2,93.1,-197.9,49.3C-204.6,5.5,-162.5,-45.2,-121.4,-93.8C-80.3,-142.3,-40.1,-188.7,4.7,-192.4C49.5,-196.2,99,-157.3,140,-108.8Z" fill="#FFB4BC" >
//       <animate id="state1" attributeName="d" fill="freeze" to="M117.9,-108.4C138.9,-67.7,132.3,-19.5,116.9,18.1C101.5,55.8,77.2,82.8,42.9,105.8C8.5,128.8,-35.9,147.8,-72.5,135.8C-109.1,123.8,-137.9,80.9,-149.5,33.2C-161.2,-14.5,-155.6,-67.1,-127.9,-109.3C-100.1,-151.5,-50,-183.2,-0.8,-182.6C48.5,-182,96.9,-149,117.9,-108.4Z" begin="indefinite" dur="1s"/>
//     </path>
//   </g>
// </svg>
// <script>
// let svg=document.getElementById('svg')
// let anim = document.getElementById('state1')

// svg.addEventListener('click', () => {
// anim.beginElement()
// })
// </script>
