import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import NewEvents from '../components/NewEvents'
import Utilities from '../components/Utilities'
import Start from '../components/Start'


const home = () => {
  return (
    <>
      <Header />
      <Hero />
      <NewEvents />
      <Utilities/>
      <Start />
      <Footer />
    </>
  )
}

export default home
