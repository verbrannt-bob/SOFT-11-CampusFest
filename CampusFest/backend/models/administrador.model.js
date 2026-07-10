const mongoose = require("mongoose");

//Esquema "Administrador"
const schemaAdministrador = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("Administrador", schemaAdministrador);