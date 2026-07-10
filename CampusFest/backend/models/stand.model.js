const mongoose = require("mongoose");

//Esquema "Stands"
const schemaStand = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        enum: ['Actividades culturales', 'Deportivas', 'Tecnológicas', 'Artísticas', 'Gastronómicas', 'Recreativas'],
        required: true
    },
    responsable:{
        type: String,
        required: true
    },
    ubicacion:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Stand", schemaStand);