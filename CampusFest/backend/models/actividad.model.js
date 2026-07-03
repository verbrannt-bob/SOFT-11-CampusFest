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
        enum: ['Actividades culturales', 'Deportivas', 'Tecnológicas', 'Artísticas', 'Gastronómicas', 'Recreativas'],
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
    vistantesInscritos: [
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
    ]

});

module.exports = mongoose.model("Actividad", schemaActividad);