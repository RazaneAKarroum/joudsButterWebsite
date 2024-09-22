let cartSummary = document.querySelector("#checkoutBody");
let subtotalCheckout = document.querySelector(".subtotalCount");
let deliveryFeeSpan = document.querySelector(".deliveryFeeCount");
let deliveryFee = 3;
let totalCheckout = document.querySelector(".totalCartCount");
let billingDelivery = document.querySelector("#billingDeliveryDetailsDiv");


function showBillingDiv(sameDelivery) {
  var sameDelivery = document.querySelector("#billingDeliveryAddress");
  console.log(sameDelivery);
  billingDelivery.style.display = sameDelivery.checked ? "none" : "block";
  console.log(billingDelivery);
}

let products = null;
    // get data product
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => {
        products = data;
        //addDataToHTML();
  
        // get data cart from memory
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
          addCartToCheckout();
        }
      });

const addCartToCheckout = () => {
     console.log(`addCartToCheckout function is entered`);
    cartSummary.innerHTML = "";
    let totalCheckoutCount = 0; //this is the total quantity of items in cart to be displayed in shopping cart icon
    let subtotal = 0; //this is the total price of all items added to cart
    if (cart.length > 0) {
      cart.forEach((item) => {
        // totalQuantity += item.quantity;
        let totalItemPrice = 0; //this is the total price of each item seperately
        // totalQuantity +=
        // console.log(typeof totalQuantity);
        // console.log(typeof item.quantity);
        // console.log(totalQuantity);
  
        let newItem = document.createElement("tr"); //<tr></tr>
        // newItem.classList.add("cartItem"); //<div class="cartItem"></div>
        newItem.dataset.id = item.product_id; //<div class="cartItem" data-id="product_id"></div>
        newItem.dataset.weight = item.weight; //<div class="cartItem" data-id="product_id" data-weight="weight"></div>
  
        let positionProduct = products.findIndex((value) => value.id == item.product_id); //get the index of the product object from the json file
        let info = products[positionProduct]; //get the details of the object
        cartSummary.appendChild(newItem);
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
        <td class="checkoutItemImg">
            <img src="${info.image}">
        </td>
        <td>
            <a>${info.name}</a>
            <span>( ${item.weight}g )</span>
        </td>
        <td>
            <span>${item.quantity}</span>
        </td>
        <td>
            <span>$${productPrice}</span>
        </td>
        <td>
            <span>$${totalItemPrice}</span>
        </td>
        `;
      });
    }

    subtotalCheckout.innerText = `$ ${subtotal}`;
    deliveryFeeSpan.innerText = `$${deliveryFee}`;
    totalCheckoutCount = subtotal + deliveryFee;
    totalCheckout.innerText = `$${totalCheckoutCount}`

  };

