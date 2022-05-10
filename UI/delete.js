// get individual post
const blogId = location.hash.substring(1)
const token = localStorage.getItem('token')

const resetBtn = document.querySelector("button[type='reset']")
resetBtn.addEventListener('click', (e)=>{

    window.location.href = "admin.html"
})

// delete article
const deletePostEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}`;

const deleteForm = document.querySelector('#delete-article-form')
console.log(deleteForm)
deleteForm.addEventListener('submit', (e)=>{
    e.preventDefault()


async function deletePost(){
    const post_obj = await fetch(deletePostEndpoint,{
        method: 'DELETE',
        headers:{
            "Authorization":"Bearer " + token
        }
    })

    if(post_obj.status == 200){ //updated
        const res = await post_obj.json()

        alert('Deleted!')
        window.location.href = "admin.html"

    }else{
        alert('Failed to delete')
    }
    
}

deletePost()


})