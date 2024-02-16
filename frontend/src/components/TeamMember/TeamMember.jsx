import React from 'react'

const TeamMember = ({ name, role, imageSrc }) => {
  return (
    <div className='p-4'>
      <div className='mb-4 text-center opacity-90'>
          <img
            alt='Profile'
            src={imageSrc}
            className='mx-auto object-cover h-50 w-48'
          />
      </div>
      <div className='text-center'>
        <p className='text-2xl text-gray-800'>{name}</p>
        <p className='text-xl font-light text-gray-500'>
          {role}
        </p>
      </div>
    </div>
  )
}

export default TeamMember
