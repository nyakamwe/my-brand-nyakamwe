// validate register form 
let users=[]

const form_register = document.getElementById('form-register')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirm_password = document.getElementById('confirm-password')


form_register.addEventListener("submit", function(e){
    e.preventDefault();

    checkInputs();

})


function checkInputs(){

    //collect values from inputs
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const confirm_passwordValue = confirm_password.value.trim()


    if(usernameValue === ''){

        //show error
        setErrorFor(username, "Username can not be empty!")
    }else{

        setSuccessFor(username)

    }

    if(emailValue === ''){
         //show error
         setErrorFor(email, "Email can not be empty!")
    }
    else if(!isEmail(emailValue)){
        console.log(emailValue)
        //show error
        setErrorFor(email, "Email is not valid!")
    }
    else{

        //show success
        setSuccessFor(email)

    }

    if(passwordValue === ''){
        //show error
        setErrorFor(password, "Password is empty!")
    }else{
        setSuccessFor(password)
    }

    if(confirm_passwordValue === ''){
        //show error
        setErrorFor(confirm_password, "Confirm Password is empty!")
    }else if(confirm_passwordValue !== passwordValue){
        //show error
        setErrorFor(confirm_password, "Passwords do not match!")
    }
    
    else{
        setSuccessFor(confirm_password)
        // reset the form
        form_register.reset();
        
        // add user to the localstorage

        const usersJSON = localStorage.getItem('users')
        if(usersJSON !== null){
            users = JSON.parse(usersJSON)
            
        }

        users.push({
            email:emailValue,
            username:usernameValue,
            password:passwordValue,
            role:"Admin"
        })

        localStorage.setItem('users', JSON.stringify(users))


        // redirect to login page
        window.location.href="login.html"
    }
}


// function to show error
function setErrorFor(input, message){
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText = message


    //add class error
    formControl.className ="form-control error"
}

//function to show success
function setSuccessFor(input){
    const formControl = input.parentElement

    //add class success
    formControl.className ="form-control success"
}

// regex function to validate email
function isEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}




