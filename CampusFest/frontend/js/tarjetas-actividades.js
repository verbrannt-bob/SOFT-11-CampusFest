const contenedor = document.getElementById("contenedor");
export let actividadID = "";


function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);

    return fechaObj.toLocaleDateString("es-CR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function formatearHora(fecha) {
    const fechaObj = new Date(fecha);

    return fechaObj.toLocaleTimeString("es-CR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

async function cargarTarjetas() {

    fetch("http://localhost:3000/actividades", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    })
    .then(response=> response.json())
    .then(listaActividades => {
        contenedor.innerHTML = "";

        listaActividades.forEach(actividad =>{
            const tarjeta = document.createElement("div");

            tarjeta.className = "col-12 col-lg-4 d-flex justify-content-center";
            tarjeta.innerHTML = `
                <div class="actividad-card">
                    <div class="card-header">
                        <p>${actividad.nombre}</p>
                        <button class="btn-editar">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                    </div>
                
                    <div class="card-body">
                        <p class="subtitulo"><strong>Fecha</strong></p>
                        <p class="info">${formatearFecha(actividad.horario.fechaInicio)}</p>
                        <p class="subtitulo"><strong>Hora</strong></p>
                        <p class="info">${formatearHora(actividad.horario.fechaInicio)}</p>
                        <p class="subtitulo"><strong>Ubicación</strong></p>
                        <p class="info">${actividad.ubicacion}</p>
                        <p class="subtitulo"><strong>Categoría</strong></p>
                        <p class="info">${actividad.categoria}</p>
                        <p class="subtitulo"><strong>Cupos Disponibles</strong></p>
                        <p class="info">${actividad.cupos}</p>
                    </div>

                    <div class="card-footer">
                        <button class="btn-detalles">
                            Detalles
                        </button>
                    </div>
                </div>
            `;

            contenedor.appendChild(tarjeta);

            const botonEditar = tarjeta.querySelector(".btn-editar");

            botonEditar.addEventListener("click", () => {

                    actividadID = actividad._id;
            })
            
            
            // .then(() => {
            //     window.location.href = "./actualizarActividad.html";
            // })

            const botonDetalles = tarjeta.querySelector(".btn-detalles");

            botonDetalles.addEventListener("click", () => {

                    actividadID = actividad._id;
            })

            // .then(() => {
            //     window.location.href = "./detalleActividad.html";
            // })

        });
    });
}

cargarTarjetas();