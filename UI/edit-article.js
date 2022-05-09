// get individual post
const blogId = location.hash.substring(1)
console.log(blogId)
const token = localStorage.getItem('token')

 async function getDetails(){
    const detailsEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}`;

    const res = await fetch(detailsEndpoint)
        if(res.status == 200){
            
            const post_obj = await res.json()
            
            const articleTitle = document.querySelector('#title')
            articleTitle.setAttribute('value', `${post_obj.post.title}`)

            const articleContent = document.querySelector('#detail-description')
            articleContent.insertAdjacentHTML('afterbegin', `${post_obj.post.content}`)

            const articleImage = document.querySelector('#current-image')
            console.log(articleImage)
            articleImage.setAttribute('href', `${post_obj.post.poster}`)
            


            
        }else{
            console.log('failed to get post')
            location.assign(`blog-site.html`)
            
        }
   
}
getDetails()

// save edited changes
const editForm = document.querySelector('#edit-article-form')
editForm.addEventListener('submit', ()=>{
    const titleValue = document.querySelector('#title').value
    const descriptionValue = document.querySelector('#detail-description').value
    const image = document.querySelector('#poster')

    async function updatePost(){

    
    const updatePostEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}`;
    const fd = new FormData()
    fd.append('title', `${titleValue}`)
    fd.append('content', `${descriptionValue}`)
    fd.append('poster', image.files[0])
    const res = await fetch(updatePostEndpoint,{
        method:'PATCH',
        headers:{
            'Authorization':'Bearer '+ token
        },
        body:fd
    })
    if(res.status == 200){
        alert(`${res.message}`)
    }





    }
    updatePost()
})


// // add like on a blog
// const likeBtn = document.querySelector('#like')

// const likePostEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}/like`;


// // requires token
// const token = localStorage.getItem('token')

// async function likePost(){
//     const like_obj = await fetch(likePostEndpoint,{
//         method: 'PUT',
//         headers:{
//             "Authorization":"Bearer " + token
//         }
        
//     }
//     )
//     if(like_obj.status == 200){ //liked

//        const res = await like_obj.json()

//         alert(`${res.message}`)

//     }else{
//         alert('To like you need to be logged in!')
        
//     }
   
// }

// likeBtn.addEventListener('click', ()=>{
//     likePost()
// })


// add comment on a blog
// requires token
// const userToken = localStorage.getItem('token')
// const commentForm = document.querySelector('#comment-form')
// const cmt = document.querySelector('#comment')
// const commentPostEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}/comment`;

// commentForm.addEventListener('submit', ()=>{
//     console.log(cmt.value)
//     async function commentPost(){
//         const comment_obj = await fetch(commentPostEndpoint,{
//             method: 'POST',
//             headers:{
//                 "Authorization":"Bearer " + userToken
//             },
//             body:JSON.stringify({
//                 "comment":`${cmt.value}`
//             })
            
//         })
    
//         if(comment_obj.status == 201){ //commented
//             alert("Commented!")
//             const c= await comment_obj.json()
//             console.log(c.comment.description)
    
//         }else{
//             alert('To comment you need to be logged in!')
//             console.log(await comment_obj.json())
//         }
       
//     }
// commentPost()

// })









window.addEventListener('DOMContentLoad',getDetails())