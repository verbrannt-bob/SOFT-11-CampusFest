const express = require('express');
const router = express.Router();
const Actividad = require('../models/actividad.model');

//Crear Actividad
router.post("/", async(req, res) => {
	const {nombre, descripcion, categoria, cupos, horario, ubicacion, visitantesInscritos, listaEspera} = req.body;
  
  if(!nombre || !categoria || !cupos || !ubicacion){
  	return res.status(400).json({mensajeError: "El nombre, la categoría, los cupos y la ubicación son obligatorios."});
  }
  
  //Validar horario
  if(horario){
  	const {fechaInicio, fechaFinal} = horario;
    
    if(!fechaInicio || !fechaFinal){
    	return res.status(400).json({mensajeError: "Debe indicar la fecha de inicio y la fecha final de la actividad." });
    }
  }
  
  try{
  	const nuevaActividad = new Actividad(req.body);
    await nuevaActividad.save();
    res.status(201).json(nuevaActividad);
  }catch(error){
  	res.status(400).json({ mensajeError: error.message });
  }
  
});


//Get general
router.get("/", async (req, res) => {
   try{ 
    const actividad = await Actividad.find();
    res.json(actividades);
  }catch(error){
  	res.status(500).json({ msj: "Error al obtener las actividades", error });
  }
});