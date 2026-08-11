const btnTema = document.querySelector("#tema");
const navbarItems = document.querySelectorAll(".navbar-item");
const navbar = document.querySelector("nav");
const navbarIcons = document.querySelector(".navbar-icons");
const body = document.querySelector("body");
const logoContainer = document.querySelector(".logo-container");
const logo = document.querySelector(".logo");
const topbar = document.querySelector(".topbar");
const hamburgerItems = document.querySelectorAll(".hamburger-item");
const hamburgerBars = document.querySelectorAll(".bar");
const botones = document.querySelectorAll("button");
const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');
const textareas = document.querySelectorAll('textarea');
const spans = document.querySelectorAll('span');


if(localStorage.getItem("dark") == null){
    localStorage.setItem("dark", "false");
}

toggleDark();
toggleDark();

btnTema.addEventListener("click", toggleDark)

function toggleDark() {
    if (localStorage.getItem("dark") == "false") {
        localStorage.setItem("dark", "true");
        body.classList.add("body-dark");
        navbarItems.forEach(item => {
            item.classList.add("general-dark");
        });
        hamburgerItems.forEach(item => {
            item.classList.add("hamburger-dark");
        });
        hamburgerBars.forEach(item => {
            item.classList.add("bar-dark");
        });
        navbar.classList.add("general-dark");
        logo.classList.add("general-dark");
        logoContainer.classList.add("general-dark");
        navbarIcons.classList.add("general-dark");
        topbar.classList.add("navbar-shadow-dark");
        cajaLogin.classList.add("login-dark");
        cajaLogout.classList.add("login-dark");
        inputs.forEach(item => {
            item.classList.add("input-dark");
        })
        labels.forEach(item => {
            item.classList.add("general-dark");
        })
        botones.forEach(item => {
            item.classList.add("btn-dark");
        })
        textareas.forEach(item => {
            item.classList.add("input-dark");
        })
        spans.forEach(item => {
            item.classList.add("general-dark");
        })
        tarjetas.forEach(item => {
            item.classList.add("tarjeta-dark");
        })
    } else {
        localStorage.setItem("dark", "false");
        body.classList.remove("body-dark");
        navbarItems.forEach(item => {
            item.classList.remove("general-dark");
        });
        hamburgerItems.forEach(item => {
            item.classList.remove("hamburger-dark");
        });
        hamburgerBars.forEach(item => {
            item.classList.remove("bar-dark");
        });
        navbar.classList.remove("general-dark");
        logo.classList.remove("general-dark");
        logoContainer.classList.remove("general-dark");
        navbarIcons.classList.remove("general-dark");
        topbar.classList.remove("navbar-shadow-dark");
        cajaLogin.classList.remove("login-dark");
        cajaLogout.classList.remove("login-dark");
        inputs.forEach(item => {
            item.classList.remove("input-dark");
        })
        labels.forEach(item => {
            item.classList.remove("general-dark");
        })
        botones.forEach(item => {
            item.classList.remove("btn-dark");
        })
        textareas.forEach(item => {
            item.classList.remove("input-dark");
        })
        spans.forEach(item => {
            item.classList.remove("general-dark");
        })
        tarjetas.forEach(item => {
            item.classList.remove("tarjeta-dark");
        })
    }
}