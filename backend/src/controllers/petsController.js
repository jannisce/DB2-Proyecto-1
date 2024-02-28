import { ObjectId } from 'mongodb'
import { getDB } from '../db/db.js'


export const getAllPets = async (req, res) => {
  console.log('getAllPets')
  try {
    const db = getDB()
    const { age, weight, breed, sort, page, limit, owner_id } = req.query
    const filter = []
    const projection = {
      $project: {
        name: 1,
        picture: 1,
        age: 1,
        breed: 1,
        weight: 1,
        owner_id: 1,
      },
    }
    console.log(req.query)
    if (age) filter.push({ $match: { age: parseInt(age) } })
    if (weight) filter.push({ $match: { weight: parseInt(weight) } })
    if (breed) filter.push({ $match: { breed: { $regex: breed, $options: 'i' } } })

    // if owner_id request was passed as 'null' then we need to filter pets without owner
    if (owner_id === 'null') {
      filter.push({ $match: { owner_id: null } });
    } else if (owner_id === 'notnull') {
      filter.push({ $match: { owner_id: { $ne: null } } });
    }
    
    let aggregationPipeline = []

    // Agregar los filtros al pipeline de agregación
    if (filter.length > 0) {
      aggregationPipeline = [...aggregationPipeline, ...filter]
    }

    // Agregar proyección al pipeline de agregación
    aggregationPipeline.push(projection)

    // Aplicar sort si se proporciona
    if (sort) {
      const sortOrder = sort === 'asc' ? 1 : -1
      aggregationPipeline.push({ $sort: { age: sortOrder } })
    }

    // Agregar paginación al pipeline de agregación
    if (page && limit) {
      const pageNumber = parseInt(page)
      const limitNumber = parseInt(limit)
      const skip = (pageNumber - 1) * limitNumber
      aggregationPipeline.push({ $skip: skip })
      aggregationPipeline.push({ $limit: limitNumber })
    }

    const pets = await db.collection('pets').aggregate(aggregationPipeline).toArray()
    res.json(pets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener las mascotas' })
  }
}

// Función controladora para obtener una mascota por su id
export const getPetById = async (req, res) => {
  const { _id } = req.params
  const db = getDB()

  try {
    if (!ObjectId.isValid(_id)) {
      res.status(404).json({ message: 'ID de mascota no válido' })
      return
    }

    const pet = await db.collection('pets').aggregate([
      { $match: { _id: new ObjectId(_id) } },
      {
        $lookup: {
          from: 'owners',
          localField: 'owner_id',
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
          owner_id: '$ownerInfo._id',
          owner_name: '$ownerInfo.name',
          owner_address: '$ownerInfo.address',
          owner_phone: '$ownerInfo.phone',
          owner_email: '$ownerInfo.email',
          vaccines: {
            $map: {
              input: '$vaccines',
              as: 'vaccine',
              in: {
                name: '$$vaccine.name',
                date: '$$vaccine.date',
                next_dosis: '$$vaccine.next_dosis'
              }
            }
          }
        }
      }
    ]).toArray()

    console.log(pet)
    
    if (pet.length > 0) {
      res.json(pet[0])
    } else {

      // this means the pet didn't have an owner so we need to get the pet without the owner info
      const pet = await db.collection('pets').findOne({ _id: new ObjectId(_id) })
      res.json(pet)
      console.log(pet)

    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener la mascota' })
  }
}


// Función controladora para crear una nueva mascota
export const createPet = async (req, res) => {
  const { 
    name, 
    picture, 
    breed, 
    weight, 
    size, 
    diet, 
    color, 
    personality,
    age, 
    health_state, 
    allergies, 
    special_condition, 
    notes, 
    vaccines 
  } = req.body
  try {
    const db = getDB()

    // Convertir las alergias, condiciones especiales y notas a arreglos
    let new_allergies = []
    let new_special_condition = []
    let new_notes = []

    if (allergies !== undefined && allergies !== null) {
      new_allergies = String(allergies).split(',')
    }

    if (special_condition !== undefined && special_condition !== null) {
      new_special_condition = String(special_condition).split(',')
    }

    if (notes !== undefined && notes !== null) {
      new_notes = String(notes).split(',')
    }

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
      allergies : new_allergies,
      special_condition : new_special_condition,
      notes : new_notes,
      vaccines: [],
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
  const { name, picture, breed, weight, size, diet, color, personality, age, health_state, allergies, special_condition, notes, vaccines, owner_id } = req.body

  // Convertir los atributos a enteros
  const ageInt = parseInt(age)
  const weightInt = parseInt(weight)
  const sizeInt = parseInt(size)

  // if owner is different from undefined, convert it to ObjectId
  let ownerId
  if (owner_id !== undefined) {
    ownerId = new ObjectId(owner_id)
  }

  let new_allergies = []
  let new_special_condition = []
  let new_notes = []

  // allergies, special_condition and notes are arrays
  if (allergies !== undefined && allergies !== null) {
    new_allergies = String(allergies).split(',')
  }

  if (special_condition !== undefined && special_condition !== null) {
    new_special_condition = String(special_condition).split(',')
  }

  if (notes !== undefined && notes !== null) {
    new_notes = String(notes).split(',')
  }

  try {
    const db = getDB()
    const result = await db.collection('pets').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { 
        name,
        picture, 
        breed, 
        weight: weightInt, 
        size, 
        diet, 
        color, 
        personality, 
        age: ageInt, 
        health_state, 
        allergies: new_allergies,
        special_condition : new_special_condition,
        notes : new_notes,
        vaccines, 
        owner_id: ownerId 
      } }
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

// Función controladora para actualizar las vacunas de una mascota por su id
export const updatePetVaccines = async (req, res) => {
  const { _id } = req.params
  const { vaccines } = req.body

  try {
    const db = getDB()
    const result = await db.collection('pets').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { vaccines } }
    )

    if (result.modifiedCount) {
      res.json({ message: 'Vacunas de mascota actualizadas' })
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar las vacunas de la mascota' })
  }
}

