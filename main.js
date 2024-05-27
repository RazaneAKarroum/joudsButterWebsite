const toggle = document.getElementById("togglerDiv");
const navbar = document.getElementById("navbar");
// let iconCart = document.querySelector(".shoppingCartBtn");
let closeCart = document.querySelector(".close");
var iconCart = document.getElementsByClassName("shoppingCartBtn");
let body = document.querySelector("body");

console.log(iconCart);

// loader
var loader = document.getElementById("loading-spinner");

window.addEventListener("load", () => {
  loader.style.display = "none";
});
// end loader

//open and close cart
var iconCart = document.getElementsByClassName("shoppingCartBtn");
for (var i = 0; i < iconCart.length; i++) {
  var cart = iconCart[i];
  cart.addEventListener("click", () => {
    console.log("iconcart is clicked");
    body.classList.toggle("showCart");
  });
}

// iconCart.addEventListener("click", () => {
//   console.log("iconcart is clicked");
//   body.classList.toggle("showCart");
// });
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

document.onclick = function (e) {
  // console.log(e.target.id);
  if (e.target.id !== "navbar" && e.target.id !== "menuIcon") {
    toggle.classList.remove("active");
    navbar.classList.remove("active");
  }
};

toggle.onclick = function () {
  toggle.classList.toggle("active");
  navbar.classList.toggle("active");
};

function goToPage(link) {
  window.open(link.value);
}

function goToLink(link) {
  window.open(link.id);
}
