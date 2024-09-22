let listProductHTML = document.querySelector(".allProductsDiv");

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
    addDataToProducts();
  });

function addDataToProducts() {
  // remove datas default from HTML
  // let listProductHTML = document.querySelector(".allProductsDiv");

  // add new datas
  if (products != null) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.onclick = (e) => {
        console.log("this is this: " + e);
        let isAddToCart = e.target.classList.contains("addToCartBtn");
        console.log("check if addToCartBtn class exist: " + isAddToCart);
        if (!isAddToCart) {
          window.open(`/productDetails.html?id=${product.id}`);
        }
      };
      newProduct.dataset.id = product.id;
      newProduct.dataset.weight = product.children[0].weight;
      newProduct.classList.add("productCard");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <span>${product.name}</span>
                <span class="price">from $ ${product.price}</span>
                <button class="addToCartBtn">add to cart</button>`;

      if(product.availability === "out of stock"){
        console.log(`${product.name} is out of stock`);
        newProduct.innerHTML += `
                <div class="outOfStockBanner"><span>Out Of Stock</span></div>`
      }          
      listProductHTML.appendChild(newProduct);
    });
  }
}

// add to cart
listProductHTML.addEventListener("click", (event) => {
  console.log(event);
  let positionClick = event.target;
  if (positionClick.classList.contains("addToCartBtn")) {
    let id_product = positionClick.parentElement.dataset.id;
    let productWeight = positionClick.parentElement.dataset.weight;
    console.log(id_product, productWeight);
    addToCart(id_product, 1, productWeight);
  }
});
