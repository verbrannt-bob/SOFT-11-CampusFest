const express = require("express");
const router = express.Router();
const Certificacion = require("../models/actividad.model");
const Actividad = require('../models/actividad.model');
const Visitante = require('../models/visitante.model');

//Crear Actividad
router.post("/", async (req, res) => {
  const { nombre, descripcion, categoria, cupos, horario, ubicacion, visitantesInscritos, listaEspera } = req.body;

  if (!nombre || !categoria || !cupos || !ubicacion) {
    return res.status(400).json({ mensajeError: "El nombre, la categoría, los cupos y la ubicación son obligatorios." });
  }

  //Validar horario
  if (horario) {
    const { fechaInicio, fechaFinal } = horario;

    if (!fechaInicio || !fechaFinal) {
      return res.status(400).json({ mensajeError: "Debe indicar la fecha de inicio y la fecha final de la actividad." });
    }
  }

  try {
    const nuevaActividad = new Actividad(req.body);
    await nuevaActividad.save();
    res.status(201).json(nuevaActividad);
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }

});


//Get general
router.get("/", async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ msj: "Error al obtener las actividades", error });
  }
});

//Get por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const actividad = await Actividad.findById(id);
    if (!actividad) {
      return res.status(404).json({ error: "Actividad no encontrado" });
    }
    res.status(200).json(actividad);
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
});


//Patch agregar visitante
router.patch("/visitantes/:id", async (req, res) => {
  const { id } = req.params;
  const { visitanteId } = req.body;

  try {
    const actividad = await Actividad.findById(id);

    if(actividad.cupos <= actividad.visitantesInscritos.length){
      return res.status(401).json({ error: "La Actividad esta llena" });
    }

    const actividadActualizada = await Actividad.findByIdAndUpdate(
      id,
      { $addToSet: { visitantesInscritos: visitanteId } },
      { returnDocument: "after" }
    ).populate("visitantesInscritos");
    if (!actividadActualizada) {
      return res.status(404).json({ error: "Actividad no encontrado" });
    }
    res.status(200).json({mensaje: "Actividad Actualizada", actividad: actividadActualizada });
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
});


//Patch agrea visitante a la lista de espera
router.patch("/espera/:id", async (req, res) => {
  const { id } = req.params;
  const { visitanteId } = req.body;

  try {
    const actividad = await Actividad.findByIdAndUpdate(
      id,
      { $addToSet: { listaEspera: visitanteId } },
      { returnDocument: "after" }
    ).populate("listaEspera");
    if (!actividad) {
      return res.status(404).json({ error: "Actividad no encontrado" });
    }
    res.status(200).json(actividad);
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
});

//Patch modificar cupo maximo
router.patch("/cupos/:id/:cupos", async (req, res) => {
  const { id, cupos } = req.params;

  try {
    const actividad = await Actividad.findByIdAndUpdate(
      id,
      { $set: { cupos } },
      { returnDocument: "after" }
    );
    if (!actividad) {
      return res.status(404).json({ error: "Actividad no encontrado" });
    }
    res.status(200).json(actividad);
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
});


//patch admitir visitantes de la lista de espera
router.patch("/admitir/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const actividad = await Actividad.findById(id);
    if (!actividad) {
      return res.status(404).json({ error: "Actividad no encontrado" });
    }
    const cantidad = actividad.cupos - actividad.visitantesInscritos.length;
    const idsPorMover = actividad.listaEspera.slice(0, cantidad);
    if (idsPorMover.length === 0) { return res.status(400).json({ message: "Lista de espera esta vacia" }); }


    const actividadActualizada = await Actividad.findByIdAndUpdate(
      id,
      {
        $push: { visitantesInscritos: { $each: idsPorMover } },
        $pull: { listaEspera: {$in: idsPorMover}}
      },
      { returnDocument: "after" }
    )
    res.status(200).json(actividadActualizada);
  } catch (error){
    res.status(400).json({ mensajeError: error.message });
  }
})

//delete
router.delete("/:id", async(req, res) => {
  const { id } = req.params;

  try {
    const actividad = await Actividad.findByIdAndDelete(id);
    if (!actividad) {
      return res.status(404).json({ error: "Actividad no encontrado" });
    }
    await Visitante.updateMany(
      {actividades: id},
      {$pull: {actividades: id}}
    );

    res.status(200).json({
            mensaje: "Actividad eliminada y visitantes actualizados"
        });
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
})

module.exports = router;

