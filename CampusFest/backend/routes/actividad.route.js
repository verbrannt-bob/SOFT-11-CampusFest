const express = require('express');
const mongoose = require("mongoose");
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
// router.get("/", async (req, res) => {
//   try {
//     const actividades = await Actividad.find();
//     res.json(actividades);
//   } catch (error) {
//     res.status(500).json({ msj: "Error al obtener las actividades", error });
//   }
// });

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

//get filtros
router.get("/", async (req, res) => {
  try {
    const { busqueda, categoria, fechaInicio } = req.query;

    const filtro = {};

    // Búsqueda por nombre, descripción o ubicacion
    if (busqueda) {
      filtro.$or = [
        {
          nombre: {
            $regex: busqueda,
            $options: "i"
          }
        },
        {
          descripcion: {
            $regex: busqueda,
            $options: "i"
          }
        },
        {
          ubicacion: {
            $regex: busqueda,
            $options: "i"
          }
        }
      ];
    }

    // Filtro por categoría
    if (categoria) {
      filtro.categoria = categoria;
    }

    // Filtro por fecha
    // if (fecha) {
    //   filtro.fechaInicio = fecha;
    // }

    const actividades = await Actividad.find(filtro);

    res.json(actividades);

  } catch (error) {
    res.status(500).json({mensaje: "Error al obtener actividades", error: error.message});
  }
});

//Patch agregar visitante
router.patch("/visitantes/:id", async (req, res) => {
  const { id } = req.params;
  const { visitanteId } = req.body;

  try {
    const actividadCheck = await Actividad.findById(id);
    if (actividadCheck.visitantesInscritos.includes(visitanteId)) {
      res.status(499).json({ msj: "El visitante ya esta registrado a esta actividad", error });
    }

    const actividad = await Actividad.findByIdAndUpdate(
      id,
      { $push: { visitantesInscritos: visitanteId } },
      { returnDocument: "after" }
    ).populate("visitantesInscritos");
    res.status(201).json({ mensaje: "Visitante agregado", actividad: actividad });
  } catch (error) {
    res.status(500).json({ msj: "Error al agregar el visitante a la actividad", error });
  }
})


//Patch agrea visitante a la lista de espera
router.patch("/espera/:id", async (req, res) => {
  const { id } = req.params;
  const { visitanteId } = req.body;

  try {
    const actividadCheck = await Actividad.findById(id);
    if (actividadCheck.listaEspera.includes(visitanteId)) {
      res.status(499).json({ msj: "El visitante ya esta registrado en la lista de espera", error });
    }

    const actividad = await Actividad.findByIdAndUpdate(
      id,
      { $push: { listaEspera: visitanteId } },
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
      return res.status(404).json({ error: "Actividad no encontrada" });
    }
    const cantidad = actividad.cupos - actividad.visitantesInscritos.length;
    const idsPorMover = actividad.listaEspera.slice(0, cantidad);
    if (idsPorMover.length === 0) { return res.status(400).json({ message: "Lista de espera esta vacia" }); }


    const actividadActualizada = await Actividad.findByIdAndUpdate(
      id,
      {
        $push: { visitantesInscritos: { $each: idsPorMover } },
        $pull: { listaEspera: { $in: idsPorMover } }
      },
      { returnDocument: "after" }
    )
    res.status(200).json(actividadActualizada);
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
})

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const actividad = await Actividad.findByIdAndDelete(id);
    if (!actividad) {
      return res.status(404).json({ error: "Actividad no encontrado" });
    }
    await Visitante.updateMany(
      { actividades: id },
      { $pull: { actividades: id } }
    );

    res.status(200).json({
      mensaje: "Actividad eliminada y visitantes actualizados"
    });
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
})

//put
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const dataActualizada = req.body;

  try {
    let actividad = await Actividad.findById(id);
    if (actividad.cupos > dataActualizada.cupos) {
      return res.status(499).json({ error: "La cantidad de cupos no puede disminuir" });
    }

    actividad = await Actividad.findByIdAndUpdate(
      id,
      dataActualizada,
      {
        returnDocument: "after",
        runValidators: true
      }
    );
    if (!dataActualizada.nombre || !dataActualizada.descripcion || !dataActualizada.categoria || !dataActualizada.cupos || !dataActualizada.horario.fechaInicio || !dataActualizada.horario.fechaFinal || !dataActualizada.ubicacion || !dataActualizada.requisitos) {
      return res.status(404).json({ error: "Campos incompletos" });
    }
    res.status(200).json({ mensaje: "Actividad actualizado", actividad });
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
})

module.exports = router;

