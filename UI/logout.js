// logout user
const logoutBtn = document.querySelector('#logout')
console.log(logoutBtn)
logoutBtn.addEventListener('click', ()=>{
    
    localStorage.removeItem('token')

    // window.location.href = "login.html"
})