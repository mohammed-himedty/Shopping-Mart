let itemParent = document.querySelector(".item-parent");
let favItemDiv = document.querySelector(".fav-item-div");
let priceTitle = document.querySelector(".item-side h3 span");

// //// draw chossen product in main page
function drawChossenItem() {
  let chossenpProduct = JSON.parse(localStorage.getItem("itemincart"));
  let y = chossenpProduct.map(function (item) {
    UpdateTotalPrice()
    return `
    <div class="col-12 col-md-6">
      <div class="added-item-div" id="Item-${item.id}">
        <div class ="col-4">
        <img src = "${item.Image}" />
        </div>
        <div class="ms-3">
          <h4 class ="pb-2 pt-4">${item.title}</h4>
           <h6 class ="pb-2">Category : <span id="Category-${item.id}">${item.catagory}</span></h6>
           <h6 class ="pb-3">Price : <span id="Price-${item.id}">${item.price}</span></h6>
          <button class="increase-btn" onClick ="increaseQuantity(${item.id})">+</button>
          <span id="counter-${item.id}">${item.quantity}</span>
          <button class="decrease-btn" onClick="decreaseQuantity(${item.id})">-</button>
          <button class ="btn btn-danger ms-lg-5 remove-from-cart-btn" onClick = "deleteChossenItem(${item.id})">Remove from cart </button>
          </div>
      </div>
      </div>
    `;
  });

  itemParent.innerHTML = y.join("");
  if(chossenpProduct.length == 0 ){
   itemParent.innerHTML = "your cart is empty"
  }
}
drawChossenItem();

// //////
// open cart when we click on it
let itemInCartDiv = document.querySelector(".item-in-cart div");
let itemInCartDivParent = document.querySelector(".item-in-cart");
let cartStatusShow = document.querySelector(".cart-status-show");
let shoppinIcon = document.querySelector(".shoppin-icon");
shoppinIcon.addEventListener("click", Opencart);

function Opencart() {
  if (itemInCartDiv.innerHTML !== "" ) {
    if (itemInCartDivParent.style.display === "none") {
      itemInCartDivParent.style.display = "block";
    } else {
      itemInCartDivParent.style.display = "none";
    }
  }
  
  if (itemInCartDiv.innerHTML == "") {
    itemInCartDivParent.style.display = "none";
  }
}
// /////////////////////////////////
// draw added item in cart 
function updateItemInCart(){
   let chossenpProduct = JSON.parse(localStorage.getItem("itemincart"));
  chossenpProduct.map(function (choosenItem) {
   itemInCartDiv.innerHTML += `<div class = "added-item-in-cart-div" id="AddedItem-in-cart-${choosenItem.id}">
 <div>
 <h6>${choosenItem.title}</h6>
 <div class="mt-3">
 <button class="decrease-btn" onClick="decreaseQuantity(${choosenItem.id})">-</button>
 <span id="counter-${choosenItem.id}">${choosenItem.quantity}</span>
 <button class="increase-btn" onClick ="increaseQuantity(${choosenItem.id})">+</button>
 </div>
 </div>
 <div>
 <h6>Price :</h6>
 <span id="Price-${choosenItem.id}">$${choosenItem.price * choosenItem.quantity}</span>
 </div>
 `
  })
}
updateItemInCart()
// /////////
//  update badge counter
let badge = document.querySelector(".badge");
 function updateBadge() {
  let arr = JSON.parse(localStorage.getItem('itemincart')) || [];
  let totalQuantity = 0;
  for (let i = 0; i < arr.length; i++) {
    totalQuantity += parseInt(arr[i].quantity) || 0;
  }
  badge.textContent = totalQuantity;
}
updateBadge()
// /////////
// update total counter 
function UpdateTotalPrice(){
  let chossenpProduct = JSON.parse(localStorage.getItem("itemincart"));
  let totalprice = 0 
    for(let i = 0 ; i< chossenpProduct.length ; i++  ){
      totalprice += chossenpProduct[i].price * chossenpProduct[i].quantity
    }
    priceTitle.textContent = totalprice ? totalprice.toFixed(2) : "0.00"
}
// //////
// function to increase item  quantity
function increaseQuantity(id){
  let cartItem = JSON.parse(localStorage.getItem('itemincart')) 
  let item = cartItem.find(i => i.id === id);
  item.quantity ++ 
  document.getElementById(`counter-${id}`).textContent = item.quantity;
  document.getElementById(`Price-${id}`).textContent = item.price * item.quantity
  localStorage.setItem('itemincart',JSON.stringify(cartItem));
  updateBadge()
  UpdateTotalPrice()
  drawChossenItem()
 }
