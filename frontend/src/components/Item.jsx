import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';



const Item = ({ id, name, image, ticket_Price,category ,date_event ,lieu, timeEvent}) => {
  return (
    <Link onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`} className='bg-white p-4 rounded-xl relative'>
      <div className='flexCenter'>
        <img src={image} alt="" height={210} width={210} className='rounded-lg drop-shadow-xl absolute bottom-40' />
      </div>
      <div className='flex flex-col gap-y-3 pt-24'>
        <h4 className='line-clamp-2 medium-16 bold'>{name}</h4>
        <p>Category:<span className='rounded-md border border-spacing-20 border-sky-500 bg-sky-300 opacity-15 text-black'>  {category}</span> </p>
        <p><FontAwesomeIcon icon={faLocationDot} /> :  {lieu} </p>
        <p>
        <FontAwesomeIcon icon={faCalendarDays} /> :  {date_event} <br /> <br />
        <FontAwesomeIcon icon={faClock} /> :  {timeEvent}
        </p>
        <div className='flexBetween'>
          <div className='flex gap-x-4 medium-16'>
            <span className='text-secondary'>Ticket: {ticket_Price} fcfa</span>
          </div>
        </div>
        <div className='btn-secondary flexCenter gap-x-2 medium-16 rounded-xl bg-blue-700'>
            <button>GET TICKETS</button>
        </div>
      </div>
    </Link>
  )
}

export default Item;
