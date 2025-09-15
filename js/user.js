let headerLinks = document.querySelector(".header-links")
let userSideParent = document.querySelector(".user-side-parent")
let userName = document.querySelector(".user-name")
if(localStorage.getItem("username")){
    headerLinks.remove()
    if(userSideParent){
    userSideParent.style.display = "flex"}
    userName.textContent = localStorage.getItem("username")
}
let logoutBtn = document.querySelector(".logout-a");
logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  if(location.href !="index.html"){
    window.location="index.html"
  }else{


   location.reload()
     }
});
