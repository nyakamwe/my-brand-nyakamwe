let users=[]

// validate login form
const form_login = document.getElementById('form-login')
const username_login = document.getElementById('username-login')
const password_login = document.getElementById('password-login')


form_login.addEventListener('submit',(e)=>{
    e.preventDefault();

    checkInputs();

    form_login.reset();
})

function checkInputs(){
    //collect values from inputs
    const usernameValue = username_login.value.trim()
    const passwordValue = password_login.value.trim()


    if(usernameValue === ''){
        //show error
        setErrorFor(username_login,"Username required!")

    }else{

        setSuccessFor(username_login)
    }

    if(passwordValue === ''){
        //show error
        setErrorFor(password_login,"Password required!")

    }else{
        setSuccessFor(password_login)
        

        const logged_user={
            usernameValue,
            passwordValue
        }

        // check if user exists in our localStorage

        let usersJSON= localStorage.getItem('users');
        users = JSON.parse(usersJSON);
        users.forEach(function(user){

         if (user.username === usernameValue && user.password === passwordValue){
             
             window.location.href="admin-dashboard.html"
         }
         else{

             //show error
            setErrorFor(username_login,"Username or Password do not exists!")

             //show error
             setErrorFor(password_login,"Username or Password do not exists!")
         }
        })
        
        
        
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