const contenedor = document.querySelector(".contenedor");
let listaActividades = [];
const agendaPasado = document.querySelector(".agenda-pasada");
const agendaFuturo = document.querySelector(".agenda-futura");
// window.agendaItems = [];

async function cargarActividades() {

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
        generarItems(listaActividades);


    } catch (error) {
        console.error(error);
    }
}

function generarItems(actividades) {
    for (let actividad of actividades) {
        const item = document.createElement("div");
        item.className = "agenda-item d-flex flex-row align-items-center justify-content-between";
        item.innerHTML = `
            <div class="item-element d-flex justify-content-between align-items-center">
                    <span class="fechaHora">${formatearFecha(actividad.horario.fechaInicio) + " " + formatearHora(actividad.horario.fechaInicio)}</span>
                </div>
                <div class="item-element d-flex justify-content-between align-items-center">
                    <span class="nombre">${actividad.nombre}</span>
                </div>
                <div class="item-element d-flex justify-content-between align-items-center">
                    <span class="duracion">${"Duración: " + calcularDuracion(actividad.horario.fechaInicio, actividad.horario.fechaFinal)}</span>
                </div>
                <div class="item-element d-flex justify-content-between align-items-center">
                    <span class="categoría">${actividad.categoria}</span>
                </div>
                <div class="item-element d-flex justify-content-between align-items-center">
                    <span class="disponibilidad">${"Cupos disponibles: " + calcularDisponibilidad(actividad.cupos, actividad.visitantesInscritos.length)}</span>
                </div>
                <button class="btnDetalle">Detalles</button>
    `;


        const horaLimite = new Date();
        horaLimite.setHours(horaLimite.getHours() + 8);
        
        console.log(new Date(actividad.horario.fechaInicio) >= horaLimite);
        if (new Date(actividad.horario.fechaInicio) >= horaLimite) {
            agendaFuturo.appendChild(item);
        } else {
            agendaPasado.appendChild(item);
        }

        const btnDetalle = document.querySelector(".btnDetalle");
        btnDetalle.addEventListener("click", () =>{
            localStorage.setItem("idActividad", actividad._id);
            window.location.href = "./detalleActividad.html";
        })

        // const itemsAgenda = document.querySelectorAll(".item-element");
        // itemsAgenda.forEach(item, () =>{
        //     window.agendaItems.push(item);
        // })

    }


}

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

function calcularDuracion(dataFechaInicio, dataFechaFinal) {
    const fechaInicio = new Date(dataFechaInicio);
    const fechaFinal = new Date(dataFechaFinal);
    let horas = fechaFinal.getHours() - fechaInicio.getHours();
    let minutos;
    if (fechaInicio.getMinutes() == fechaFinal.getMinutes()) {
        return "Duración: " + horas + "h";
    } else if (fechaInicio.getMinutes() < fechaFinal.getMinutes()) {
        minutos = fechaFinal.getMinutes() - fechaInicio.getMinutes();

    } else {
        horas = horas - 1;
        minutos = 60 - (fechaInicio.getMinutes() - fechaFinal.getMinutes());
    }
    return horas + "h " + minutos + "m";
}

function calcularDisponibilidad(cupos, cantidad) {
    return cupos - cantidad;
}

cargarActividades();

agendaFuturo.scrollIntoView({
  behavior: "smooth", 
  block: "start"     
});

