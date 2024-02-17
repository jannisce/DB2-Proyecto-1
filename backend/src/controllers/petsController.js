import { ObjectId } from 'mongodb';
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
}

// Función controladora para obtener una mascota por su id
export const getPetById = async (req, res) => {
  const { _id } = req.params;
  try {
    const db = getDB();
    const pet = await db.collection('pets').findOne({ _id: new ObjectId(_id) });
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la mascota' });
  }
};

// Función controladora para crear una nueva mascota
export const createPet = async (req, res) => {
  const { name, species, age } = req.body
  try {
    const db = getDB()
    const result = await db.collection('pets').insertOne({
      name,
      species,
      age
    })
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear la mascota' })
  }
}
