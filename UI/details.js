// get individual post
const blogId = location.hash.substring(1)


 async function getDetails(){
    const detailsEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}`;

    const res = await fetch(detailsEndpoint)
        if(res.status == 200){
            
            const post_obj = await res.json()
            const poster = document.querySelector('#blog-detail-poster')
            poster.setAttribute('src', `${post_obj.post.poster}`)

            const title = document.querySelector('#title')
            title.innerHTML += `${post_obj.post.title}`

            const content = document.querySelector('#detail-description')
            content.insertAdjacentText(`beforeend`, `${post_obj.post.content}`)

            const stamp = document.querySelector('#timer')
            const date = new Date(post_obj.post.createdAt).toDateString()
            stamp.insertAdjacentText(`beforeend`, `${date}`)

            const likes = document.querySelector('#like-number')
            likes.innerHTML = `${post_obj.post.likes.length}`
            // likes.insertAdjacentText(`beforeend`, `${post_obj.post.likes.length}`)

            const allComments = post_obj.post.comments
            allComments.forEach(comment => {
                const comments = document.querySelector('#blog-comments')
                comments.insertAdjacentHTML(`beforeend`, `
                <img src="images/about2.png"  style="border-radius:50%; height: 60px;width: 80px;"  alt="">
                <div>
                    <p style="color: rgb(36, 36, 230);">4:11 PM</p>
                    <p>${comment.description}</p>
                </div>
            
                `)
            });
            
            
        }else{
            console.log('failed to get post')
            location.assign(`blog-site.html`)
            
        }
   
}


// add like on a blog
const likeBtn = document.querySelector('#like')

const likePostEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}/like`;


// requires token
const token = localStorage.getItem('token')

async function likePost(){
    const like_obj = await fetch(likePostEndpoint,{
        method: 'PUT',
        headers:{
            "Authorization":"Bearer " + token
        }
        
    }
    )
    if(like_obj.status == 200){ //liked

       const res = await like_obj.json()

        alert(`${res.message}`)

    }else{
        alert('To like you need to be logged in!')
        
    }
   
}

likeBtn.addEventListener('click', ()=>{
    likePost()
})


// add comment on a blog
// requires token
const userToken = localStorage.getItem('token')
const commentForm = document.querySelector('#comment-form')
const cmt = document.querySelector('#comment')
const commentPostEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}/comment`;

commentForm.addEventListener('submit', ()=>{
    console.log(cmt.value)
    async function commentPost(){
        const comment_obj = await fetch(commentPostEndpoint,{
            method: 'POST',
            headers:{
                "Authorization":"Bearer " + userToken
            },
            body:JSON.stringify({
                "comment":`${cmt.value}`
            })
            
        })
    
        if(comment_obj.status == 201){ //commented
            alert("Commented!")
            const c= await comment_obj.json()
            console.log(c.comment.description)
    
        }else{
            alert('To comment you need to be logged in!')
            console.log(await comment_obj.json())
        }
       
    }
commentPost()

})









window.addEventListener('DOMContentLoad',getDetails())