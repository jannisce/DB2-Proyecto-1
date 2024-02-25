import React, { useState } from 'react'
import axios from 'axios'

import Layout from '../components/Layout/Layout'

import { API_URL } from '../data/constants'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    picture: '',
    breed: '',
    weight: '',
    size: '',
    diet: '',
    color: '',
    personality: '',
    age: '',
    health_state: '',
    allergies: '',
    special_condition: '',
    notes: '',
    vaccines: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    const shouldAdd = window.confirm(
      `¿Estás seguro de que quieres agregar la mascota?`
    )

    if (shouldAdd) {
      e.preventDefault()
      try {
        const response = await axios.post(`${API_URL}/pets`, formData)
        console.log('Pet registered successfully:', response.data)
        alert('Pet registered successfully')

        setFormData({
          name: '',
          picture: '',
          breed: '',
          weight: '',
          size: '',
          diet: '',
          color: '',
          personality: '',
          age: '',
          health_state: '',
          allergies: '',
          special_condition: '',
          notes: '',
          vaccines: '',
        })
      } catch (error) {
        console.error('Error registering pet:', error)
        alert('Error registering pet:', error.message)
      }
    }
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

  return (
    <Layout>
      <div className='p-8 my-14 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Register a Pet</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field} className='mb-4'>
              <label htmlFor={field} className='font-bold mr-2'>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type='text'
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1'
              />
            </div>
          ))}
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md'
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default RegisterPage
