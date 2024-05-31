const toggle = document.getElementById("togglerDiv");
const navbar = document.getElementById("navbar");
// let iconCart = document.querySelector(".shoppingCartBtn");
let closeCart = document.querySelector(".close");
var iconCart = document.getElementsByClassName("shoppingCartBtn");
const cartTab = document.getElementById("cartTab");
let listProductHTML = document.querySelector(".allProductsDiv");
let listCartHTML = document.querySelector(".listCart");
let cartNbr = document.getElementsByClassName("shoppingCartNbr");
let subtotalSpan = document.querySelector(".subtotal");
let cart = [];
// let products = [];
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
  var cartBtn = iconCart[i];
  cartBtn.addEventListener("click", () => {
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

// add to cart
listProductHTML.addEventListener("click", (event) => {
  console.log(event);
  let positionClick = event.target;
  if (positionClick.classList.contains("addToCartBtn")) {
    let id_product = positionClick.parentElement.dataset.id;
    console.log(id_product);
    addToCart(id_product);
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  let subtotal = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let totalItemPrice = 0;
      // totalQuantity +=
      // console.log(typeof totalQuantity);
      // console.log(typeof item.quantity);
      // console.log(totalQuantity);
      let newItem = document.createElement("div");
      newItem.classList.add("cartItem");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex((value) => value.id == item.product_id);
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      totalItemPrice += Number(info.price1) * Number(item.quantity);
      subtotal += totalItemPrice;
      // console.log(info.price1);
      // console.log(`total price = ${Number(info.price1)} * ${Number(item.quantity)}`);
      newItem.innerHTML = `
      <div class="cartItemImage"><img src="${info.image}"></div>
      <div class="cartItemDetails">
        <div class="cartItemName">${info.name}</div>
        <div class="totalPrice">$${totalItemPrice}</div>
        <div class="cartItemQuantity">
          <i class="fa-solid fa-minus minus"></i>
          <span>${item.quantity}</span>
          <i class="fa-solid fa-plus plus"></i>
        </div>
      </div>
      `;
    });
  }

  subtotalSpan.innerText = `$ ${subtotal}`;

  for (i = 0; i < cartNbr.length; i++) {
    cartNbr[i].innerText = totalQuantity;
  }
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  console.log(event);
  if (positionClick.classList.contains("minus") || positionClick.classList.contains("plus")) {
    let product_id = positionClick.parentElement.parentElement.parentElement.dataset.id;
    console.log(`this is the product id: ${product_id}`);
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
    1;
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  // get data product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML();

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();
