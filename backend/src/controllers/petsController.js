import { getDB } from '../db/db.js'

// Función controladora para obtener todas las mascotas
export const getAllPets = async (req, res) => {
  try {
    const db = getDB()
    const pets = await db.collection('pets').find().toArray()
    res.json(pets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener las mascotas' })
  }
};

// Función controladora para crear una nueva mascota
export const createPet = async (req, res) => {
  const { name, species, age } = req.body
  try {
    const db = getDB();
    const result = await db.collection('pets').insertOne({ 
        name,
        species,
        age 
    })
    res.status(201).json(result.ops[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear la mascota' })
  }
};
