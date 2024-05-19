const toggle = document.getElementById("togglerDiv");
const navbar = document.getElementById("navbar");

document.onclick = function (e) {
  console.log(e.target.id);
  if (e.target.id !== "navbar" && e.target.id !== "menuIcon") {
    toggle.classList.remove("active");
    navbar.classList.remove("active");
  }
};

toggle.onclick = function () {
  toggle.classList.toggle("active");
  navbar.classList.toggle("active");
};
