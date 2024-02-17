import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../components/Layout/Layout'
import PetCard from '../components/PetCard/PetCard'

import { API_URL } from '../data/constants'

const AdoptPage = () => {
  const [pets, setPets] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/pets`)
        setPets(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <Layout>
      <div className='p-8 my-14 bg-white'>
        <p className='text-4xl font-bold text-center text-gray-800 mb-4'>
          Adopt a pet
        </p>
        <p className='mb-10 text-2xl font-normal text-center text-gray-500'>
          Find your new best friend.
        </p>

        <div className='flex flex-col md:flex-row items-center justify-center flex-wrap'>
          {pets.map((pet) => (
            <PetCard
              key={pet._id}
              name={pet.name}
              age={pet.age}
              breed={pet.breed}
              image={pet.picture}
              pet_id={pet._id}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default AdoptPage