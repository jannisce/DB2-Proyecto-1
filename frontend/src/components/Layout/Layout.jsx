import React from 'react'
import Header from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

const Layout = ( {children} ) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  )
}

export default Layout