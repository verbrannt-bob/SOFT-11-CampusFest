const contenedor = document.getElementById("contenedor");
window.tarjetasActividad = [];
let listaActividades = [];
const btnCreacion = document.getElementById("btnCreacion");


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

    try {

        const response = await fetch("http://localhost:3000/actividades", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Error al obtener las actividades");
        }

        listaActividades = await response.json();

        mostrarTarjetas(listaActividades);


    } catch (error) {
        console.error(error);
    }
}

function mostrarTarjetas(actividades) {

    contenedor.innerHTML = "";

    window.tarjetasActividad = [];

    actividades.forEach(actividad => {
        const tarjeta = document.createElement("div");

        tarjeta.className = "col-12 col-lg-4 d-flex justify-content-center";
        tarjeta.innerHTML = `
                <div class="actividad-card">
                    <div class="card-header">
                        <p>${actividad.nombre}</p>
                        <button class="btn-menu" type="button" aria-label="Opciones de la tarjeta ${actividad.nombre}" title="Menu Actividad" aria-expanded="false" aria-haspopup="true">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div class="menu-opciones" role="menu" hidden>

                            <button type="button" class="btn-editar">
                                <i class="fa-solid fa-pen" aria-hidden="true"></i>
                                Editar
                            </button>

                            <button type="button" class="btn-eliminar">
                                <i class="fa-solid fa-trash" aria-hidden="true"></i>
                                Eliminar
                            </button>

                        </div>
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

        //Boton Menu
        const botonMenu = tarjeta.querySelector(".btn-menu");
        const menuOpciones = tarjeta.querySelector(".menu-opciones");
        const actividadCard = tarjeta.querySelector(".actividad-card");

        botonMenu.addEventListener("click", () => {

            const estaAbierto = !menuOpciones.hidden;

            menuOpciones.hidden = estaAbierto;

            botonMenu.setAttribute(
                "aria-expanded",
                !estaAbierto
            );

        });

        //Esconder menu cuando el cursor salga de la tarjeta
        actividadCard.addEventListener("mouseleave", () => {

            menuOpciones.hidden = true;

            botonMenu.setAttribute(
                "aria-expanded",
                "false"
            );

                window.addEventListener('storage', toggleBotones);

                function toggleBotones(){
                    console.log("toggle botones");
                    if(localStorage.getItem("autenticado") == "true"){
                        botonEditar.classList.remove("d-none");
                        btnCreacion.classList.remove("d-none");
                    } else {
                        botonEditar.classList.add("d-none");
                        btnCreacion.classList.add("d-none");
                    }
                }

                toggleBotones();
            });
        });

        //Boton Editar
        const botonEditar = tarjeta.querySelector(".btn-editar");

        botonEditar.addEventListener("click", () => {

            localStorage.setItem("idActividad", actividad._id);
            window.location.href = "./actualizarActividad.html";

        });


        const botonEliminar = tarjeta.querySelector(".btn-eliminar");

        botonEliminar.addEventListener("click", () => {

            eliminarActividad(actividad._id);

        });



        const botonDetalles = tarjeta.querySelector(".btn-detalles");

        botonDetalles.addEventListener("click", () => {

            localStorage.setItem("idActividad", actividad._id);
            window.location.href = "./detalleActividad.html";
        })


        window.addEventListener('storage', toggleBotones);

        function toggleBotones() {
            console.log("toggle botones");
            if (localStorage.getItem("autenticado") == "true") {
                botonMenu.classList.remove("d-none");
                btnCreacion.classList.remove("d-none");
            } else {
                botonMenu.classList.add("d-none");
                btnCreacion.classList.add("d-none");
            }
        }

        toggleBotones();


        window.tarjetasActividad.push(tarjeta);

        if (localStorage.getItem("dark") == "true") {
            tarjeta.classList.add("tarjeta-dark");
        }
    });
}

async function eliminarActividad(id) {
    const resultado = await Swal.fire({
        title: "¿Eliminar Actividad?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        iconColor: "#006AEA",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#164a98",
        reverseButtons: true
    });

    if (!resultado.isConfirmed) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:3000/actividades/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Error al eliminar la actividad");
        }

        cargarTarjetas();

    } catch (error) {

        console.error(error);

        alert("No se pudo eliminar la actividad");

    }
}

const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroDisponibilidad = document.getElementById("filtro-disponibilidad");

function filtrarActividades() {

    const texto = buscador.value.toLowerCase().trim();
    const categoria = filtroCategoria.value;
    const disponibles = filtroDisponibilidad.checked;

    const actividadesFiltradas = listaActividades.filter(actividad => {

        const coincideBusqueda =
            actividad.nombre.toLowerCase().includes(texto) ||
            actividad.descripcion.toLowerCase().includes(texto) ||
            actividad.ubicacion.toLowerCase().includes(texto);

        const coincideCategoria =
            categoria === "" ||
            actividad.categoria === categoria;

        const cuposDisponibles = actividad.cupos - (actividad.visitantesInscritos?.length || 0);

        const coincideDisponibilidad =
            !disponibles ||
            cuposDisponibles > 0;

        return coincideBusqueda && coincideCategoria && coincideDisponibilidad;

    });

    mostrarTarjetas(actividadesFiltradas);
}

buscador.addEventListener("input", filtrarActividades);

filtroCategoria.addEventListener("change", filtrarActividades);

filtroDisponibilidad.addEventListener("change", filtrarActividades);

const botonFiltro = document.getElementById("btn-filter");
const panelFiltros = document.getElementById("panel-filtros");

botonFiltro.addEventListener("click", () => {


    panelFiltros.hidden = !panelFiltros.hidden;


    botonFiltro.setAttribute(
        "aria-expanded",
        String(!panelFiltros.hidden)
    );

});

cargarTarjetas();