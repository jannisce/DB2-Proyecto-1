import express from 'express'
const router = express.Router()

// Controladores
import { getAllOwners, createOwner} from '../controllers/ownersController.js'

// Ruta para obtener todos los propietarios
router.get('/', getAllOwners)

// Ruta para crear un nuevo owner
router.post('/', createOwner)

export default router