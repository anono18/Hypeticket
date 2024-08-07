import React from 'react'
import { TbArrowRight } from 'react-icons/tb'

const EventHd = (props) => {

    const {event} = props;

  return (
    <div className='max-padd-container flex items-center flex-wrap gap-x-1 medium-14 py-2 capitalize bg-primary'>Home <TbArrowRight /> Shop <TbArrowRight /> { event.category } <TbArrowRight /> { event.name } </div>
  )
}

export default EventHd