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
    //collect values from inputs of add-article form
    const titleValue = title.value.trim()
    const descriptionValue = description.value.trim()
    const imageValue = image.value
    // checkInputs();

    const addPostEndpoint = "https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts";

    // requires token 
    const token = localStorage.getItem('token')
    
    async function addPost(){
        const fd = new FormData()
        fd.append('title', `${titleValue}`)
        fd.append('content', `${descriptionValue}`)
        fd.append('poster', image.files[0])
        
        const post_obj = await fetch(addPostEndpoint,{
            method: 'POST',
            headers:{
                "Authorization":"Bearer " + token
            },
            body:fd
        }
        )
        if(post_obj.status == 201){ //created
            const res = await post_obj.json()

            alert(`${res.message}`)
            add_form.reset()
            
            window.location.href="admin-dashboard.html"
    
        }else{
            const result = await post_obj.json()
            const p = document.querySelector('#result')
            if(result.message == "Title and content are required" || 
                result.message == "Cannot read properties of undefined (reading 'path')"){

                result.message = "All fields are required!"
            }
            
            p.textContent = `${result.message}`
            p.setAttribute('style', 'color:red; padding-bottom:5px')
            
        }
       
    }
    addPost()

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

        window.location.href="admin-dashboard.html#dashboard"
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

        //clear the form
        form_add_user.reset()

        //redirect to users page
        window.location.href="admin-dashboard.html#users"
    }


}


const form_add_user = document.getElementById('add-user-form')
form_add_user.addEventListener('submit',function(e){
    e.preventDefault();

    checkInputs();

    // form_add_user.reset();


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


// display articles from an api
const getPostEndpoint = "https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts";
async function getPosts(){
    try {
        let res = await fetch(getPostEndpoint);
        if(res.status == 200){
            const posts_obj = await res.json()
            const allPosts = posts_obj.posts
            


            allPosts.forEach(post => {
                const date = new Date(post.createdAt).toDateString()
                const tbody = document.querySelector('#blogs-table-body')
                // //new
                // const tTitle = document.querySelector('#blog-table-title')
                // const tContent = document.querySelector('#blog-table-content')
                // const tDate = document.querySelector('#blog-table-date')
                // const tEdit= document.querySelector('#blog-table-edit')
                // const tDelete= document.querySelector('#blog-table-delete')
                
                
                tbody.insertAdjacentHTML('beforeend',
                `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.content}</td>
                    <td>${date}</td>
                    <td>
                    <a  href="edit-article.html#${post._id}" title="Edit" id="edit-blog"><i class="fas fa-edit edit" style="color:#000"></i></a>&nbsp;&nbsp;&nbsp;
                    <a  href="#delete-article#${post._id}" title="Delete"><i class="fas fa-trash" style="color:red"></i></a>    
                    </td>
                </tr>
                `
                )

            });
            
        }else{
            console.log('failed to posts')
        }

    } catch (error) {
        console.log(error);
    }
   
}


async function getArticles(){
    try {
        let res = await fetch(getPostEndpoint);
        if(res.status == 200){
            const posts_obj = await res.json()
            const allPosts = posts_obj.posts
            


            allPosts.forEach(post => {
                const date = new Date(post.createdAt).toDateString()
                const tbody = document.querySelector('#articles-table-body')
               
                tbody.insertAdjacentHTML('beforeend',
                `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.content}</td>
                    <td>${date}</td>
                    <td>
                    <a  href="#edit-article#${post._id}" title="Edit"><i class="fas fa-edit" style="color:#000"></i></a>&nbsp;&nbsp;&nbsp;
                    <a  href="#delete-article#${post._id}" title="Delete"><i class="fas fa-trash" style="color:red"></i></a>    
                    </td>
                </tr>
                `
                )

            });
            
        }else{
            console.log('failed to posts')
        }

    } catch (error) {
        console.log(error);
    }
   
}

// display all messages
const messageEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/messages`;

// requires token
const token = localStorage.getItem('token')

async function getMessage(){
    const message_obj = await fetch(messageEndpoint,{
        method: 'GET',
        headers:{
            "Authorization":"Bearer " + token
        }
        
    }
    )
    if(message_obj.status == 200){ //liked

       const message = await message_obj.json()
       const messages = message.messages
       console.log(message)


       messages.forEach(message => {
           const date = new Date(message.createdAt).toDateString()
           const tbody = document.querySelector('#messages-table-body')
          
           tbody.insertAdjacentHTML('beforeend',
           `
           <tr>
                <td>${message.sender}</td>
                <td>${message}.</td>
                <td>${date}</td>
            </tr>

           `)

       });

    }else{
        // alert('To get message you need to be logged in!')
        
    }
   
}

getMessage()



window.addEventListener('DOMContentLoad',getArticles(), getPosts())
