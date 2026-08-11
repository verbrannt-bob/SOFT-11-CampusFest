const contenedor = document.getElementById("contenedor");

async function cargarTarjetas() {

    fetch("http://localhost:3000/stands", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    })
    .then(response=> response.json())
    .then(listaStands => {
        contenedor.innerHTML = "";

        listaStands.forEach(stand =>{
            const tarjeta = document.createElement("div");

            tarjeta.className = "col-12 col-lg-4 d-flex justify-content-center";
            tarjeta.innerHTML = `
                <div class="stand-card">
                    <div class="card-header">
                        <p>${stand.nombre}</p>
                        <button class="btn-menu" type="button" aria-label="Opciones de la tarjeta ${stand.nombre}" title="Editar Stand" aria-expanded="false" aria-haspopup="true">
                            <i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i>
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
                        <p class="subtitulo"><strong>Categoría</strong></p>
                        <p class="info">${stand.categoria}</p>
                        <p class="subtitulo"><strong>Responsable</strong></p>
                        <p class="info">${stand.responsable}</p>
                        <p class="subtitulo"><strong>Ubicación</strong></p>
                        <p class="info">${stand.ubicacion}</p>
                        <p class="subtitulo"><strong>Descripción</strong></p>
                        <p class="info">${stand.descripcion}</p>
                    </div>
                </div>
            `;

            contenedor.appendChild(tarjeta);

            //Boton Menu
            const botonMenu = tarjeta.querySelector(".btn-menu");
            const menuOpciones = tarjeta.querySelector(".menu-opciones");
            const standCard = tarjeta.querySelector(".stand-card");

            botonMenu.addEventListener("click", () => {

                const estaAbierto = !menuOpciones.hidden;
                const tarjetaExistente = contenedor.querySelector(".input-nombre");
    
                if (tarjetaExistente) {
                    return;
                }
                
                menuOpciones.hidden = estaAbierto;

                botonMenu.setAttribute(
                    "aria-expanded",
                    !estaAbierto
                );

            });

            //Esconder menu cuando el cursor salga de la tarjeta
            standCard.addEventListener("mouseleave", () => {

                menuOpciones.hidden = true;

                botonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

            //Boton Editar
            const botonEditar = tarjeta.querySelector(".btn-editar");

            botonEditar.addEventListener("click", () => {

                const tarjetaExistente = contenedor.querySelector(".input-nombre");
    
                if (tarjetaExistente) {
                    return;
                }

                editarTarjeta(tarjeta, stand);

            });

            // Botón Eliminar
            const botonEliminar = tarjeta.querySelector(".btn-eliminar");

            botonEliminar.addEventListener("click", () => {

                const tarjetaExistente = contenedor.querySelector(".input-nombre");
    
                if (tarjetaExistente) {
                    return;
                }

                eliminarStand(stand._id);

            });

        });
    });
}

function crearTarjetaVacia(){
    const tarjeta = document.createElement("div");

    tarjeta.className = "col-12 col-lg-4 d-flex justify-content-center";
            tarjeta.innerHTML = `
                <div class="stand-card" aria-label="Formulario para crear un nuevo stand" role="region">
                    <div class="card-header">
                        <input id="nombre-stand" type="text" class="form-control input-nombre" placeholder="Nombre del Stand" aria-required="true" required>
                    </div>
                
                    <div class="card-body">
                            <label for="categoria">Categoría</label>
                                <select id="categoria-stand" class="form-control input-categoria" aria-required="true" required>
                                    <option value="" disabled selected>Seleccione una categoría</option>
                                    <option value="Culturales">Culturales</option>
                                    <option value="Deportivas">Deportivas</option>
                                    <option value="Tecnológicas">Tecnológicas</option>
                                    <option value="Artísticas">Artísticas</option>
                                    <option value="Gastronómicas">Gastronómicas</option>
                                    <option value="Recreativas">Recreativas</option>
                                </select>
                            <label for="responsable-stand">Responsable</label><input type="text" class="form-control input-responsable" placeholder="Responsable" aria-required="true" required>
                            <label for="ubicacion-stand">Ubicación</label><input type="text" class="form-control input-ubicacion" placeholder="Ubicación" aria-required="true" required>
                            <label for="descripcion-stand">Descripción</label><textarea class="form-control input-descripcion" placeholder="Descripcion" aria-required="true" required></textarea>
                    </div>
                    <div class="card-footer">

                        <button class="btn-cancelar" type="button" aria-label="Cancelar creación del stand">
                            Cancelar
                        </button>

                        <button class="btn-guardar" type="button" aria-label="Guardar nuevo stand">
                            Guardar
                        </button>

                    </div>
                </div>
            `;

            contenedor.append(tarjeta);

            //Botón Guardar
            const botonGuardar = tarjeta.querySelector(".btn-guardar");

            botonGuardar.addEventListener("click", () =>{
                guardarStand(tarjeta);
            });


            //Botó Cancelar
            const botonCancelar = tarjeta.querySelector(".btn-cancelar");

            botonCancelar.addEventListener("click", () =>{
                tarjeta.remove();
            });
}


const btnCrearStand = document.getElementById("btnCrearStand");

btnCrearStand.addEventListener("click", () => {

    const tarjetaExistente = contenedor.querySelector(".input-nombre");
    
    if (tarjetaExistente) {
        return;
    }

    crearTarjetaVacia();

});


async function guardarStand(tarjeta) {

    const nuevoStand = {

        nombre: tarjeta.querySelector(".input-nombre").value,

        categoria: tarjeta.querySelector(".input-categoria").value,

        responsable: tarjeta.querySelector(".input-responsable").value,

        ubicacion: tarjeta.querySelector(".input-ubicacion").value,

        descripcion: tarjeta.querySelector(".input-descripcion").value

    };


    try {

        const response = await fetch(
            "http://localhost:3000/stands",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(nuevoStand)
            }
        );


        if (!response.ok) {

            throw new Error("Error al guardar el Stand");

        }


        // Volver a cargar las tarjetas
        cargarTarjetas();


    } catch (error) {

        console.error(error);

        alert("No se pudo guardar el Stand");

    }

}


