let regisEmail = document.querySelector(".regis-email")
let regisUsername = document.querySelector(".regis-username")
let regisPassword = document.querySelector(".regis-password")
let regisBtn = document.querySelector(".regis-btn")

regisBtn.addEventListener("click" , function(e){
    e.preventDefault()
    if(regisEmail.value === "" || regisUsername.value === "" ||regisPassword.value ===""){
        alert("please fill all data")
    }else{
        localStorage.setItem("username" , regisUsername.value.trim())
        localStorage.setItem("email" , regisEmail.value.trim())
        localStorage.setItem("password" , regisPassword.value)
        alert("Account Created Successfully !")
        setTimeout(()=>{
        window.location = "login.html"}
    , 300)
    }
})