//  ////////
// function to decrease item  quantity
function decreaseQuantity(id){
  let cartItem = JSON.parse(localStorage.getItem('itemincart')) 
  let AddedItemInCart = document.getElementById(`AddedItem-in-cart-${id}`)
   let item = cartItem.find(i => i.id === id);
 item.quantity --
 document.getElementById(`counter-${id}`).textContent = item.quantity;
 document.getElementById(`Price-${id}`).textContent = item.price * item.quantity
 localStorage.setItem('itemincart',JSON.stringify(cartItem));
 if(item.quantity < 1 ){
  AddedItemInCart.remove() 
  cartItem = cartItem.filter(i => i.id !== id);
   localStorage.setItem('itemincart', JSON.stringify(cartItem));
   if(cartItem.length === 0){
    cartStatusShow.textContent =" Your cart is empty"
  }else{
    cartStatusShow.textContent =""
  }
}
updateBadge()
UpdateTotalPrice()
drawChossenItem()
}
// /////////
// 
 function deleteChossenItem(id){
   let AddedItemInCart = document.getElementById(`AddedItem-in-cart-${id}`)
    let arr = JSON.parse(localStorage.getItem('itemincart')) || [];
    arr = arr.filter(i => i.id !== id);
    localStorage.setItem('itemincart', JSON.stringify(arr));
    AddedItemInCart.remove()
    UpdateTotalPrice()  
    updateBadge()  
    drawChossenItem()
    if(arr.length == 0){
  itemParent.innerHTML = "your cart is empty"
    cartStatusShow.textContent =" Your cart is empty"
  }else{
    cartStatusShow.textContent =""
  }
}

// /////// draw chossen fav product in main page
let choosenFavProduct = JSON.parse(localStorage.getItem("FavItem"))
function drawChoosenFavProduct (){
  let y =choosenFavProduct.map(item=>{
return `
  <div class="col-lg-3 col-md-4 col-sm-6 col-12 fav-div item-${item.id}">
  <div class="fav-img-div">
  <img src="${item.Image}" />
  </div>
  <div>
  <h4>${item.title}</h4>
  <h6>Category : ${item.catagory} </h6>
  <i class="fa-solid fa-heart fav-${item.id}" onClick = "RemoveFromFav(${item.id})"></i>
  </div>
  </div>
`
  })

  favItemDiv.innerHTML +=  y.join("")
  if(choosenFavProduct.length == 0){
    favItemDiv.style.height = "35px"
    favItemDiv.innerHTML = "You have no favorite item"
  }else{
    favItemDiv.style.height = "350px"
  }
}
drawChoosenFavProduct()

// ///////////////////

function RemoveFromFav(id){
  let thisDiv = document.querySelector(`.item-${id}`)
  thisDiv.remove() 
  choosenFavProduct =  choosenFavProduct.filter(targetitem=> targetitem.id !== id)
  localStorage.setItem("FavItem" , JSON.stringify(choosenFavProduct))
  
  if(choosenFavProduct.length == 0){
    favItemDiv.innerHTML = "You have no favorite item"
    favItemDiv.style.height = "35px"
}
}
