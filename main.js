const toggle = document.getElementById("togglerDiv");
const navbar = document.getElementById("navbar");
let bestSellerProduct = document.getElementsByClassName("productCard");
// let iconCart = document.querySelector(".shoppingCartBtn");
let closeCart = document.querySelector(".close");
var iconCart = document.getElementsByClassName("shoppingCartBtn");
const cartTab = document.getElementById("cartTab");
// let listProductHTML = document.querySelector(".allProductsDiv");
let listCartHTML = document.querySelector(".listCart");
let cartNbr = document.getElementsByClassName("shoppingCartNbr");
let subtotalSpan = document.querySelector(".cartSubtotal");
let productTotalPrice = document.querySelector(".totalPrice");
let loginBtn = document.getElementsByClassName("loginLink");
let checkout = document.querySelector(".checkOutBtn");
let cart = [];
// let products = [];
let body = document.querySelector("body");

console.log(iconCart);
console.log(bestSellerProduct);

// loader
var loader = document.getElementById("loading-spinner");

window.addEventListener("load", () => {
  loader.style.display = "none";
});
// end loader

// add to cart function from index.html page
// function addToCart(addedProduct) {
//   console.log(`added product is: ${addedProduct}`);
//   let id_product = addedProduct.dataset.id;
//   addToCart(id_product);
// }
// listProductHTML.addEventListener("click", (event) => {
//   console.log(event);
//   let positionClick = event.target;
//   if (positionClick.classList.contains("addToCartBtn")) {
//     let id_product = positionClick.parentElement.dataset.id;
//     console.log(id_product);
//     addToCart(id_product);
//   }
// });

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

// document.onclick = function (e) {
//   // console.log(e.target.id);
//   if (e.target.id !== "navbar" && e.target.id !== "menuIcon") {
//     toggle.classList.remove("active");
//     navbar.classList.remove("active");
//   }
// };

//start login and registration form
//open and close login form
for (var i = 0; i < loginBtn.length; i++) {
  var login = loginBtn[i];
  login.addEventListener("click", () => {
    console.log("login btn is clicked");
    document.querySelector(".loginFormDiv").style.display = "flex";
  });
}

document.querySelector(".loginCloseIcon").addEventListener("click", () => {
  document.querySelector(".loginFormDiv").style.display = "none";
});

//show hidden password
// const showHiddenPass = () => {
//   const passInput = document.getElementById("loginPassword");
//   const eyeIcon = document.getElementById("loginEye");
//   console.log(`this is passInput: ${passInput}`);
//   console.log(`this is eyeIcon: ${eyeIcon}`);

//   eyeIcon.addEventListener("click", () => {
//     console.log(`${eyeIcon} is clicked`);
//     //change password to text
//     if (passInput.type === "password") {
//       //switch to text
//       passInput.type = "text";
//       //icon change
//       eyeIcon.classList.add("fa-eye");
//       eyeIcon.classList.remove("fa-eye-slash");
//     } else {
//       //change to password
//       InputDeviceInfo.type = "password";
//       //icon change
//       eyeIcon.classList.add("fa-eye-slash");
//       eyeIcon.classList.remove("fa-eye");
//     }
//   });
// };

// showHiddenPass();
//end login and registration form

// console.log(loginBtn);
// loginBtn.forEach((login) => {
//   console.log(`this is the login btn ${login}`);
//   login.addEventListener("click", () => {
//     console.log(`login btn is clicked`);
//     document.querySelector(".loginFormDiv").style.display = "flex";
//   });
// });
//end open and close login form

for (var i = 0; i < bestSellerProduct.length; i++) {
  var bestSellerProductClicked = bestSellerProduct[i];
  bestSellerProductClicked.addEventListener("click", (e) => {
    console.log(e);
    let bestSellerId = e.target.dataset.id;
    
    let productWeight = e.target.dataset.weight;
    

    let isAddToCart = e.target.classList.contains("addToCartBtn");
    // let isImgClicked = e.currentTarget;
    if (!isAddToCart) {
      console.log(bestSellerId);
      console.log(productWeight);
      window.open(`/${e.currentTarget.id}`);
      // window.open(`/productDetails.html?id=${bestSellerId}`);
    } else {
      console.log(bestSellerId);
      console.log(productWeight);
      // let bestSellerId = e.target.dataset.id;
      // let productWeight = e.target.dataset.weight;
      addToCart(bestSellerId, 1, productWeight);
    }
  });
}

// toggle.onclick = function () {
//   toggle.classList.toggle("active");
//   navbar.classList.toggle("active");
// };

function goToPage(link) {
  window.open(link.value);
}

