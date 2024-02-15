import React from 'react'
import { Link } from 'react-router-dom'
import { NAV_BAR } from '../../data/constants'

const NavBar = () => {
  const style = 'text-gray-800 hover:text-gray-600'

  return (
    <nav className='flex items-center justify-between px-12 pt-8 bg-white shadow-md'>
      {/* LOGO GOES HERE */}
      <h1 className='text-4xl font-bold text-gray-800'>ADOGTA</h1>

      <div className='flex space-x-16 text-2xl'>
        {NAV_BAR.map((item) => (
          <Link to={item.path} className={style} key={item.name}>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
