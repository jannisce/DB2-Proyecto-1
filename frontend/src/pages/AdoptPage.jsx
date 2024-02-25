import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../components/Layout/Layout'
import PetCard from '../components/PetCard/PetCard'

import { API_URL } from '../data/constants'
import Loader from '../components/Loader/Loader'

const AdoptPage = () => {
  const [pets, setPets] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/pets`)
        setTimeout(() => {
          setPets(response.data)
          setLoading(false)
        }, 250)
      } catch (error) {
        setLoading(false)
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
          {loading ? (
            <Loader text='Loading ... ' />
          ) : pets ? (
            pets.map((pet) => (
              <PetCard
                pet={pet}
                key={pet._id}
              />
            ))
          ) : (
            <Loader text='Error fetching data ... ' />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default AdoptPage
