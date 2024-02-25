import { ObjectId } from 'mongodb'
import { getDB } from '../db/db.js'


// Función controladora para obtener todas las mascotas con posibilidad de ordenar por edad y paginación
export const getAllPets = async (req, res) => {
  console.log('getAllPets')
  try {
    const db = getDB()
    const { age, weight, breed, sort, page, limit } = req.query
    const filter = {}
    console.log(req.query)
    if (age) filter.age = parseInt(age)
    if (weight) filter.weight = parseInt(weight)
    if (breed) filter.breed = { $regex: breed, $options: 'i' }

    let petsQuery = db.collection('pets').find(filter)

    if (sort) {
      console.log(sort) 
      const sortOrder = sort === 'asc' ? 1 : -1
      petsQuery = petsQuery.sort({ age: sortOrder })
    }

    // Agregar paginación
    if (page && limit) {
      const pageNumber = parseInt(page)
      const limitNumber = parseInt(limit)
      const skip = (pageNumber - 1) * limitNumber
      petsQuery = petsQuery.skip(skip).limit(limitNumber)
    }

    const pets = await petsQuery.toArray()
    res.json(pets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener las mascotas' })
  }
}

// Función controladora para obtener una mascota por su id
export const getPetById = async (req, res) => {
  const { _id } = req.params
  try {
    if (!ObjectId.isValid(_id)) {
      res.status(404).json({ message: 'ID de mascota no válido' })
      return
    }

    const db = getDB()
    const pet = await db.collection('pets').aggregate([
      { $match: { _id: new ObjectId(_id) } },
      {
        $lookup: {
          from: 'owners',
          localField: 'owner',
          foreignField: '_id',
          as: 'ownerInfo'
        }
      },
      { $unwind: '$ownerInfo' },
      {
        $project: {
          _id: 1,
          name: 1,
          picture: 1,
          breed: 1,
          weight: 1,
          size: 1,
          diet: 1,
          color: 1,
          personality: 1,
          age: 1,
          health_state: 1,
          allergies: 1,
          special_condition: 1,
          notes: 1,
          vaccines: 1,
          owner_id: '$ownerInfo._id',
          owner_name: '$ownerInfo.name',
          owner_address: '$ownerInfo.address',
          owner_phone: '$ownerInfo.phone',
          owner_email: '$ownerInfo.email'
        }
      }
    ]).toArray()

    console.log(pet)
    
    if (pet.length > 0) {
      res.json(pet[0])
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener la mascota' })
  }
}


// Función controladora para crear una nueva mascota
export const createPet = async (req, res) => {
  const { name, picture, breed, weight, size, diet, color, personality, age, health_state, allergies, special_condition, notes, vaccines } = req.body
  try {
    const db = getDB()
    const result = await db.collection('pets').insertOne({
      name,
      picture,
      breed,
      weight : parseInt(weight),
      size,
      diet,
      color,
      personality,
      age : parseInt(age),
      health_state,
      allergies,
      special_condition,
      notes,
      vaccines
    })
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear la mascota' })
  }
}

// Función controladora para eliminar una mascota por su 
export const deletePet = async (req, res) => {
  const { _id } = req.params
  try {
    const db = getDB()
    const result = await db.collection('pets').deleteOne({ _id: new ObjectId(_id) })
    if (result.deletedCount) {
      res.json({ message: 'Mascota eliminada' })
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar la mascota' })
  }
}

// Función controladora para actualizar una mascota por su id
export const updatePet = async (req, res) => {
  const { _id } = req.params
  const { name, picture, breed, weight, size, diet, color, personality, age, health_state, allergies, special_condition, notes, vaccines, owner } = req.body

  // Convertir los atributos a enteros
  const ageInt = parseInt(age)
  const weightInt = parseInt(weight)
  const sizeInt = parseInt(size)

  // if owner is different from undefined, convert it to ObjectId
  let ownerId
  if (owner !== undefined) {
    ownerId = new ObjectId(owner)
  }

  try {
    const db = getDB()
    const result = await db.collection('pets').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { name, picture, breed, weight: weightInt, size, diet, color, personality, age: ageInt, health_state, allergies, special_condition, notes, vaccines, owner: ownerId } }
    )

    if (result.modifiedCount) {
      res.json({ message: 'Mascota actualizada' })
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar la mascota' })
  }
}
