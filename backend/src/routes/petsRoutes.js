import express from 'express'
const router = express.Router()

// Controladores
import { getAllPets, createPet } from '../controllers/petsController.js'

// Ruta para obtener todas las tareas
router.get('/', getAllPets)

// Ruta para crear una nueva tarea
router.post('/', createPet)

export default router