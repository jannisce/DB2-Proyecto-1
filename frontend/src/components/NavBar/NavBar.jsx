import React from 'react'
import { Link } from 'react-router-dom'
import { NAV_BAR } from '../../data/constants'
import './NavBar.scss' 

const NavBar = () => {
  const style = 'text-gray-800 hover:text-gray-600'

  return (
    <div className='flex items-center justify-between bg-tropical_indigo-700 shadow-md'>
      <img src="/logo2.svg" alt="Logo" className="logo w-15 pl-7" style={{ height: '9rem' }} />
      <nav className='flex items-center justify-between px-14 py-8 bg-tropical_indigo-700'>
        <div className='flex space-x-16 text-2xl'>
          {NAV_BAR.map((item) => (
            <Link to={item.path} className={style} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
