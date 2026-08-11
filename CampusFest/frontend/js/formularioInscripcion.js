const inputNombre = document.getElementById("nombreCompleto");
const inputCorreoInstitucional = document.getElementById("correoInstitucional");
const inputTelefono = document.getElementById("telefono");
const inputCarreraCurso = document.getElementById("carreraCurso");
const inputActividad = document.getElementById("actividad");
const btnRegistrarInscripcion = document.querySelector(".btn-registrar");
const inputsRequeridos = document.querySelectorAll("input[required]");
inputActividad.value = localStorage.getItem("nombreActividad");

let nombreTest;

const actividades = new Map();
const llavesActividades = [];
const visitantes = new Map();

async function cargarActividades() {
    fetch("http://localhost:3000/actividades", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
        .then(data => {
            data.forEach(actividad => {
                actividades.set(actividad.nombre, [actividad._id, (actividad.cupos - actividad.visitantesInscritos.length)])
                nombreTest = inputActividad.value;
                llavesActividades.push(actividad.nombre);
            })
        });
}

async function cargarVisitantes() {
    fetch("http://localhost:3000/visitantes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
        .then(data => {
            data.forEach(visitante => {
                visitantes.set(visitante.correo, visitante._id);
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

function validar() {
    let error = false;
    inputsRequeridos.forEach(input => {
        if (!input.value) {
            error = true;
        }
    })
    resaltarInputsVacios();
    if (error) {
        Swal.fire({
            title: "No se puede procesar su inscripción",
            text: "Por favor complete los campos resaltados.",
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#164a98"
        });
    } else if (!verificarCorreo()) {
        inputCorreoInstitucional.classList.add("input-error");
        Swal.fire({
            title: "No se puede procesar su inscripción",
            text: "Debe utilizar un correo institucional",
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#164a98"
        });

    } else {
        inscribirVisitante();
    }

}

function verificarCorreo() {
    if (!inputCorreoInstitucional.value.includes('@')) return false;
    const dominio = inputCorreoInstitucional.value.split('@')[1].toLowerCase();
    return dominio == "ucenfotec.ac.cr";
}



async function inscribirVisitante() {
    let idActividad;
    let cuposActividad;
    try {
        idActividad = actividades.get(inputActividad.value)[0];
        cuposActividad = actividades.get(inputActividad.value)[1];
        console.log(idActividad);
        console.log("Cupos disponibles: " + cuposActividad);

    } catch (error) {
        idActividad = null;
        cuposActividad = null;
    }

    let idVisitante

    idVisitante = visitantes.get(inputCorreoInstitucional.value);
    if (idVisitante == undefined) {
        idVisitante = null;
    }
    console.log(idVisitante);

    if (idActividad == null) {
        console.log("Camino sin actividad");
        Swal.fire({
            title: "No se puede procesar su inscripción",
            text: "Por favor ingrese una actividad valida",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#164a98"
        });

        return;
    }

    if (idVisitante == null) {
        idVisitante = await postVisitante(idActividad);
        console.log("VISITANTE AFTER POSTVISITANTE:" + idVisitante);
    } else {
        await patchVisitante(idVisitante, idActividad);
    }

    if (cuposActividad > 0) {
        console.log("Camino actividad con cupos disponibles");
        console.log("idVisitanmte: " + idVisitante);
        console.log(JSON.stringify({
            visitanteId: idVisitante
        }));

        await patchActividadInscritos(idVisitante, idActividad);
    } else {
        console.log("Camino actividad sin cupos disponibles");
        await patchActividadEspera(idVisitante, idActividad);
    }
}

function postVisitante(idActividad) {
    console.log("Camino visitante nuevo");
    const datosVisitante = {
        nombre: inputNombre.value,
        correo: inputCorreoInstitucional.value,
        telefono: inputTelefono.value,
        carrera: inputCarreraCurso.value,
        actividades: idActividad
    };

    return fetch("http://localhost:3000/visitantes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosVisitante)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo registrar el perfil del visitante");
            }

            return response.json();
        })
        .then(data => {
            console.log("Respuesta completa:", data);

            const VisitanteId = data.visitante?._id || data._id;

            if (!VisitanteId) {
                throw new Error("La respuesta no contiene el ID del visitante");
            }

            console.log("POST ID del visitante:", VisitanteId);

            return VisitanteId;
        });
}

function patchVisitante(idVisitante, idActividad) {
    fetch("http://localhost:3000/visitantes/actividades/" + idVisitante, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            actividadId: idActividad
        })
    }).then(response => {
        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "No se pudo inscribir a la actividad",
                text: "Ocurrió un error al inscribir al usuario.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#164a98"
            });
        }
    })
}

function patchActividadInscritos(idVisitante, idActividad) {
    console.log(idVisitante);
    fetch("http://localhost:3000/actividades/visitantes/" + idActividad, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            visitanteId: idVisitante
        })
    }).then(response => {
        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "No se pudo inscribir a la actividad",
                text: "Ocurrió un error al inscribir al usuario.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#164a98"
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Usuario inscrito correctamente",
                text: "Se inscribió a la actividada con éxito",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#164a98"
            }).then(() => {
                window.location.href = "./actividades.html";
            });
        }
    })
}

function patchActividadEspera(idVisitante, idActividad) {
    fetch("http://localhost:3000/actividades/espera/" + idActividad, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            visitanteId: idVisitante
        })
    }).then(response => {
        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "No se pudo unir a la lista de Espera",
                text: "Ocurrió un error al inscribir al usuario.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#164a98"
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Se ha registrado a la lista de espera",
                text: "Se inscribió a la lista de espera con éxito",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#164a98"
            }).then(() => {
                window.location.href = "./actividades.html";
            });
        }
    })
}

function resaltarInputsVacios() {
    inputsRequeridos.forEach(input => {
        if (!input.value) {
            input.classList.add("input-error");
        } else {
            input.classList.remove("input-error");
        }
    })
}


cargarActividades();
cargarVisitantes();
btnRegistrarInscripcion.addEventListener("click", validar);