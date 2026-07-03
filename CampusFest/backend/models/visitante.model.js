const mongoose = require("mongoose");

//Esquema "Visitante"
const schemaVisitante = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    actividades: [
        {
            type: Schema.Types.ObjectID,
            ref: "Actividad"
        }
    ]
});

module.exports = mongoose.model("Visitante", schemaVisitante);