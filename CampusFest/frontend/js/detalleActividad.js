const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const fechaHora = document.getElementById("fechaHora");
fechaHora.readOnly = true;
const ubicacion = document.getElementById("ubicacion");
const duracion = document.getElementById("duracion");
const cuposMax = document.getElementById("cuposMax");
const cuposDisponible = document.getElementById("cuposDisponibles");
const requisitos = document.getElementById("requisitos");
const btn = document.getElementById("btnInscripcion");
let cantidadInscritos;
// import {} from './actividades.js'

async function cargarActividad(id){
    fetch(("http://localhost:3000/actividades/" + id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
    .then(data => {
        nombre.textContent = data.nombre;
        categoria.textContent = data.categoria;
        descripcion.textContent = data.descripcion;
        fechaHora.value = new Date(data.horario.fechaInicio).toISOString().slice(0, 16);
        duracion.textContent = calcularDuracion(data.horario.fechaInicio, data.horario.fechaFinal);
        ubicacion.textContent = data.ubicacion;
        cantidadInscritos = data.visitantesInscritos.length;
        cuposMax.textContent = data.cupos;
        cuposDisponible.textContent = data.cupos - cantidadInscritos;
        actualizarBoton(data.cupos, cantidadInscritos);
        requisitos.textContent = data.requisitos;
    })
}

function formatearFecha(dataFecha){
    const fecha = new Date(dataFecha);
    const fechaFormateada = "Fecha: " +String(fecha.getDay()).padStart(2, "0") + "/" + String(fecha.getMonth()).padStart(2, "0") + "/" + fecha.getFullYear() + "<br> Hora de Inicio: " + String(fecha.getHours()).padStart(2, "0") + ":" + String(fecha.getMinutes()).padStart(2, "0") + ".";
    return fechaFormateada;
}

function calcularDuracion(dataFechaInicio, dataFechaFinal){
    const fechaInicio = new Date(dataFechaInicio);
    const fechaFinal = new Date(dataFechaFinal);
    let horas = fechaFinal.getHours() - fechaInicio.getHours();
    let minutos;
    if (fechaInicio.getMinutes() == fechaFinal.getMinutes()){
        return "Duración: " + horas + "h";
    } else if(fechaInicio.getMinutes() < fechaFinal.getMinutes()){
        minutos = fechaFinal.getMinutes() - fechaInicio.getMinutes();
        
    } else {
        horas = horas - 1;
        minutos = 60 - (fechaInicio.getMinutes() - fechaFinal.getMinutes());
    }
    return horas + "h " + minutos + "m";
}

function actualizarBoton(cupos, cantidad){
    if(cupos <= cantidad){
        btn.textContent = "Lista de Espera";
    }
}

cargarActividad("6a78f08dead80b1a1bf03eb7");


