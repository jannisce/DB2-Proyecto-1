import express from 'express'
const router = express.Router()

// Controladores
import { getAllPets, getPetById, createPet, deletePet } from '../controllers/petsController.js'

// Ruta para obtener todas las perro
router.get('/', getAllPets)

// Ruta para crear una nueva perro
router.post('/', createPet)

// Ruta para obtener una perro por su id
router.get('/:_id', getPetById)

// Ruta para eliminar una perro por su id
router.delete('/:_id', deletePet)

export default router