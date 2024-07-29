import React, { useState, useEffect } from 'react';
import Item from './Item'

const NewEvents = () => {
    const [new_collection, setnew_collection] = useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/newcollection').then((Response)=>Response.json()).then((data)=> setnew_collection(data));
  },[])

    return (
        <section className='bg-blue-950'>
            {/* le container */}
            <div className='large-container'>
                {/* comment va s'afficher les evenements */}
                <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32 shadow-2xl rounded-xl'>
                    {new_collection.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            ticket_Price={item.ticket_Price}
                            category={item.category}
                            date_event={item.date_event}
                            lieu={item.lieu}
                            timeEvent={item.timeEvent}
                        />))}
                </div>
            </div>
        </section>
    )
}

export default NewEvents