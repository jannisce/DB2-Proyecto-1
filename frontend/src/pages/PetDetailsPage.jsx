import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import { API_URL } from '../data/constants'

import Layout from '../components/Layout/Layout'
import Loader from '../components/Loader/Loader'
import DetailedPet from '../components/PetCard/DetailedPet'
import AdoptPet from '../components/AdoptPet/AdoptPet'
import PetVaccines from '../components/PetVaccines/PetVaccines'

const PetDetailsPage = () => {
  const { _id } = useParams()

  const [pet, setPet] = useState()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/pets/${_id}`)
        setTimeout(() => {
          setPet(response.data)
          setLoading(false)
        }, 250)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }

    fetchData()
  }, [_id])


  return (
    <Layout>
      <div className='p-8 my-14 bg-white flex items-center flex-col'>
        <p className='text-4xl font-bold text-center text-gray-800 mb-4'>
          Pet Details
        </p>
        {/* <p className='mb-10 text-2xl font-normal text-center text-gray-500'>
          Meet your new best friend.
        </p> */}

        {loading ? (
          <Loader text='Loading ... ' />
        ) : pet ? (
          <>
            <DetailedPet pet={pet} />
            <div className="flex justify-between w-1/3">
              <AdoptPet pet={pet} />
              <PetVaccines pet={pet} />
            </div>
          </>
        ) : (
          <Loader text='Error fetching data ... ' />
        )}

        
      </div>
    </Layout>
  )
}

export default PetDetailsPage
