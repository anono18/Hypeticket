import React from 'react'


const Navbar = () => {
    return (
        <nav className='bg-white py-2 ring-1 ring-slate-900/5 relative  '>
            <div className='mx-auto max-w-[1440px] px-6 lg:px-20 flexBetween '>
                <span className="bold-24 hidden xs:flex "><span className="text-secondary text-2xl">HYPE</span>-<span className="text-secondary text-2xl">TICKETS</span></span>
            </div>
        </nav>
    )
}

export default Navbar