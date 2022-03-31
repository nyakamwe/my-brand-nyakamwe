
const form_contact = document.getElementById('form-contact')
const senderName = document.getElementById('name')
const senderEmail = document.getElementById('email')
const subject = document.getElementById('subject')
const message = document.getElementById('text')

form_contact.addEventListener('submit',(e)=>{
    e.preventDefault();

    checkInputs();

    form_contact.reset();
})

function checkInputs(){
    //collect values from inputs
    const senderNameValue = senderName.value.trim()
    const senderEmailValue = senderEmail.value.trim()
    const subjectValue = subject.value.trim()
    const textValue = message.value.trim()


    if(senderNameValue === ''){
        //show error
        setErrorFor(senderName,"Name required!")

    }else{

        setSuccessFor(senderName)
    }


    if(subjectValue === ''){
        //show error
        setErrorFor(subject,"Subject is required!")

    }else{

        setSuccessFor(subject)
    }

    if(textValue === ''){
        //show error
        setErrorFor(message,"Text is required!")

    }else{

        setSuccessFor(message)
    }




    if(senderEmailValue === ''){
        //show error
        setErrorFor(senderEmail,"Email required!")

    }else if(!isEmail(senderEmailValue)){
        //show error
        setErrorFor(senderEmail,"Email is not valid")

    }
    else{
        setSuccessFor(senderEmail)
        

        // const logged_user={
        //     usernameValue,
        //     passwordValue
        // }

        // // check if user exists in our localStorage

        // let usersJSON= localStorage.getItem('users');
        // users = JSON.parse(usersJSON);
        // users.forEach(function(user){

        //  if (user.username === usernameValue && user.password === passwordValue){
             
        //      window.location.href="admin-dashboard.html"
        //  }
        //  else{

        //      //show error
        //     setErrorFor(username_login,"Username or Password do not exists!")

        //      //show error
        //      setErrorFor(password_login,"Username or Password do not exists!")
        //  }
        // })
        
        
        
    }
}


// function to show error
function setErrorFor(input, message){
    const formControl = input.parentElement
    console.log(formControl)
    const small = formControl.querySelector('small')

    small.innerText = message


    //add class error
    formControl.className ="control error"
}

//function to show success
function setSuccessFor(input){
    const formControl = input.parentElement

    //add class success
    formControl.className ="control success"
}

// regex function to validate email
function isEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}