// validate comment form
const comment_form = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const comment = document.getElementById('comment');

comment_form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if (comment.value.length > 0){
        setSuccessFor(commentInput)
    }else{
        setErrorFor(commentInput,'comment can not be empty.')
    }
   
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