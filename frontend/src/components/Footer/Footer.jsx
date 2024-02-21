import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-50 flex-shrink-0'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col justify-between min-h-screen'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='flex justify-center text-black sm:justify-start'>
            ADOGPT
          </div>

          <p className='mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right'>
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
