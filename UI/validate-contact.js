let messages = []
let email='';
let name = '';
let topic  ='';
let content = '';

const form_contact = document.getElementById('form-contact')
const senderName = document.getElementById('name')
const senderEmail = document.getElementById('email')
const subject = document.getElementById('subject')
const message = document.getElementById('text')

form_contact.addEventListener('submit',(e)=>{
    e.preventDefault();

    //collect values from inputs
    const senderNameValue = senderName.value.trim()
    const senderEmailValue = senderEmail.value.trim()
    const subjectValue = subject.value.trim()
    const textValue = message.value.trim()

    if(senderNameValue === ''){
        //show error
        setErrorFor(senderName,"Name required!")

    }else{
        name = senderNameValue
        setSuccessFor(senderName)
    }

    if(subjectValue === ''){
        //show error
        setErrorFor(subject,"Subject is required!")

    }else{
        topic = subjectValue
        setSuccessFor(subject)
    }

    if(textValue === ''){
        //show error
        setErrorFor(message,"Text is required!")

    }else{
        content = textValue
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
        email = senderEmailValue
        setSuccessFor(senderEmail) 
    }

    const sendQueryEndpoint = "https://atlp-blog-api-nyakamwe.herokuapp.com/api/messages";
    console.log(sendQueryEndpoint)
    async function sendQuery(){
        const res = await fetch(sendQueryEndpoint,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "name":`${name}`,
                "sender":`${email}`,
                "subject":`${topic}`,
                "content":`${content}`
            })
            
        })

        if(res.status == 200){
      
        location.href='/index.html'
           
        
        }else{
            console.log(await res.json())
            
        }

    }
    sendQuery()



})


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