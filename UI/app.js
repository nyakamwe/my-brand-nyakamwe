// fetch api to get all posts

const getPostEndpoint = "https://atlp-blog-api-nyakamwe.herokuapp.com/api/posts";

async function getPosts(){
    try {
        let res = await fetch(getPostEndpoint);
        if(res.status == 200){
            const posts_obj = await res.json()
            const allPosts = posts_obj.posts
            const blog_post = document.querySelector('#blog-posts')


            allPosts.forEach(post => {

                const blog_post = document.querySelector('#blog-posts')
                blog_post.insertAdjacentHTML(`afterbegin`,
                `<div class="card" >
                <img class="card__image" src="${post.poster}" id="blog-poster" alt="poster image">
                <div class="card__content">
                    <p class="content__title" id="blog-title">
                    ${post.title}
                    </p>
                    <p id="blog-content">
                    ${post.content}
                    </p>
                </div>
                <div class="card__info">
                    <div>
                    <i class="fas fa-thumbs-up" id="blog-like"></i>${post.likes.length}
                    </div>
                    <div>
                    <a href="blog-details.html#${post._id}" class="card__link" id="blog-readmore">Read More</a>
                    </div>
                </div>`
                )

                // const blog_title = document.querySelector('#blog-title')
                // const blog_content = document.querySelector('#blog-content')
                // const blog_poster = document.querySelector('#blog-poster')
                // const blog_like = document.querySelector('#blog-like')
                // const blog_readmore = document.querySelector('#blog-readmore')

                // blog_title.innerHTML += `${post.title}`
                // blog_content.innerHTML += `${post.content}`
                // blog_poster.setAttribute("src", `${post.poster}`)
                // blog_like.insertAdjacentText(`afterend`, `${post.likes.length}`)
                // blog_readmore.setAttribute("data-id", `${post._id}`)

            });
            
        }else{
            console.log('failed to posts')
        }

    } catch (error) {
        console.log(error);
    }
   
}

getPosts();

// get individual post

 function readMore(){
    const readmore = document.querySelector('a#blog-readmore')
    readmore.addEventListener('click', async (e)=>{
        

        location.assign(`blog-details.html#${readmore.dataset.id}`)
       
    })
   
}

readMore()
