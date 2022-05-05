// get individual post

 async function getDetails(){
    const blogId = location.hash.substring(1)

    const detailsEndpoint = `https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts/${blogId}`;

    const res = await fetch(detailsEndpoint)
        if(res.status == 200){
            
            const post_obj = await res.json()
            console.log(post_obj.post.likes.length)
            

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
            likes.insertAdjacentText(`beforeend`, `${post_obj.post.likes.length}`)

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

// getDetails()

window.addEventListener('DOMContentLoad',getDetails())