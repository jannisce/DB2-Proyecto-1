import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout/Layout'
import PetCard from '../components/PetCard/PetCard'
import { API_URL } from '../data/constants'
import Loader from '../components/Loader/Loader'

const AdoptPage = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ age: '', weight: '', breed: '' , owner_id: ''})
  const [sortByAgeAsc, setSortByAgeAsc] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(6) 

  // Define fetchData method
  const fetchData = async () => {
    setLoading(true)
    try {
      let url = `${API_URL}/pets`
      let queryParams = []
      
      if (filters.age) queryParams.push(`age=${filters.age}`)
      if (filters.weight) queryParams.push(`weight=${filters.weight}`)
      if (filters.breed) queryParams.push(`breed=${filters.breed}`)
      if (filters.owner_id) queryParams.push(`owner_id=${filters.owner_id}`)
      if (sortByAgeAsc !== null) {
        queryParams.push(`sort=${sortByAgeAsc ? 'asc' : 'desc'}`)
      }

      // Agregar parámetros de paginación a la URL
      queryParams.push(`page=${currentPage}`)
      queryParams.push(`limit=${perPage}`)

      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`
      }
  
      const response = await axios.get(url)
      setTimeout(() => {
        setPets(response.data)
        setLoading(false)
      }, 250)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filters, sortByAgeAsc, currentPage, perPage])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  const toggleSortByAge = () => {
    setSortByAgeAsc((prevValue) => !prevValue)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  return (
    <Layout>
      <div className="p-8 my-14 bg-white">
        <p className="text-4xl font-bold text-center text-gray-800 mb-4">Adopt a pet</p>
        <p className="mb-10 text-2xl font-normal text-center text-gray-500">Find your new best friend.</p>

        <div className="flex flex-col md:flex-row items-center justify-center flex-wrap mb-6">
          <input
            type="text"
            name="age"
            value={filters.age}
            onChange={handleFilterChange}
            placeholder="Age"
            className="border rounded-lg px-4 py-2 mb-2 md:mb-0 md:mr-4"
          />
          <input
            type="text"
            name="weight"
            value={filters.weight}
            onChange={handleFilterChange}
            placeholder="Weight"
            className="border rounded-lg px-4 py-2 mb-2 md:mb-0 md:mr-4"
          />
          <input
            type="text"
            name="breed"
            value={filters.breed}
            onChange={handleFilterChange}
            placeholder="Breed"
            className="border rounded-lg px-4 py-2"
          />
          <button
            onClick={() => {
              setFilters((prevFilters) => ({
                ...prevFilters,
                owner_id: prevFilters.owner_id === 'null' ? '' : 'null',
              }));
            }}
            className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            {filters.owner_id === 'null' ? 'Show Pets with Owner' : 'Show Pets without Owner'}
          </button>

          <button
            onClick={toggleSortByAge}
            className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Sort by Age {sortByAgeAsc ? '▲' : '▼'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center flex-wrap">
          {loading ? (
            <Loader text="Loading ..." />
          ) : pets.length > 0 ? (
            pets.map((pet) => <PetCard pet={pet} key={pet._id} />)
          ) : (
            <p className="text-center">No pets found</p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1} 
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={pets.length < perPage}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default AdoptPage
