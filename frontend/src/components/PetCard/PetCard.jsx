import React from 'react'
import { Link } from 'react-router-dom'

const PetCard = ({ name, age, breed, image, pet_id }) => {
  return (
    <Link
      to={pet_id}
      className='group relative block overflow-hidden p-8 m-4 shadow'
    >
      <img
        src={image}
        // src='./pogo.jpg'
        alt='perro'
        className='h-56 w-72 p-2 object-scale-down transition duration-500 group-hover:scale-105 '
      />

      <div className='relative border border-gray-100 bg-white p-6'>
        <span className='whitespace-nowrap bg-yellow-400 px-3 py-1.5 font-medium text-lg'>
          {' '}
          {breed}{' '}
        </span>

        <h3 className='mt-4 text-4xl font-medium text-gray-900'>{name}</h3>

        <p className='mt-1.5 text-gray-700 text-xl'>Age: {age}</p>

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
