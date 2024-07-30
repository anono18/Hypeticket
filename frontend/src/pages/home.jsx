import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import NewEvents from '../components/NewEvents'
import Utilities from '../components/Utilities'


const home = () => {
  return (
    <>
      <Header />
      <Hero />
      <NewEvents />
      <Utilities/>
      <Footer />
    </>
  )
}

export default home
