const express = require("express");
const router = express.Router();
const Certificacion = require("../models/visitante.model");

//post
router.post("/", async(req, res) => {
    const {nombre, correo, telefono, carrera, actividades}
    if(!nombre || !correo || !telefono || !carrera){
		return res.status(400).json({ mensajeError: "Nombre, correo, telefono, carrera y actividades son obligatorios" });
	}
  
    try {
        const nuevoVisitante = new Visitante({ nombre, correo, telefono, carrera, actividades});
        await nuevoVisitante.save();
        res.status(201).json({ mensaje: "Visitante creado", visitante: nuevoVisitante });
    } catch (error) {
        res.status(400).json({mensajeError: error.message})
    }
});
