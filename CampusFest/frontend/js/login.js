const navbarUser = document.querySelector("#login");
const cajaLogin = document.querySelector(".caja-login");
const cajaLogout = document.querySelector(".caja-logout");
const inputLogin = document.getElementById("admin-email");
const emailSpan = document.querySelector(".admin-actual");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");

navbarUser.addEventListener("click", () => {
    if (localStorage.getItem("autenticado") == "true") {
        cajaLogout.classList.toggle("active");
        emailSpan.textContent = localStorage.getItem("email");
    } else {
        cajaLogin.classList.toggle("active");
    }
})


function verificarLogin() {
    if (!inputLogin.value.includes('@')) return false;
    const dominio = inputLogin.value.split('@')[1].toLowerCase();
    return dominio == "ucenfotec.ac.cr";
}

btnLogin.addEventListener("click", () => {
    if (verificarLogin()) {
        localStorage.setItem("autenticado", "true");
        localStorage.setItem("email", inputLogin.value);
        Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: "Sesión de administrador iniciada correctamente",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#164a98"
        })
        cajaLogin.classList.remove("active");
    } else {
        Swal.fire({
            title: "Correo de administrador inválidalo",
            text: "Debe ingresar con un correo institucional",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#164a98"
        });
    }
})


btnLogout.addEventListener("click", () => {
    localStorage.setItem("autenticado", "false");
    localStorage.setItem("email", "");
    inputLogin.value = "";
    cajaLogout.classList.remove("active");
    Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: "Sesión de administrador finalizada correctamente",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#164a98"
        })
})


