import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { API_URL } from '../../data/constants'

const DetailedPet = ({ pet }) => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editedPet, setEditedPet] = useState({ ...pet })

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setEditedPet({ ...pet })
  }

  const handleConfirmClick = async () => {
    const shouldDelete = window.confirm(
      `¿Estás seguro de que quieres actualizar los datos de: ${pet.name} ?`
    )
    if (shouldDelete) {
      try {
        await axios.put(`${API_URL}/pets/${pet._id}`, editedPet)
        setIsEditing(false)
      } catch (error) {
        console.error('Error al eliminar mascota:', error)
        alert('Error al actualizar la mascota')
        setEditedPet({ ...pet })
        setIsEditing(false)
      }
    }
  }

  const handleDeleteClick = async () => {
    const shouldDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar la mascota: ${pet.name} ?`
    )

    if (shouldDelete) {
      try {
        await axios.delete(`${API_URL}/pets/${pet._id}`)
        alert(`Mascota eliminada`)
        navigate('/adopt')
      } catch (error) {
        console.error('Error al eliminar mascota:', error)
      }
    }
  }

  const handleInputChange = (e) => {
    setEditedPet({
      ...editedPet,
      [e.target.name]: e.target.value,
    })
  }

  const fields = [
    // '_id',
    'name',
    'picture',
    'breed',
    'weight',
    'size',
    'diet',
    'color',
    'personality',
    'age',
    'health_state',
    'allergies',
    'special_condition',
    'notes',
    'vaccines',
  ]

  const handleVaccineInputChange = (e, index, attributeName) => {
    const { value } = e.target
    const updatedVaccines = [...editedPet.vaccines]
    updatedVaccines[index] = {
      ...updatedVaccines[index],
      [attributeName]: value,
    }
    setEditedPet({
      ...editedPet,
      vaccines: updatedVaccines,
    })
  }

  const renderInput = (fieldName) => (
    <div className='flex flex-row flex-wrap h-12 mx-2' key={fieldName}>
      <label htmlFor={fieldName} className='font-bold w-44'>
        {fieldName}
      </label>


      {fieldName == 'vaccines' ? (
        <input
        type='text'
        id={fieldName}
        name={fieldName}
        onChange={(e) => handleInputChange(e)}
        value={editedPet.vaccines.map(vaccine => vaccine.name).join(', ')}
        readOnly={!isEditing}
        className={`mx-8 ${isEditing ? 'bg-blue-100' : ''}`}
      />
      
      ) : (
        <input
        type='text'
        id={fieldName}
        name={fieldName}
        onChange={(e) => handleInputChange(e)}
        value={editedPet[fieldName]}
        readOnly={!isEditing}
        className={`mx-8 ${isEditing ? 'bg-blue-100' : ''}`}
      />
      )}
    </div>
  )

  const renderedFields = fields.map(renderInput)

  return (
    <div className='flex flex-col md:flex-row items-center justify-center'>
      <div className='flex flex-col md:ml-20 items-center'>
        <span className='text-5xl px-16 pt-4 mt-8'> {editedPet.name} </span>
        <img
          className='h-96 w-96 object-scale-down'
          src={editedPet.picture}
          alt={editedPet.name}
        />
      </div>

      <div className='flex flex-row text-lg p-8 items-center justify-center flex-wrap flex-1'>
        {renderedFields}

        <div className='m-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2'
            onClick={isEditing ? handleConfirmClick : handleEditClick}
          >
            {isEditing ? 'Confirmar' : 'Editar'}
          </button>

          {isEditing && (
            <button
              className='bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md'
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
          )}

          {!isEditing && (
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md ml-2'
              onClick={handleDeleteClick}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailedPet
