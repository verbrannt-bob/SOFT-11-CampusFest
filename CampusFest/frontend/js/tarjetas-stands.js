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
                        <button class="btn-editar">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
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

            const botonEditar = tarjeta.querySelector(".btn-editar");

            botonEditar.addEventListener("click", () => {

                editarTarjeta(tarjeta, stand);

            });

        });
    });
}

function crearTarjetaVacia(){
    const tarjeta = document.createElement("div");

    tarjeta.className = "col-12 col-lg-4 d-flex justify-content-center";
            tarjeta.innerHTML = `
                <div class="stand-card">
                    <div class="card-header">
                        <input type="text" class="form-control input-nombre" placeholder="Nombre del Stand">
                    </div>
                
                    <div class="card-body">
                            <p><strong>Categoría</strong>
                                <select class="form-control input-categoria">
                                    <option value="" disabled selected>Seleccione una categoría</option>
                                    <option value="Actividades culturales">Actividades culturales</option>
                                    <option value="Deportivas">Deportivas</option>
                                    <option value="Tecnológicas">Tecnológicas</option>
                                    <option value="Artísticas">Artísticas</option>
                                    <option value="Gastronómicas">Gastronómicas</option>
                                    <option value="Recreativas">Recreativas</option>
                                </select>
                            </p>
                            <p><strong>Responsable</strong><input type="text" class="form-control input-responsable" placeholder="Responsable"</p>
                            <p><strong>Ubicación</strong><input type="text" class="form-control input-ubicacion" placeholder="Ubicación"></p>
                            <p><strong>Descripción</strong><textarea class="form-control input-descripcion" placeholder="Descripcion"></textarea></p>
                    </div>
                    <div class="card-footer">

                        <button class="btn-cancelar">
                            Cancelar
                        </button>

                        <button class="btn-guardar">
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
        <div class="stand-card">
            <div class="card-header">
                <input type="text" class="form-control input-nombre" value="${stand.nombre}">

            </div>
            <div class="card-body">
                <p><strong>Categoría</strong>
                    <select class="form-control input-categoria">

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
                </p>

                <p><strong>Responsable</strong>
                    <input type="text" class="form-control input-responsable" value="${stand.responsable}">
                </p>

                <p><strong>Ubicación</strong>
                    <input type="text" class="form-control input-ubicacion" value="${stand.ubicacion}">
                </p>

                <p><strong>Descripción</strong>
                    <textarea class="form-control input-descripcion">${stand.descripcion}</textarea>
                </p>
            </div>

            <div class="card-footer">

                <button class="btn-cancelar">
                    Cancelar
                </button>

                <button class="btn-guardar">
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


cargarTarjetas();