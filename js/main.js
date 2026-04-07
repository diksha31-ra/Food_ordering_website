let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ✅ REMOVE NULL / BROKEN ITEMS */
cart = cart.filter(item => item && item.id);
localStorage.setItem("cart", JSON.stringify(cart));

import { foodItems } from "./data.js";



const foodMenu = document.getElementById("foodMenu");
const searchBar = document.getElementById("searchBar");

/* ✅ EVENT DELEGATION (FIX CLICK ISSUE) */
foodMenu.addEventListener("click", function(e){

    const btn = e.target.closest(".add-btn");

    if(!btn) return;

    const id = Number(btn.dataset.id);

    if(!id){
        console.error("Invalid ID");
        return;
    }

    addToCart(id);
});

/* ✅ DISPLAY FOOD */
function displayFood(items){
    foodMenu.innerHTML = "";

    items.forEach(item => {
        foodMenu.innerHTML += `
        <div class="food-card">
            <img src="${item.img}">

            <div class="food-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <h4>₹${item.price}</h4>

                <button class="add-btn" data-id="${item.id}">
                    Add to Cart
                </button>
            </div>
        </div>
        `;
    });
}


function showToast(message){

    const toast = document.getElementById("toast");
    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    }, 2000);
}


/* ✅ ADD TO CART (SAFE VERSION) */
function addToCart(id){

    const item = foodItems.find(f => f.id === id);

    if(!item) return;

    const exists = cart.find(f => f.id === id);

    if(exists){
        exists.quantity++;
        showToast("Quantity Increased 🔼");
    } else {
        cart.push({...item, quantity:1});
        showToast("Item Added to Cart ✅");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* ✅ SEARCH */
searchBar?.addEventListener("keyup", ()=>{
    const value = searchBar.value.toLowerCase();

    const filtered = foodItems.filter(f =>
        f.name.toLowerCase().includes(value)
    );

    displayFood(filtered);
});

/* ✅ FILTER */
window.filterFood = function(category){
    if(category === "all"){
        displayFood(foodItems);
    } else {
        const filtered = foodItems.filter(f => f.category === category);
        displayFood(filtered);
    }
}

/* ✅ CART COUNT */
function updateCartCount(){
    document.querySelectorAll("#cart-count").forEach(el=>{
        el.innerText = cart.length;
    });
}

/* INIT */
displayFood(foodItems);
updateCartCount();