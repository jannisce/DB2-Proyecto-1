import express from 'express'
const router = express.Router()

// Controladores
import { getAllOwners } from '../controllers/ownersController.js'

// Ruta para obtener todas las perro
router.get('/', getAllOwners)

export default router