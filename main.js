const toggle = document.getElementById("togglerDiv");
const navbar = document.getElementById("navbar");

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
  console.log(link);
  let pageLink = `${link.id}.html`;
  console.log(pageLink);
  console.log(link.id);
  window.open(pageLink);
}

let products = null;
// get datas from file json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
  });

function addDataToHTML() {
  // remove datas default from HTML
  let listProductHTML = document.querySelector(".allProductsDiv");

  // add new datas
  if (products != null) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.onclick = () => {
        window.open(`/productDetails.html?id=${product.id}`);
      };
      newProduct.classList.add("productCard");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <span>${product.name}</span>
                <div class="price">from ${product.price1}</div>
                <button class="addToCartBtn">add to cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
}
