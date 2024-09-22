let productId;
let thisProduct;
let detail = document.querySelector(".productDetailsDiv");
let productPrice = detail.querySelector(".productPrice");
let q = detail.querySelector("#productQuantity").innerText;
const plus = document.querySelector(".increaseQuantity");
const minus = document.querySelector(".decreaseQuantity");
const number = document.querySelector(".quantityNbr");
let productWeight = detail.querySelector(".productWeightlist");
let productIconDiv = detail.querySelector(".iconsDiv");
let productSubtotal = 0;
// let similarProduct = document.getElementsByClassName("productCard");
let listProduct = document.querySelector(".similarProductsList");
let num = Number(number.innerHTML);
let option = null;
let productIndex = 0;
let checkoutB = document.querySelector(".checkoutBtn");

console.log(num);

let products = null;
// get datas from file json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showDetail();
  });

plus.addEventListener("click", (event) => {
  console.log(event.target);
  num++;
  number.innerHTML = num;
  q++;
  console.log(`this is the quantity: ${q}`);
  refreshInfo();
  //productSubtotal = Number(productPrice) * Number(q);
  //detail.querySelector(".subtotal").innerText = `$ ${productSubtotal}`;
});

minus.addEventListener("click", () => {
  if (num > 1) {
    num--;
    number.innerHTML = num;
    q--;
    console.log(`this is the quantity: ${q}`);
    refreshInfo();
  }
});

// loader
var loader = document.getElementById("loading-spinner");

window.addEventListener("load", () => {
  loader.style.display = "none";
});
// end loader



// // add to cart
// for (var i = 0; i < similarProduct.length; i++) {
//   console.log(`this is i = ${i}`);
//   let similarProductClicked = similarProduct[i];
//   console.log(`this is the similar product: ${similarProductClicked}`);
//   similarProductClicked.addEventListener("click", (event) => {
//     console.log(event);
//     let positionClick = event.target;
//     if (positionClick.classList.contains("addToCartBtn")) {
//       let id_product = positionClick.parentElement.dataset.id;
//       console.log(id_product);
//       addToCart(id_product);
//     }
//   });
// }

