import React from 'react'

const HeroSection = () => {
  return (
    <div className='bg-white overflow-hidden relative px-32 py-12'>
      <div className='text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20'>
        <h2 className='text-3xl font-extrabold text-black sm:text-4xl'>
          <span className='block'>Adopt a Friend for Life</span>
          <span className='block text-indigo-500'>Today is the day.</span>
        </h2>
        <p className='text-xl mt-4 text-gray-400'>
          Our shelter is full of furry friends eagerly waiting for a
          home where they can share their joy and companionship.
        </p>
        <div className='lg:mt-0 lg:flex-shrink-0'>
          <div className='mt-12 inline-flex rounded-md shadow'>
            <button
              type='button'
              className='py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
              onClick={() => {  }}
            >
              Find your friend
            </button>
          </div>
        </div>
      </div>
      <img
        src='https://img.freepik.com/foto-gratis/perro-pug-aislado-fondo-blanco_2829-11421.jpg'
        className='absolute top-0 right-0 h-full max-w-1/2 lg:block'
      />
    </div>
  )
}

export default HeroSection
