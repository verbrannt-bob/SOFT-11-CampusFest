const actividades = [
    "Fútbol",
    "Baloncesto",
    "Voleibol",
    "Natación",
    "Ajedrez",
    "Programación",
    "Robótica",
    "Canto"
];

const inputActividad = document.getElementById("actividad");
const sugerencias = document.getElementById("sugerenciasActividad");

inputActividad.addEventListener("input", function () {
    const texto = this.value.trim().toLowerCase();
    sugerencias.innerHTML = "";

    if (texto === "") {
        sugerencias.classList.add("d-none");
        return;
    }

    const resultados = actividades.filter(actividad =>
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