// function goToLink(link) {
//   console.log(link.children.tagName);
//   // let isAddToCart = link.target.classList.contains("addToCartBtn");
//   // console.log("check if addToCartBtn class exist: " + isAddToCart);
//   // if (!isAddToCart) {
//   //   window.open(`/productDetails.html?id=${product.id}`);
//   // } else {
//   //   window.open(link.id);
//   // }
// }

function addToCart(product_id, itemQuantity, itemWeight) {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id && value.weight == itemWeight
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: Number(itemQuantity),
        weight: itemWeight,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: Number(itemQuantity),
      weight: itemWeight,
    });
  } else {
    cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + Number(itemQuantity);
  }
  addCartToHTML();
  addCartToMemory();
}
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

function addCartToHTML() {


//const addCartToHTML = () => {
  // console.log(`addToCart function is entered and this is the index: ${index}`);
  listCartHTML.innerHTML = "";
  let totalQuantity = 0; //this is the total quantity of items in cart to be displayed in shopping cart icon
  let subtotal = 0; //this is the total price of all items added to cart
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      let totalItemPrice = 0; //this is the total price of each item seperately
      // totalQuantity +=
      // console.log(typeof totalQuantity);
      // console.log(typeof item.quantity);
      // console.log(totalQuantity);

      let newItem = document.createElement("div"); //<div></div>
      newItem.classList.add("cartItem"); //<div class="cartItem"></div>
      newItem.dataset.id = item.product_id; //<div class="cartItem" data-id="product_id"></div>
      newItem.dataset.weight = item.weight; //<div class="cartItem" data-id="product_id" data-weight="weight"></div>

      let positionProduct = products.findIndex((value) => value.id == item.product_id); //get the index of the product object from the json file
      let info = products[positionProduct]; //get the details of the object
      listCartHTML.appendChild(newItem);
      //console.log(`info.price[0] = ${info.price[0]}`);
      let childFound = info.children.filter((product) => {
        return product.weight == item.weight;
      })[0];
      let productPrice = childFound.price;
      console.log(`this is the child price: ${productPrice}`);
      totalItemPrice += Number(productPrice) * Number(item.quantity);
      totalItemPrice = Math.round(totalItemPrice * 100) / 100;
      subtotal += totalItemPrice;
      subtotal = Math.round(subtotal * 100) / 100;
      console.log(`subtotal = ${subtotal}`);
      // console.log(info.price1);
      // console.log(`total price = ${Number(info.price1)} * ${Number(item.quantity)}`);
      newItem.innerHTML = `
      <div class="cartItemImage"><img src="${info.image}"></div>
      <div class="cartItemDetails">
        <div class="cartItemName">${info.name}</div>
        <div class="cartItemWeight">( ${item.weight}g )</div>
        <div class="totalPrice" >$${totalItemPrice}</div>
        <div class="cartItemQuantity">
          <i class="fa-solid fa-minus minus"></i>
          <span>${item.quantity}</span>
          <i class="fa-solid fa-plus plus"></i>
        </div>
      </div>
      `;
    });
  }

  console.log(subtotalSpan);
  subtotalSpan.innerText = `$ ${subtotal}`;
  console.log(`subtotalSpan = ${subtotalSpan.innerText}`);

  for (i = 0; i < cartNbr.length; i++) {
    cartNbr[i].innerText = totalQuantity;
  }
}

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  console.log(event);
  if (positionClick.classList.contains("minus") || positionClick.classList.contains("plus")) {
    let product_id = positionClick.parentElement.parentElement.parentElement.dataset.id;
    let product_weight = positionClick.parentElement.parentElement.parentElement.dataset.weight;
    console.log(`this is the product id: ${product_id}`);
    // let productTotalPriceIndex = positionClick.dataset.id;
    // console.log(productTotalPriceIndex);
    //let productTotalPriceIndex = positionClick.parentElement.parentElement.children.classList.contains("totalPrice");
    //console.log(productTotalPriceIndex);
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type, product_weight);
    1;
  }
});
const changeQuantityCart = (product_id, type, product_weight) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id && value.weight == product_weight);
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

//go to checkout page
checkout.addEventListener("click", () => {
  window.open("checkout.html");
});

 

const initApp = () => {
  console.log("initApp is clicked");
  // get data product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      //addDataToHTML();

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();

toggle.onclick = function () {
  toggle.classList.toggle("active");
  navbar.classList.toggle("active");
};

document.onclick = function (e) {
// console.log(e.target.id);
if (e.target.id !== "navbar" && e.target.id !== "menuIcon") {
 toggle.classList.remove("active");
 navbar.classList.remove("active");
}
};