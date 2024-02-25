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
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    })
  }

  const fields = [
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
  

  const renderInput = (fieldName) => {
    if (fieldName === 'owner_name' || fieldName === 'owner_address' || fieldName === 'owner_phone' || fieldName === 'owner_email') {
      return null // Ignorar campos del propietario
    }
  
    return (
      <div className='flex flex-row flex-wrap h-12 mx-2' key={fieldName}>
        <label htmlFor={fieldName} className='font-bold w-44'>
          {fieldName}
        </label>
        <input
          type={fieldName === 'age' || fieldName === 'weight' ? 'number' : 'text'}
          id={fieldName}
          name={fieldName}
          onChange={handleInputChange}
          value={editedPet[fieldName]}
          readOnly={!isEditing}
          className={`mx-8 ${isEditing ? 'bg-blue-100' : ''}`}
        />
      </div>
    )
  }
  

  const renderedFields = fields.map(renderInput)

  return (
    <div>
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <div className='flex flex-col md:ml-20 items-center'>
          <span className='text-5xl px-16 pt-4 mt-8'> {editedPet.name} </span>
          <img
            className='h-96 w-96 object-scale-down'
            src={editedPet.picture}
            alt={editedPet.name}
          />
        </div>

        <div className='flex flex-row text-lg items-center justify-center flex-wrap flex-1'>
          {renderedFields}
        </div>
      </div>
      <div className='card'>
        <div className='card-header text-lg'>Owner Details</div>
        <div className='card-body'>
          <div><strong>Name:</strong> {editedPet.owner_name}</div>
          <div><strong>Address:</strong> {editedPet.owner_address}</div>
          <div><strong>Phone:</strong> {editedPet.owner_phone}</div>
          <div><strong>Email:</strong> {editedPet.owner_email}</div>
        </div>
      </div>
      <div className='flex justify-end mt-4 mr-8'>
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
  )
}

export default DetailedPet
