const inputNombre = document.getElementById("nombre");
const btnCategoria = document.getElementById("categoria");
const inputDescripcion = document.getElementById("descripcion");
const inputFechaInicio = document.getElementById("fechaInicio");
const inputFechaFinal = document.getElementById("fechaFinal");
const inputUbicacion = document.getElementById("ubicacion");
const inputDuracion = document.getElementById("duracion");
const inputCupos = document.getElementById("cupos");
const inputRequisitos = document.getElementById("requisitos");
const categorias = document.querySelectorAll(".dropdown-item");
const inputsRequeridos = document.querySelectorAll("input[required], textarea[required]")
const btnGuardar = document.getElementById("btnGuardar");

function validar(){
    let error = false;
    console.log(btnCategoria.textContent.trim())
    console.log(btnCategoria.textContent.trim() === "Categoría")
    if (btnCategoria.textContent.trim() == "Categoría"){
        error = true;
    }
    inputsRequeridos.forEach(input =>{
        console.log(input.value);
        console.log(!input.value);
        if(!input.value){
            error = true;
        }
    })

    resaltarInputsVacios();
    if(error){
        Swal.fire({
                title: "No se puede registrar la actividad",
                text: "Por favor complete los campos resaltados.",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#164a98"   
            });
    } else {
        crearActividad();
    }
}

async function crearActividad() {
    console.log(inputFechaInicio.value);
    const datosActividad = {
        nombre: inputNombre.value,
        descripcion: inputDescripcion.value,
        categoria: btnCategoria.textContent,
        cupos: inputCupos.value,
        horario: {
            fechaInicio: inputFechaInicio.value,
            fechaFinal: inputFechaFinal.value
        },
        ubicacion: inputUbicacion.value,
        requisitos: inputRequisitos.value
    };
    console.log(datosActividad);
    fetch("http://localhost:3000/actividades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActividad)
    }).then(response => {
        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "No se pudo registrar la actividad",
                text: "Ocurrió un error al registrar la actividad.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#164a98" 
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Actividad registrada correctamente",
                text: "La avtividad fue creada exitosamente.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#164a98" 
            }).then(() => {
                window.location.href = "./actividades.html";
            });
        }
    })
}

categorias.forEach(categoria => {
    categoria.addEventListener("click", () => {
        btnCategoria.textContent = categoria.textContent;
    })
})

function resaltarInputsVacios() {
    inputsRequeridos.forEach(input => {
        if (!input.value) {
            input.classList.add("input-error");
        } else {
            input.classList.remove("input-error");
        }
    })

    if (btnCategoria.textContent.trim() == "Categoría") {
        btnCategoria.classList.add("input-error");
    } else {
        btnCategoria.classList.remove("input-error");
    }
}

btnGuardar.addEventListener("click", validar);
