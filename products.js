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
  let listProductHTML = document.querySelector(".allProductsDiv");

  // add new datas
  if (products != null) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      // newProduct.onclick = () => {
      //   window.open(`/productDetails.html?id=${product.id}`);
      // };
      newProduct.dataset.id = product.id;
      newProduct.classList.add("productCard");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <span>${product.name}</span>
                <span class="price">from ${product.price1}</span>
                <button class="addToCartBtn">add to cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
}