async function editarTarjeta(tarjeta, stand) {
    tarjeta.innerHTML = `
        <div class="stand-card" role="region" aria-label="Formulario para editar el stand ${stand.nombre}">
            <div class="card-header">
                <input type="text" class="form-control input-nombre" value="${stand.nombre}" id="nombre-stand" aria-required="true" required>

            </div>
            <div class="card-body">
                <label for="categoria-stand">Categoría</label>
                    <select id="categoria-stand" class="form-control input-categoria" aria-required="true" required>

                        <option value="" disabled
                            ${stand.categoria === "" ? "selected" : ""}>
                            Seleccione una categoría
                        </option>

                        <option value="Culturales"
                            ${stand.categoria === "Culturales" ? "selected" : ""}>
                            Culturales
                        </option>

                        <option value="Deportivas"
                            ${stand.categoria === "Deportivas" ? "selected" : ""}>
                            Deportivas
                        </option>

                        <option value="Tecnológicas"
                            ${stand.categoria === "Tecnológicas" ? "selected" : ""}>
                            Tecnológicas
                        </option>

                        <option value="Artísticas"
                            ${stand.categoria === "Artísticas" ? "selected" : ""}>
                            Artísticas
                        </option>

                        <option value="Gastronómicas"
                            ${stand.categoria === "Gastronómicas" ? "selected" : ""}>
                            Gastronómicas
                        </option>

                        <option value="Recreativas"
                            ${stand.categoria === "Recreativas" ? "selected" : ""}>
                            Recreativas
                        </option>

                    </select>

                <label for="responsable-stand">Responsable</label>
                    <input id="responsable-stand" type="text" class="form-control input-responsable" value="${stand.responsable}" aria-required="true" required>

                <label for="ubicacion-stand">Ubicación</label>
                    <input id="ubicacion-stand" type="text" class="form-control input-ubicacion" value="${stand.ubicacion}" aria-required="true" required>

                <label for="descripcion-stand">Descripción</label>
                    <textarea id="descripcion-stand" class="form-control input-descripcion" aria-required="true" required>${stand.descripcion}</textarea>
            </div>

            <div class="card-footer">

                <button class="btn-cancelar" type="button" aria-label="Cancelar creación del stand">
                    Cancelar
                </button>

                <button class="btn-guardar" type="button" aria-label="Guardar nuevo stand">
                    Guardar
                </button>

            </div>

        </div>
    `;

    //Botón Guardar
    const botonGuardar = tarjeta.querySelector(".btn-guardar");

    botonGuardar.addEventListener("click", () =>{
        actualizarStand(tarjeta, stand._id);
    });


    //Botó Cancelar
    const botonCancelar = tarjeta.querySelector(".btn-cancelar");

    botonCancelar.addEventListener("click", () =>{
        cargarTarjetas();
    });
    
}

async function actualizarStand(tarjeta, id) {

    const standActualizado = {

        nombre: tarjeta.querySelector(".input-nombre").value,

        categoria: tarjeta.querySelector(".input-categoria").value,

        responsable: tarjeta.querySelector(".input-responsable").value,

        ubicacion: tarjeta.querySelector(".input-ubicacion").value,

        descripcion: tarjeta.querySelector(".input-descripcion").value

    };


    try {

        const response = await fetch(
            `http://localhost:3000/stands/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(standActualizado)
            }
        );


        if (!response.ok) {

            throw new Error("Error al actualizar el Stand");

        }


        // Volver a cargar las tarjetas

        cargarTarjetas();


    } catch (error) {

        console.error(error);

        alert("No se pudo actualizar el Stand");

    }

}

async function eliminarStand(id){
    const resultado = await Swal.fire({
        title: "¿Eliminar stand?",
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
            `http://localhost:3000/stands/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Error al eliminar el Stand");
        }

        cargarTarjetas();

    } catch (error) {

        console.error(error);

        alert("No se pudo eliminar el Stand");

    }
}


cargarTarjetas();