
let tokens=[]

let data ={
    username : '',
    password : ''
}

// validate login form
const form_login = document.getElementById('form-login')
const username_login = document.getElementById('username-login')
const password_login = document.getElementById('password-login')


const p = document.getElementById('show-message')

form_login.addEventListener('submit',(e)=>{
    e.preventDefault();

    p.textContent = ""

    //collect values from inputs
    const usernameValue = username_login.value.trim()
    const passwordValue = password_login.value.trim()

    if(usernameValue === ''){
        //show error
        setErrorFor(username_login,"Username required!")

    }else{
        data.username = usernameValue
        setSuccessFor(username_login)
    }

    if(passwordValue === ''){
        //show error
        setErrorFor(password_login,"Password required!")

    }else{
        data.password = passwordValue
        setSuccessFor(password_login)

    }    
   
const endpoint = "https://atlp-blog-api-nyakamwe.herokuapp.com/api/users/login";

async function loginUser(){
    const user_obj = await fetch(endpoint,{
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }
    )
    if(user_obj.status == 200){
     const userToken = await user_obj.json()

     tokens.push(userToken)

     // save token in local storage
     localStorage.setItem('tokens', JSON.stringify(tokens))

     // redirect to admin panel
     window.location.href="admin-dashboard.html"

    }else{
       
        const msg = await user_obj.json()
        p.textContent = `${msg.message}`

        if(p.textContent === 'Invalid username or password.'){
            setErrorFor(username_login,"invalid username!")
            setErrorFor(password_login,"invalid password!")
        }else if(p.textContent === 'Not User.'){
            setErrorFor(username_login,"not username")
            setErrorFor(password_login,"not password")
        }
    }
   
}

loginUser();   

})

// function checkInputs(){
//     //collect values from inputs
//     const usernameValue = username_login.value.trim()
//     const passwordValue = password_login.value.trim()


//     if(usernameValue === ''){
//         //show error
//         setErrorFor(username_login,"Username required!")

//     }else{

//         setSuccessFor(username_login)
//     }

//     if(passwordValue === ''){
//         //show error
//         setErrorFor(password_login,"Password required!")

//     }else{
//         setSuccessFor(password_login)
        

//         // const logged_user={
//         //     usernameValue,
//         //     passwordValue
//         // }

//         // check if user exists in our localStorage

//         // let usersJSON= localStorage.getItem('users');
//         // users = JSON.parse(usersJSON);
//         // users.forEach(function(user){

//         //  if (user.username === usernameValue && user.password === passwordValue){
//           if(usernameValue && passwordValue){
//             setSuccessFor(username_login)
//             setSuccessFor(password_login)

//             //clear the form
//             form_login.reset();

            

//             // redirect to admin page
//             window.location.href="admin-dashboard.html"
           

//          }
//          else{

//              //show error
//             setErrorFor(username_login,"Username or Password do not exists!")

//              //show error
//              setErrorFor(password_login,"Username or Password do not exists!")
//          }
//         }
        
        
        
//     }



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
