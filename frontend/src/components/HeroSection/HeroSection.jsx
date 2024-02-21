import React from 'react'
import { useNavigate } from 'react-router-dom';
import './HeroSection.scss'

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <main className='bg-white overflow-hidden relative my-12 mx-24 px-8 py-12'>
      <div className='text-start md:w-3/4 py-12 px-8 sm:px-6 lg:py-16 lg:px-8 z-20'>
        <h2 className='text-6xl font-bold text-black'>
          <span className='block'>Adopt a Friend for Life</span>
          <span className='block text-indigo-500'>Today is the day.</span>
        </h2>
        <p className='text-xl mt-4 text-gray-400'>
          Our shelter is full of furry friends eagerly waiting for a
          home!<br />
        </p>
          <div className='mt-12 inline-flex rounded-md shadow'>
            <button
              type='button'
              className='py-4 px-6  bg-mint hover:bg-mint-300 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
              onClick={() => navigate('/adopt')}
            >
              Find your friend
            </button>
        </div>
      </div>
      <div className="container--center">
        <div className="dancing-pug">
          <ul>
            <li className="ear"></li>
            <li className="ear"></li>
            <li className="eye"></li>
            <li className="eye"></li>
            <li></li>
          </ul>
        </div>
      </div>
      <img
        src='./pogo.jpg'
        className='absolute top-0 right-0 h-full max-w-1/2 lg:block hidden md:block'
        alt='Adoptable Dog'
      />
    </main>
  )
}

export default HeroSection
