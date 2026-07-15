const express = require('express');
const router = express.Router();
const Stand = require('../models/stand.model');

//Crear stand
router.post("/", async(req, res) => {
	const {nombre, categoria, responsable, ubicacion, descripcion} = req.body;
    
    if(!nombre || !categoria || !responsable || !ubicacion || !descripcion){
    		return res.status(400).json({ mensajeError: "Todos los datos son obligatorios" });
    }
    
    try{
    	const nuevoStand = new Stand({nombre, categoria, responsable, ubicacion, descripcion});
        await nuevoStand.save();
        res.status(201).json({ mensaje: "Stand creado", stand: nuevoStand });
    }catch(error){
    	res.status(400).json({ mensajeError: error.message });
    }
});

/*

http://localhost:3000/stands/6a4da11633a4ce46e6f77ba2
{
    "nombre": "Robotica",
    "categoria": "Tecnológicas",
    "responsable": "Pablo Perez",
    "ubicacion": "Segundo piso",
    "descripcion": "Stand del club de Robotica"
}
*/

//get
router.get("/", async (req, res) => {
    try {
        const stands = await Stand.find();
        res.json(stands);
    } catch (error) {
        res.status(500).json({ mensajeError: "Error al obtener los stands." });
    }
});

//get x id
router.get("/:id", async(req, res) => {
	const { id } = req.params;
  try {
        const stand = await Stand.findById(id);
        if (!stand) {
            return res.status(404).json({ error: "Stand no encontrado" });
        }
        res.status(200).json(stand);
    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
    }
});

//actualizar stand
router.put("/:id", async (req, res) => {
	const { id } = req.params;
  const {nombre, categoria, responsable, ubicacion, descripcion} = req.body;
  
	try {
  	const stand = await Stand.findByIdAndUpdate(
    id,
    {nombre, categoria, responsable, ubicacion, descripcion},
    {  returnDocument: 'after', runValidators: true  }
    );
    if (!stand) {
    	return res.status(404).json({ error: "Stand no encontrado" });
    }
    res.status(200).json({ mensaje: "Stand actualizado", stand});
  } catch (error) {
        res.status(400).json({ mensajeError: error.message });
    }
});


//Eliminar stand
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
  
  try {
  	const stand = await Stand.findByIdAndDelete(id);
    if (!stand) {
            return res.status(404).json({ error: "Stand no encontrado" });
        }
        res.status(200).json({ mensaje: "Stand eliminado" });
    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
  }
});

module.exports = router;