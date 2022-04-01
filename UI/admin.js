let articles =[]
let users=[]
const add_form = document.getElementById('add-article-form');
const title = document.getElementById('blog-title')
const description = document.getElementById('blog-description')
const image = document.getElementById('blog-poster')

const username = document.getElementById('username')
const email = document.getElementById('email')
const role = document.getElementById('role')
const profileImage = document.getElementById('profile-image')


add_form.addEventListener('submit', (e)=>{
    e.preventDefault();

    checkInputs();

    add_form.reset();
})

function checkInputs(){
    //collect values from inputs of add-article form
    const titleValue = title.value.trim()
    const descriptionValue = description.value.trim()
    const imageValue = image.value.trim()

    //collect values from inputs of add-user form    
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const roleValue = role.value.trim()
    const profileImageValue = profileImage.value.trim()
    

    if(titleValue === '' ){
        //show error
        setErrorFor(title, "Title can not be empty!")
    }
    else{
        setSuccessFor(title)
    }

    if(descriptionValue === ''){
        //show error
        setErrorFor(description, "Description can not be empty!")

    }else{
        setSuccessFor(description)
    }


    // add article or blog in local storage
    if(titleValue.length > 0 && descriptionValue.length >0 ){
        const articlesjson = localStorage.getItem('articles')
        if(articlesjson !== null){
            articles = JSON.parse(articlesjson)
            
        }
        articles.push({
            title:titleValue,
            description:descriptionValue,
            created_at:"01 April, 2022",
            imageUrl:imageValue
        })

        localStorage.setItem('articles',JSON.stringify(articles))
    }


    // value of adding user form
    if(usernameValue === ''){
        //show error
        setErrorFor(username, "Username can not be empty!")

    }else{
        setSuccessFor(username)
    }

    if(emailValue === ''){
        //show error
        setErrorFor(email, "Email can not be empty!")

    }else if(!isEmail(emailValue)){
        //show error
        setErrorFor(email, "Email is not valid!")
    }
    else{
        setSuccessFor(email)
    }

    // adding user to localstorage
    if(usernameValue.length > 0 && emailValue.length >0 ){

        const usersJSON = localStorage.getItem('users')
        if(usersJSON !== null){
            users = JSON.parse(usersJSON)
            
        }

        users.push({
            username:usernameValue,
            email:emailValue,
            role:roleValue,
            imageUrl:profileImageValue,
            password:12345
        })

        localStorage.setItem('users',JSON.stringify(users))

        //redirect to users page
        window.location.href="admin-dashboard.html#users"
    }


}


const form_add_user = document.getElementById('add-user-form')
form_add_user.addEventListener('submit',function(e){
    e.preventDefault();

    checkInputs();

    form_add_user.reset();
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


// display users from local storage

const usersjson = localStorage.getItem('users')
if(usersjson !== null){
    users = JSON.parse(usersjson)
}

users.forEach(function(user){
    // get body of the table
    const tbody = document.querySelector('#users-table-body')
    tbody.insertAdjacentHTML('afterbegin',
    `
    <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
    </tr>
    `
    )
})


// display articles from local storage

const articlesJSON = localStorage.getItem('articles')
blogs= JSON.parse(articlesJSON)

blogs.forEach(function(blog){
    // get body of table
    const tbody = document.querySelector('#blogs-table-body')
    tbody.insertAdjacentHTML('afterbegin',
    `
    <tr>
        <td>${blog.title}</td>
        <td>${blog.description}</td>
        <td>${blog.created_at}</td>
        <td>
        <a  href="#edit-article" title="Edit"><i class="fas fa-edit" style="color:#000"></i></a>&nbsp;&nbsp;&nbsp;
        <a  href="#delete-article" title="Delete"><i class="fas fa-trash" style="color:red"></i></a>    
        </td>
    </tr>
    `
    )
})

// display messages from local storage

const messagesJSON = localStorage.getItem('messages')
if(messagesJSON !== null){
    messages = JSON.parse(messagesJSON)
}

messages.forEach(function(message){
    // get body of the table
    const tbody = document.querySelector('#messages-table-body')
    tbody.insertAdjacentHTML('afterbegin',
    `
    <tr>
        <td>${message.sender}</td>
        <td>${message.message}</td>
        <td>${message.date}</td>
    </tr>
    `
    )
})

