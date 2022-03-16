// related to menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu");
  
  hamburger.addEventListener("click", mobileMenu);
  
  function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
  }
  
  const navLink = document.querySelectorAll(".item");

  navLink.forEach(n => n.addEventListener("click", closeMenu));

  function closeMenu() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
  }

// related to hero text animation
const text=document.querySelector('.text-1');
const splitText=text.textContent.split("")
console.log(splitText)

text.textContent="";

for(let i=0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>"

}

let char=0;
let timer=setInterval(roll,30);
function roll(){
    const newText=text.querySelectorAll('span')[char];
    newText.classList.add('rolling');
    char++;

    if(char === splitText.length){
        end();
        return;
    }


}

function end(){
    clearInterval(timer);
    timer=null;
}

//show animation when window loads
window.addEventListener('load',roll())