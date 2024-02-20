import { ObjectId } from 'mongodb';
import { getDB } from '../db/db.js'

// Función controladora para obtener todos los propietarios
export const getAllOwners = async (req, res) => {
  try {
    const db = getDB()
    const owners = await db.collection('owners').find().toArray()
    res.json(owners)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener las propietarios' })
  }
}