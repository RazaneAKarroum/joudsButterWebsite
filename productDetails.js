let detail = document.querySelector(".productDetailsDiv");
let q = detail.querySelector("#productQuantity").innerText;
const plus = document.querySelector(".increaseQuantity");
const minus = document.querySelector(".decreaseQuantity");
const number = document.querySelector(".quantityNbr");
// let similarProduct = document.getElementsByClassName("productCard");
let listProduct = document.querySelector(".similarProductsList");
let num = Number(number.innerHTML);
let productIndex = 0;

console.log(num);

plus.addEventListener("click", () => {
  num++;
  number.innerHTML = num;
  q++;
  console.log(`this is the quantity: ${q}`);
});

minus.addEventListener("click", () => {
  if (num > 1) {
    num--;
    number.innerHTML = num;
    q--;
    console.log(`this is the quantity: ${q}`);
  }
});

// loader
var loader = document.getElementById("loading-spinner");

window.addEventListener("load", () => {
  loader.style.display = "none";
});
// end loader

let products = null;
// get datas from file json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showDetail();
  });

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

  let productId = new URLSearchParams(window.location.search).get("id");
  let thisProduct = products.filter((value) => value.id == productId)[0];
  let productWeight = detail.querySelector(".productWeightlist");
  // let randomId = Math.floor(Math.random() * products.length + 1);
  //if there is no product with id = productId => return to home page
  if (!thisProduct) {
    window.location.href = "/";
  }

  detail.querySelector(".productImg img").src = thisProduct.image;
  detail.querySelector(".productName").innerText = thisProduct.name;
  detail.querySelector(".productPrice").innerText = `From ${thisProduct.price[0]}$`;
  detail.querySelector(".productDescription").innerText = "$" + thisProduct.description;
  detail.querySelector(".pdAddToCartBtn").style.backgroundColor = `#${thisProduct.color}`;

  //insert product weight into li tags
  console.log(`this is the product weight table: ${thisProduct.weight}`);
  let w = thisProduct.weight;
  w.forEach((weight, index) => {
    console.log(weight);
    console.log(`this is the weight index: ${index}`);
    let newWeight = document.createElement("li");
    newWeight.classList.add("productWeight");
    newWeight.onclick = () => {
      detail.querySelector(".productPrice").innerText = `$ ${thisProduct.price[index]}`;
      productIndex = index;
    };
    newWeight.innerHTML = `${weight}g`;
    productWeight.appendChild(newWeight);
  });

  let d = detail.querySelector(".pdAddToCartBtn");
  // let q = detail.querySelector("#productQuantity").innerText;
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
      addToCart(productId, q);
    }
  });

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
    newProduct.innerHTML = `<img src="${product.image}" alt="">
              <h2>${product.name}</h2>
              <div class="price">from ${product.price[0]} $</div>
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
    console.log(`this is the product id clicked: ${id_product}`);
    addToCart(id_product, 1, 0);
  }
});
