let getusername = localStorage.getItem("email")
let getpassword = localStorage.getItem("password")
let loginEmail = document.querySelector(".login-email")
let loginPassword = document.querySelector(".login-password")
let loginBtn = document.querySelector(".signin-btn")
loginBtn.addEventListener("click" , function(e){
    e.preventDefault()
    if(loginEmail.value.trim() !== getusername || loginPassword.value !== getpassword){
        alert("Your username or password is incorrect")
    }else{
        setTimeout(()=>
        window.location = "index.html"
       ,1000 )
    }
})