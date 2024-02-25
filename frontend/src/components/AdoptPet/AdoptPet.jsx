import React, { useState, useRef } from 'react'
import axios from 'axios'

import { API_URL } from '../../data/constants'

const AdoptPet = ({ pet }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [owner, setOwner] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  })
  const modalRef = useRef()

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOwner({
      ...owner,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const shouldAdopt = window.confirm(
      `¿Estás seguro de que quieres adoptar a ${pet.name}?`
    )

    if (shouldAdopt) {
      try {
        // Enviar los detalles del propietario al servidor
        const responseOwner = await axios.post(`${API_URL}/owners/`, owner)

        // Manejar la respuesta del servidor
        console.log('Respuesta del servidor (Owner):', responseOwner.data)

        // Actualizar el atributo 'owner' de la mascota 'pet'
        const updatedPet = {
          ...pet,
          owner: responseOwner.data._id,
        }

        // Enviar la actualización al servidor para la adopción de la mascota
        const responseAdoption = await axios.put(
          `${API_URL}/pets/${pet._id}`,
          updatedPet
        )

        // Manejar la respuesta de la adopción
        console.log('Respuesta del servidor (Adopción):', responseAdoption.data)

        // Limpiar el formulario
        setOwner({
          name: '',
          address: '',
          phone: '',
          email: '',
        })

        // Luego puedes cerrar el modal si lo deseas
        toggleModal()
      } catch (error) {
        // Manejar errores en caso de que la solicitud falle
        console.error('Error:', error)
      }
    }
  }

  return (
    <div className='flex items-center justify-center'>
      {/* Botón flotante */}
      <button
        className='absolute bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold py-4 px-8 rounded-full shadow-lg z-10'
        onClick={toggleModal}
      >
        Adopt
      </button>

      {/* Modal */}
      {modalOpen && (
        <div
          className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-20'
          onClick={handleCloseModal}
        >
          <div ref={modalRef} className='bg-white p-8 rounded-lg shadow-lg'>
            {/* Contenido del modal */}
            <h2 className='text-2xl font-bold mb-4'>Adoption Form</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-lg font-semibold mb-1'
                >
                  Name:
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={owner.name}
                  onChange={handleInputChange}
                  required
                  className='w-full border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='address'
                  className='block text-lg font-semibold mb-1'
                >
                  Address:
                </label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={owner.address}
                  onChange={handleInputChange}
                  required
                  className='w-full border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='phone'
                  className='block text-lg font-semibold mb-1'
                >
                  Phone:
                </label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={owner.phone}
                  onChange={handleInputChange}
                  required
                  className='w-full border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-lg font-semibold mb-1'
                >
                  Email:
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={owner.email}
                  onChange={handleInputChange}
                  required
                  className='w-full border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdoptPet
