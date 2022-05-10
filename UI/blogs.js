// fetch api to get all posts
window.addEventListener('load', function(){
    const getPostEndpoint = "https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts";

    async function getPosts(){
        try {
            let res = await fetch(getPostEndpoint);
            if(res.status == 200){
                const posts_obj = await res.json()
                const allPosts = posts_obj.posts
    
                // show only three on homepage 
                allPosts.slice(0,3).forEach(post => {
                    
                    // show blogs on homepage
                    const blog_post = document.querySelector('#blog-box')
                    blog_post.insertAdjacentHTML(`afterbegin`,
                    `
                    <div class="box">
                    <a href="blog-details.html#${post._id}"><img src="${post.poster}" alt=""></a>
                    <div class="text">${post.title}</div>
                    <p>${post.content.slice(0,90)}...</p>
                    </div>
                    `)
    
                });
                
            }else{
                console.log('failed to posts')
            }
    
        } catch (error) {
            console.log(error);
        }
       
    }
    getPosts()


})
