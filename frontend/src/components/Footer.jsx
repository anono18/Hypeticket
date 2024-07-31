import React from 'react'
import Navbar from './Navbar'
// import SocialIcons from './SocialIcons'
// import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'


export const Footer = () => {
  return (
    <footer className='max-padd-container bg-slate-900 py-8'>
      <div className='flexCenter flex-col gap-y-4'>
        {/**logo */}
        <Link to="/" className="flex items-center gap-x-2">
          {/* <img src={logo} alt="logoImg" height={31} width={31} /> */}
          <span className="bold-24 hidden xs:flex "><span className="text-secondary text-2xl">HYPE</span>-<span className="text-secondary text-2xl">TICKETS</span></span>
          </Link>
        {/**navbar */}
        <div className='py-4'>
          <Navbar containerStyles="flex gap-x-5 xl:gap-x-10  text-white medium-15 rounded-full px-2 py-1" />
        </div>
        {/* <SocialIcons/> */}
        <hr className='h6[1px] w-2/3 my-3' />
        <div className='text-white'>Copyright &copy; HYPE-TICKET made by <span className='rainbow-text'>A-A </span>| All right reserved </div>
      </div>
    </footer>
  )
}
export default Footer