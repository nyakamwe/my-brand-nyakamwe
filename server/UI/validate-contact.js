let messages = []
const form_contact = document.getElementById('form-contact')
const senderName = document.getElementById('name')
const senderEmail = document.getElementById('email')
const subject = document.getElementById('subject')
const message = document.getElementById('text')

form_contact.addEventListener('submit',(e)=>{
    e.preventDefault();

    checkInputs();

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
        

        
    }
    
    if(senderEmailValue !== '' && textValue !== '' && subjectValue !== '' && senderNameValue !== ''){
        
        window.location.href="index.html"

        const messagesJSON = localStorage.getItem('messages')
        if(messagesJSON !== null){
            messages = JSON.parse(messagesJSON)
            
        }

        messages.push({
            sender:senderEmailValue,
            name:senderNameValue,
            message:textValue,
            date:"31 March, 2022"
            
        })
        localStorage.setItem('messages',JSON.stringify(messages))
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