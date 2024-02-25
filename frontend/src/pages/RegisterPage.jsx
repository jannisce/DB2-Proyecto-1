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
          owner: null,
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
  ]

  return (
    <Layout>
      <div className='p-8 my-14 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Register a Pet</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field} className='mb-4'>
              <label
                htmlFor={field}
                className='relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600'
              >
                <input
                  type='text'
                  id={field}
                  name={field}
                  placeholder={formData[field]}
                  value={formData[field]}
                  onChange={handleChange}
                  className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
                />

                <span className='absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs'>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </span>
              </label>
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
