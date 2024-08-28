import React from 'react'
import {RiInstagramFill, RiTiktokFill, RiTwitterXFill, RiYoutubeFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const SocialIcons = () => {
  return (
    <div className='flex gap-6 pr-4'>
        <Link to={''} className='text-[#f70202] text-2xl hover:translate-y-1 duration-500'><RiYoutubeFill/></Link>
        <Link to={''} className='text-[#050505] text-2xl hover:translate-y-1 duration-500'><RiTwitterXFill/></Link>
        <Link to={''} className='text-[#e93260] text-2xl hover:translate-y-1 duration-500'><RiInstagramFill/></Link>
        <Link to={''} className='text-[#160516] text-2xl hover:translate-y-1 duration-500'><RiTiktokFill/></Link>
    </div>
  )
}

export default SocialIcons
