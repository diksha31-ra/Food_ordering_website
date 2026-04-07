// ✅ LOAD CART DATA
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ✅ CLEAN NULL DATA (important fix) */
cart = cart.filter(item => item && item.id);
localStorage.setItem("cart", JSON.stringify(cart));

const cartItemsDiv = document.getElementById("cartItems");
const totalPriceDiv = document.getElementById("totalPrice");

/* ✅ DISPLAY CART */
function displayCart(){

    cartItemsDiv.innerHTML = "";

    if(cart.length === 0){
        cartItemsDiv.innerHTML = "<h3>Your cart is empty 😢</h3>";
        totalPriceDiv.innerText = "";
        return;
    }

    let total = 0;

    cart.forEach((item, index)=>{

        total += item.price * item.quantity;

        cartItemsDiv.innerHTML += `
        <div class="cart-item">

            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>

            <!-- ✅ QUANTITY BOX -->
            <div class="quantity-box">
                <button onclick="decreaseQty(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${index})">+</button>
            </div>

            <button onclick="removeItem(${index})">Remove</button>

        </div>
        `;
    });

    totalPriceDiv.innerText = "Total: ₹" + total;
}
/* ✅ REMOVE ITEM */
window.removeItem = function(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

/* ✅ CART COUNT */
function updateCartCount(){
    document.querySelectorAll("#cart-count").forEach(el=>{
        el.innerText = cart.length;
    });
}

window.increaseQty = function(index){
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

window.decreaseQty = function(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
    } else {
        cart.splice(index,1); // remove if 0
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

/* ✅ INIT */
displayCart();
updateCartCount();



/* CHECKOUT FORM */

const form = document.getElementById("checkoutForm");
const popup = document.getElementById("thankYouPopup");

form.addEventListener("submit", function(e){
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    // ✅ SHOW BILL FIRST
    showBill(cart);

    // ✅ SHOW POPUP AFTER SMALL DELAY
    setTimeout(()=>{
        popup.style.display = "flex";
    }, 9000);

    // ✅ CLEAR CART
    localStorage.removeItem("cart");

    // ✅ REDIRECT AFTER 5 SECONDS
    setTimeout(()=>{
        window.location.href = "index.html";
    }, 10000);
});


/* BILL FUNCTION */
function showBill(cart){

    const billSection = document.getElementById("billSection");
    const billItems = document.getElementById("billItems");
    const billTotal = document.getElementById("billTotal");

    const orderIdEl = document.getElementById("orderId");
    const orderDateEl = document.getElementById("orderDate");

    // ✅ GENERATE ORDER ID
    const orderId = "FH" + Math.floor(Math.random() * 100000);

    // ✅ GET DATE & TIME
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    orderIdEl.innerText = "Order ID: " + orderId;
    orderDateEl.innerText = "Date: " + date + " | Time: " + time;

    billItems.innerHTML = "";

    let total = 0;

    cart.forEach(item=>{
        total += item.price * item.quantity;

        billItems.innerHTML += `
        <div class="bill-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>
        `;
    });

    billTotal.innerText = "Total: ₹" + total;

    billSection.style.display = "block";
}