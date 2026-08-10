const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaActividad = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        enum: ['Culturales', 'Deportivas', 'Tecnológicas', 'Artísticas', 'Gastronómicas', 'Recreativas'],
        required: true
    },
    cupos: {
        type: Number,
        required: true
    },
    horario: {
        fechaInicio: {
            type: Date,
            required: true,
        },
        fechaFinal: {
            type: Date,
            required: true,
        },
    },
    ubicacion: {
        type: String,
        required: true
    },
    visitantesInscritos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Visitante"
        }
    ],
    listaEspera: [
        {
            type: Schema.Types.ObjectId,
            ref: "Visitante"
        }
    ],
    requisitos: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Actividad", schemaActividad);