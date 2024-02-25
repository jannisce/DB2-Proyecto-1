import React from 'react'
import { Link } from 'react-router-dom'

const PetCard = ({ pet, ...props }) => {
  return (
    <Link
      to={pet._id}
      className='group relative block overflow-hidden p-8 m-4 shadow'
      {...props}
    >
      <img
        src={pet.picture}
        // src='./pogo.jpg'
        alt='perro'
        className='h-56 w-72 p-2 object-scale-down transition duration-500 group-hover:scale-105 '
      />

      <div className='relative border border-gray-100 bg-white p-6'>
        <span className='whitespace-nowrap bg-yellow-400 px-3 py-1.5 font-medium text-lg'>
          {' '}
          {pet.breed}{' '}
        </span>

        <h3 className='mt-4 text-4xl font-medium text-gray-900'>{pet.name}</h3>

        <p className='mt-1.5 text-gray-700 text-xl'>Age: {pet.age}</p>

        <form className='mt-4'>
          <button className='block w-full rounded bg-yellow-400 p-4 text-xl font-bold  transition hover:scale-105'>
            Get more info
          </button>
        </form>
      </div>
    </Link>
  )
}

export default PetCard
