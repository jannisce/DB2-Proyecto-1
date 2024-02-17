import React from 'react'

const Loader = ( {text} ) => {
  return (
    <div className='text-4xl flex items-center justify-center w-auto h-auto p-80 '>
      {text}
    </div>
  )
}

export default Loader
