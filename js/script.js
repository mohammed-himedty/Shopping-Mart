
let itemParent = document.querySelector(".item-parent");
let itemDetail = [
  {
    id: 1,
    title: "Apple studio display",
    catagory :  "Display",
    price: 2500,
    Image: "images/studio-display-digitalmat-gallery-1-202203.png",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
  {
    id: 2,
    title: "Macbook Air 13",
    catagory :  "laptop",
    price: 1500,
    Image: "images/macbook-air-13-digitalmat-gallery-1-202503.png",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
  {
    id: 3,
    title: "Iphone 17 pro max",
    catagory :  "phone",
    price: 1200,
    Image: "images/iphone 17.png",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
  {
    id: 4,
    title: "iPad pro",
    catagory :  "Tablets",
    price: 1500,
    Image: "images/ipad pro.png",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
  {
    id: 5,
    title: "iPad air Gen11",
    catagory :  "Tablets",
    price: 1200,
    Image: "images/ipad air.png",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
  {
    id: 6,
    title: "iMac",
    catagory :  "Desktop",
    price: 2000,
    Image: "images/imac-digitalmat-gallery-2-202410.png",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
  {
    id: 7,
    title: "Apple watch ultra 3",
    catagory :  "Watch",
    price: 500,
    Image: "images/apple watch ultra 3.png",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
  {
    id: 8,
    title: "AirPods Max",
    catagory :  "Accessories",
    price: 300,
    Image: "images/airpods_max_midnight__ddy8oa1y3y4i_large.png",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
  {
    id: 9,
    title: "AirPods",
    catagory :  "Accessories",
    price: 200,
    Image: "images/airpods.jpg",
    quantity : 0 ,
    incart : false,
    isfavorite : false
  },
];
// draw product in main page
function drawItem() {
  let y = itemDetail.map((item) => {
      return `
      <div class="item-div-parent col-12 col-md-6 col-lg-4" id ="Item-${item.id}">
  <div class=" card item-div">
  <img src="${item.Image}" alt="#" />
  <div class="card-body">
            <h4 class="card-title">${item.title}</h4>
            <p class="card-text"> Price : $${item.price}</p>
            <p class="card-text"> Catagory : ${item.catagory}</p>
            <div class="btn-i-div">
            <i class="fa-solid fa-heart fav-${item.id} ${item.isfavorite ? "text-danger" : "text-dark"} color-danger" onClick = "AddToFav(${item.id})"></i>
            <button class="btn ${item.incart ?  "btn-danger":"btn-primary"  }  btn-${item.id}" onClick = "AddToCart(${item.id})">${item.incart ?"Remove from cart": "Add to cart"  }</button>
            </div>
            </div>
        </div>
        </div>
`;
    })
    .join("");

  itemParent.innerHTML = y;
}
drawItem();

// ////////////////////////////////////////////////////////
// search logic
let searchBar = document.querySelector(".search-bar-input")
let searchMode = 'title'
function changeSearchMode(value){
  if(value == "Search By Product Name"){
    searchMode = "title"
    searchBar.placeholder = "Search By Product Name"
  }else{
    searchMode = "category"
    searchBar.placeholder = "Search By Category"
  }

searchBar.focus()
}
searchBar.onkeyup = search
function search(){
  itemDetail.map(targetitem=>{

    let thisitem = document.getElementById(`Item-${targetitem.id}`)    
 
    if(searchMode == "title"){
              if(targetitem.title.toLowerCase().includes(searchBar.value.toLowerCase())){
                thisitem.style.display = "flex"  
                itemParent.style.justifyContent = "flex-start"      
              }else{
                thisitem.style.display = "none"        

              }
    }else{
      if(targetitem.catagory.toLowerCase().includes(searchBar.value.toLowerCase())){


                thisitem.style.display = "flex"     
                itemParent.style.justifyContent = "flex-start"      
              }else{
                thisitem.style.display = "none"        

              }
    }
  }
)
}

// //////////////////////////////////////////////////
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
// add item to cart part 

let badge = document.querySelector(".badge");
let addeditem = localStorage.getItem("itemincart")
  ? JSON.parse(localStorage.getItem("itemincart"))
  : [];

  // update total counter for cart
  function updateBadge() {
  let arr = JSON.parse(localStorage.getItem('itemincart')) || [];
  let totalQuantity = 0;
  for (let i = 0; i < arr.length; i++) {
    totalQuantity += parseInt(arr[i].quantity) || 0;
  }
  badge.textContent = totalQuantity ;
}
updateBadge()
// ////////////////////
// function to increase item in cart quantity
function increaseQuantity(id){
  let cartItem = JSON.parse(localStorage.getItem('itemincart')) 
  let item = cartItem.find(i => i.id === id);
  item.quantity ++ 
  document.getElementById(`counter-${id}`).textContent = item.quantity;
  document.getElementById(`Price-${id}`).textContent = item.price * item.quantity
  localStorage.setItem('itemincart',JSON.stringify(cartItem));
updateBadge()
 }
//  ////////
// function to decrease item in cart quantity
function decreaseQuantity(id){
  let cartItem = JSON.parse(localStorage.getItem('itemincart')) 
  let thisbtn = document.querySelector(`.btn-${id}`);
  let z = document.getElementById(`AddedItem-${id}`);
   let item = cartItem.find(i => i.id === id);
 item.quantity --
 document.getElementById(`counter-${id}`).textContent = item.quantity;
  document.getElementById(`Price-${id}`).textContent = item.price * item.quantity
 localStorage.setItem('itemincart',JSON.stringify(cartItem));
  updateBadge()
  if(item.quantity < 1 ){
    itemDetail[id-1].incart = false
    thisbtn.style.background = '#0d6efd'
    thisbtn.textContent = 'Add to cart'
  addeditem = addeditem.filter(i => i.id !== id);
  localStorage.setItem('itemincart', JSON.stringify(addeditem));
  updateBadge()
  if(addeditem.length === 0){
     cartStatusShow.textContent =" Your cart is empty"
    }
  z.remove()
    }
}

// ////////////////////////////////////
// save item that we added to cart when we refresh page
if (addeditem) {
  addeditem.map((choosenItem) => {
   itemDetail[choosenItem.id-1].incart= true
       itemInCartDiv.innerHTML += `<div class = "added-item-div" id="AddedItem-${choosenItem.id}">
 <div>
 <h6>${choosenItem.title}</h6>
 <div class="mt-2">
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
 updateBadge()
 drawItem()
  }) 
  } 


// ///////////////////////////////
// add item to cart on click button 

function AddToCart(id) {
  let choosenItem = itemDetail.find((item) => item.id === id);
  if (localStorage.getItem("username")) {
    if (choosenItem.incart) {
      let exitingItem = document.getElementById(`AddedItem-${id}`);
      exitingItem.remove();
      choosenItem.incart = false
      choosenItem.quantity = 0
      addeditem = addeditem.filter((i) => i.id !== choosenItem.id);
      localStorage.setItem("itemincart", JSON.stringify(addeditem));
updateBadge()
    } else {
      choosenItem.incart = true
      choosenItem.quantity = 1
      addeditem = [...addeditem, choosenItem];
      localStorage.setItem("itemincart", JSON.stringify(addeditem));
updateBadge()
      itemInCartDiv.innerHTML += `<div class = "added-item-div" id="AddedItem-${id}">
 <div class="ms-1">
 <h6>${choosenItem.title}</h6>
 <button class="increase-btn" onClick ="increaseQuantity(${choosenItem.id})">+</button>
 <span id="counter-${id}">${choosenItem.quantity}</span>
 <button class="decrease-btn" onClick="decreaseQuantity(${choosenItem.id})">-</button>
 </div>
 <div class="ms-4">
 <h6>Price :</h6>
 <span id="Price-${id}">${choosenItem.price * choosenItem.quantity}</span>
 </div>
 `;}
  } else {
    window.location = "login.html"
}
  drawItem();
  if(addeditem.length === 0){
    cartStatusShow.textContent =" Your cart is empty"
  }else{
    cartStatusShow.textContent =""
  }
}
  

// ////////////////////////////////////////////////////////
// added favourit item part

let FavItem = localStorage.getItem("FavItem") ? JSON.parse(localStorage.getItem("FavItem")) : []

if(FavItem){
  FavItem.map(item=>{
  itemDetail[item.id-1].isfavorite = true
})
drawItem()
}


function AddToFav(id){
  let favChossenItem = itemDetail.find(item=> item.id == id)
  if(localStorage.getItem("username")){
  if(favChossenItem.isfavorite){
    favChossenItem.isfavorite = false
     FavItem = FavItem.filter(targetitem => targetitem.id !== id)
    localStorage.setItem("FavItem" , JSON.stringify(FavItem))
    
  }else{
    favChossenItem.isfavorite = true
    FavItem = [...FavItem , favChossenItem]
   localStorage.setItem("FavItem" , JSON.stringify(FavItem))
  }
}else{
    window.location = "login.html"
}
drawItem();
}