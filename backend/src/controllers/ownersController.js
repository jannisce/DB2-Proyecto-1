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

// Función controladora para agregar un nuevo propietario
export const createOwner = async (req, res) => {
  const { name, address, phone, email } = req.body
  try {
    const db = getDB()
    const result = await db.collection('owners').insertOne({
      name,
      address,
      phone,
      email
    })

    const ownerId = result.insertedId

    res.status(201).json({ _id: ownerId, message: 'Propietario creado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear el propietario' })
  }
}