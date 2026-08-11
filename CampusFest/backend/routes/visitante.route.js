const express = require("express");
const router = express.Router();
const Certificacion = require("../models/visitante.model");
const Visitante = require("../models/visitante.model");

//post
router.post("/", async (req, res) => {
    const { nombre, correo, telefono, carrera, actividades } = req.body;
    if (!nombre || !correo || !telefono || !carrera) {
        return res.status(400).json({ mensajeError: "Nombre, correo, telefono, carrera y actividades son obligatorios" });
    }

    try {
        const nuevoVisitante = new Visitante({ nombre, correo, telefono, carrera, actividades });
        await nuevoVisitante.save();
        res.status(201).json({ mensaje: "Visitante creado", visitante: nuevoVisitante });
    } catch (error) {
        res.status(400).json({ mensajeError: error.message })
    }
});


//get
router.get("/", async (req, res) => {
    try {
        const visitantes = await Visitante.find();
        res.json(visitantes);
    } catch (error) {
        res.status(500).json({ msj: "Error al obtener los visitantes", error });
    }
})

//patch agregar nueva actividad
router.patch("/actividades/:id", async (req, res) => {
    const { id } = req.params;
    const { actividadId } = req.body;

    try {
        const visitanteCheck = await Visitante.findById(id);
        if (visitanteCheck.actividades.includes(actividadId)) {
            res.status(499).json({ msj: "El visitante ya tiene esta actividad en su lista", error });
        }

        const visitante = await Visitante.findByIdAndUpdate(
            id,
            { $push: { actividades: actividadId } },
            { returnDocument: "after" }
        ).populate("actividades");
        res.status(201).json({ mensaje: "Actividad agregada", visitante: visitante });
    } catch (error) {
        res.status(500).json({ msj: "Error al obtener los visitantes", error });
    }
})

module.exports = router;
