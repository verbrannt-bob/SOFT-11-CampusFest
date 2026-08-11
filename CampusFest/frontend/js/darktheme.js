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
const botones =  document.querySelectorAll("button");
const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');
const textareas = document.querySelectorAll('textarea');
const spans = document.querySelectorAll('span');

btnTema.addEventListener("click", () => {
    body.classList.toggle("body-dark");
    navbarItems.forEach(item => {
        item.classList.toggle("general-dark");
    });
    hamburgerItems.forEach(item => {
        item.classList.toggle("hamburger-dark");
    });
    hamburgerBars.forEach(item => {
        item.classList.toggle("bar-dark");
    });
    navbar.classList.toggle("general-dark");
    logo.classList.toggle("general-dark");
    logoContainer.classList.toggle("general-dark");
    navbarIcons.classList.toggle("general-dark");
    topbar.classList.toggle("navbar-shadow-dark");
    cajaLogin.classList.toggle("login-dark");
    cajaLogout.classList.toggle("login-dark");
    inputs.forEach(item => {
        item.classList.toggle("input-dark");
    })
    labels.forEach(item =>{
        item.classList.toggle("general-dark");
    })
    botones.forEach(item =>{
        item.classList.toggle("btn-dark");
    })
    textareas.forEach(item => {
        item.classList.toggle("input-dark");
    })
    spans.forEach(item =>{
        item.classList.toggle("general-dark");
    })
})