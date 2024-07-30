import React from 'react'
import { faCalendarDays, faClock, faLocationDot, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';




const Item = ({ id, name, image, ticket_Price, category, date_event, lieu, timeEvent }) => {
  return (
    <div className='relative bg-white p-4 rounded-xl transition-transform transform hover:scale-105'>
      <div className='relative'>
        <img src={image} alt={name} className='rounded-lg drop-shadow-xl h-52 w-full object-cover' />
        <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity'>
          <div className='flex justify-center items-center h-full space-x-4'>
            <Link to={`/event/${id}`} className='text-white'>
              <FontAwesomeIcon icon={faEye} size='2x' />
              <p className='text-sm mt-1'>Voir Plus</p>
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h4 className='font-bold text-lg line-clamp-2'>{name}</h4>
        <p className='mt-2'>Catégorie: <span className='bg-sky-300 text-black rounded-md px-2'>{category}</span></p>
        <p className='mt-2'><FontAwesomeIcon icon={faLocationDot} /> : {lieu}</p>
        <p className='mt-2'>
          <FontAwesomeIcon icon={faCalendarDays} /> : {new Date(date_event).toLocaleDateString()} <br />
          <FontAwesomeIcon icon={faClock} /> : {timeEvent}
        </p>
        <p className='mt-2'>Ticket: {ticket_Price} FCFA</p>
      </div><br />
      <div className='bg-secondary text-white hover:bg-black px-4 py-2 rounded-lg flex justify-center items-center'>
        <button className='w-full bg-transparent border-none text-white'>
          Get Ticket
        </button>
      </div>

    </div>
  )
}

export default Item