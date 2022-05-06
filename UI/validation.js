let pssword='';
let mail ='';
let uname ='';

const form_register = document.getElementById('form-register')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirm_password = document.getElementById('confirm-password')

const p = document.getElementById('required')

form_register.addEventListener("submit", function(e){
        e.preventDefault();

        p.textContent = ""

        //collect values from inputs
        const usernameValue = username.value.trim()
        const emailValue = email.value.trim()
        const passwordValue = password.value.trim()
        const confirm_passwordValue = confirm_password.value.trim()

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
            pssword = passwordValue
        }

        
        if(isEmail(emailValue)){
            mail = emailValue
            setSuccessFor(email)
        }else{
            setErrorFor(email, "Email is not valid")
        }

        if(usernameValue !== ''){
            setSuccessFor(username)
            uname = usernameValue
        }else{
            setErrorFor(username, "username can't be empty")
        }
        
        // fetch api
        const registerEndpoint = "https://atlp-blog-api-nyakamwe.herokuapp.com/api/users/register";

        async function registerUser(){
            const res = await fetch(registerEndpoint,{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "email":`${mail}`,
                    "username":`${uname}`,
                    "password":`${pssword}`
                })
                
            })

            if(res.status == 201){

            window.location.href="login.html"

            }else{
                // console.log(await res.json())
                const msg = await res.json()
                p.textContent = `${msg.message}`

                if(p.textContent == 'user already exists'){
                    setErrorFor(email, 'Email exists')
                }
                
            }
           
        }
        registerUser()
    
})


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