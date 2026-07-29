const inputNombre = document.getElementById("nombreCompleto");
const inputIdentificacion = document.getElementById("identificacion");
const inputCorreoInstitucional = document.getElementById("correoInstitucional");
const inputTelefono = document.getElementById("telefono");
const inputCarreraCurso = document.getElementById("carreraCurso");
const inputActividad = document.getElementById("actividad");

const btnRegistrarInscripcion = document.querySelector(".btn-registrar");
const inputRequeridos = document.querySelectorAll("input[required]");



const actividades = new Map();
const llavesActividades = [];

async function cargarActividades() {
  fetch("http://localhost:3000/actividades", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
    .then(data => {
      data.forEach(actividad =>{
        actividades.set(actividad.nombre, actividad._id);
        llavesActividades.push(actividad.nombre);
      })
    });
}

const sugerencias = document.getElementById("sugerenciasActividad");

inputActividad.addEventListener("input", function () {
    const texto = this.value.trim().toLowerCase();
    sugerencias.innerHTML = "";

    if (texto === "") {
        sugerencias.classList.add("d-none");
        return;
    }

    const resultados = llavesActividades.filter(actividad =>
        actividad.toLowerCase().includes(texto)
    );

    if (resultados.length === 0) {
        sugerencias.classList.add("d-none");
        return;
    }

    resultados.forEach(actividad => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "list-group-item list-group-item-action";
        item.textContent = actividad;

        item.addEventListener("click", function () {
            inputActividad.value = actividad;
            sugerencias.classList.add("d-none");
        });

        sugerencias.appendChild(item);
    });

    sugerencias.classList.remove("d-none");
});

document.addEventListener("click", function (e) {
    if (!inputActividad.parentElement.contains(e.target)) {
        sugerencias.classList.add("d-none");
    }
});


cargarActividades();
console.log(actividades);
console.log(llavesActividades);
// btnRegistrarInscripcion.addEventListener("click", inscribirVisitante);  