function showDetail() {
  // remove datas default from HTML
  // let detail = document.querySelector(".productDetailsDiv");

  productId = new URLSearchParams(window.location.search).get("id");
  thisProduct = products.filter((value) => value.id == productId)[0];

  // let randomId = Math.floor(Math.random() * products.length + 1);
  //if there is no product with id = productId => return to home page
  if (!thisProduct) {
    window.location.href = "/";
  }

  detail.querySelector(".productImg img").src = thisProduct.image;
  detail.querySelector(".productName").innerText = thisProduct.name;
  detail.querySelector(".productPrice").innerText = `From ${thisProduct.price}$`;
  detail.querySelector(".productDescription").innerText = thisProduct.description;
  detail.querySelector(".ingredientsDiv").innerText = thisProduct.ingredients;
  detail.querySelector(".nutritionFactsDiv").innerText = thisProduct.nutritionFacts;
  detail.querySelector(".pdAddToCartBtn").style.backgroundColor = `#${thisProduct.color}`;
  detail.querySelector(".subtotal").innerText = `$ ${productSubtotal}`;

  //insert product weight into li tags ---test---

  let listWeight = thisProduct.children.map((children) => children.weight);
  listWeight.forEach((weight) => {
    let li = document.createElement("li");
    li.classList.add("productWeight");
    li.innerHTML = `${weight}g`;
    li.setAttribute("data-weight", weight);
    li.onclick = () => {
      option = option !== weight ? weight : null;
      console.log(option);
      refreshInfo();
    };
    productWeight.appendChild(li);
  });

  //insert product icons into li tags
  let listIcons = thisProduct.icon;
  console.log(listIcons);
  listIcons.forEach((icon) => {
    console.log(icon);
    let li = document.createElement("li");
    li.classList.add("productIcon");
    li.innerHTML = `
      <img src=${icon.iconSrc}>
      <span class="iconDescStyle">${icon.iconDesc}</span>`;
    productIconDiv.appendChild(li);
  });

  //insert product weight into li tags
  // console.log(`this is the product weight table: ${thisProduct.weight}`);
  // let w = thisProduct.weight;
  // w.forEach((weight, index) => {
  //   console.log(weight);
  //   console.log(`this is the weight index: ${index}`);
  //   let newWeight = document.createElement("li");
  //   newWeight.classList.add("productWeight");
  //   newWeight.onclick = () => {
  //     detail.querySelector(".productPrice").innerText = `$ ${thisProduct.price[index]}`;
  //     productIndex = index;
  //   };
  //   newWeight.innerHTML = `${weight}g`;
  //   productWeight.appendChild(newWeight);
  // });

  let d = detail.querySelector(".pdAddToCartBtn");
  // let q = detail.querySelector("#productQuantity").innerText;

  if(thisProduct.availability === "out of stock"){
    d.disabled = true;
  } else {
    console.log(`this is the quantity: ${q}`);
  d.onmouseover = () => {
    d.style.border = `1px solid #${thisProduct.color}`;
    d.style.color = thisProduct.color;
    d.style.backgroundColor = "white";
    d.style.cursor = "pointer";
  };
  d.onmouseout = () => {
    d.style.border = "none";
    d.style.color = "white";
    d.style.backgroundColor = `#${thisProduct.color}`;
  };

  d.addEventListener("click", (event) => {
    console.log(event);
    //console.log(`this is the index number when add to cart is clicked: ${productIndex}`);
    let positionClick = event.target;
    if (positionClick.classList.contains("pdAddToCartBtn")) {
      console.log("this is the product id: " + productId);
      console.log(`this is the end quantity: ${q}`);
      console.log(option);
      if (option == null) {
        option = thisProduct.children[0].weight;
      }
      console.log(`tis is the option after if: ${option}`);
      addToCart(productId, q, option);
    }
  });
  }

  

  let filteredProducts = products
    .filter((value) => value.id != productId)
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .slice(0, 3);

  filteredProducts.forEach((product) => {
    let newProduct = document.createElement("div");
    newProduct.onclick = (e) => {
      console.log("this is e: " + e);
      let isAddToCart = e.target.classList.contains("addToCartBtn");
      console.log("check if addToCartBtn class exist: " + isAddToCart);
      if (!isAddToCart) {
        window.open(`/productDetails.html?id=${product.id}`);
      }
    };
    newProduct.classList.add("productCard");
    newProduct.dataset.id = product.id;
    newProduct.dataset.weight = product.children[0].weight;
    newProduct.innerHTML = `<img src="${product.image}" alt="">
              <h2>${product.name}</h2>
              <div class="price">from ${product.price} $</div>
              <button class="addToCartBtn">add to cart</button>`;
    listProduct.appendChild(newProduct);
  });

  // products
  //   .filter((value) => value.id != productId)
  //   .forEach((product) => {
  //     let newProduct = document.createElement("div");
  //     newProduct.onclick = () => {
  //       window.open(`/productDetails.html?id=${product.id}`);
  //     };
  //     newProduct.classList.add("productCard");
  //     newProduct.innerHTML = `<img src="${product.image}" alt="">
  //           <h2>${product.name}</h2>
  //           <div class="price">from ${product.price1} $</div>`;
  //     listProduct.appendChild(newProduct);
  //   });
}

// add to cart
listProduct.addEventListener("click", (event) => {
  console.log(event);
  let positionClick = event.target;
  if (positionClick.classList.contains("addToCartBtn")) {
    let id_product = positionClick.parentElement.dataset.id;
    let product_weight = positionClick.parentElement.dataset.weight;
    console.log(`this is the product id clicked: ${id_product}`);
    addToCart(id_product, 1, product_weight);
  }
});

const refreshInfo = () => {
  // colors
  weightOldActive = productWeight.querySelector("li.activeWeight");
  if (weightOldActive) weightOldActive.classList.remove("activeWeight");
  if (option !== null) {
    console.log(`this is option: ${option}`);
    let weightNewActive = productWeight.querySelector('li[data-weight="' + option + '"]');
    console.log(weightNewActive);
    weightNewActive.classList.add("activeWeight");
  }

  // set price
  if (option === null) {
    productPrice.innerText = `$ ${thisProduct.price}`;
    productSubtotal = Math.floor(Number(thisProduct.price) * Number(q) * 10) / 10;
    detail.querySelector(".subtotal").innerText = `$ ${productSubtotal}`;
  } else {
    let childFound = thisProduct.children.filter((product) => {
      return product.weight == option;
    })[0];
    productPrice.innerText = `$ ${childFound.price}`;
    productSubtotal = Math.floor(Number(childFound.price) * Number(q) * 10) / 10;
    console.log(productSubtotal);
    detail.querySelector(".subtotal").innerText = `$ ${productSubtotal}`;
  }
};

//go to checkout page
checkoutB.addEventListener("click", () => {
  window.open("checkout.html");
});

//accordion for description, ingredients, and nutrition facts
const toggleInfo = (element) => {
  const headers = document.querySelectorAll("article header");
  for (let header of headers) {
    header.classList.remove("active");
    header.nextElementSibling.style.height = "0px";
  }

  element.classList.add("active");

  const content = element.nextElementSibling;

  const text = content.querySelector("p");

  content.style.height = `${text.clientHeight}px`;
};