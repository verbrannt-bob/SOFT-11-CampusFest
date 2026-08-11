const hamburger = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburger.addEventListener("click", () =>{
    hamburger.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
})

document.querySelectorAll(".menu-item").forEach(element => element.addEventListener("click", () =>{
    hamburger.classList.remove("active");
    hamburgerMenu.classList.remove("active");
}))