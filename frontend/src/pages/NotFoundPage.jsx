import React from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <main className='my-12 mx-24 px-8 py-12 py overflow-hidden bg-white'>
        <div className='container z-10 flex items-center justify-between px-4  mx-auto md:pt-0'>
          <div className='container relative flex flex-col-reverse items-center justify-between px-6 mx-auto lg:flex-row'>
            <div className='w-full mb-16 text-center md:mb-8 lg:text-left'>
              <h1 className='mt-12 text-5xl font-bold text-center text-black  lg:text-left lg:text-6xl md:mt-0'>
                Sorry, this page isn&#x27;t available
              </h1>
              <button
                className='px-2 py-2 mt-28 text-lg font-light transition duration-200 ease-in bg-yellow-300 border-2 border-gray-700 w-36 hover:bg-yellow-400 focus:outline-none'
                onClick={() => navigate('/')}
              >
                Go back home
              </button>
            </div>
            <div className='relative block w-full max-w-md mx-auto md:mt-0 lg:max-w-2xl'>
              <img src='https://www.tailwind-kit.com/images/illustrations/1.svg' />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default NotFoundPage
