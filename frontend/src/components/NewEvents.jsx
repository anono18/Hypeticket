import React, { useState, useEffect } from 'react';
import Item from './Item';
import axios from 'axios';


const NewEvents = () => {
    const [new_collection, setNewCollection] = useState([]);

    useEffect(() => {
        const fetchNewEvents = async () => {
            try {
                const response = await axios.get('http://localhost:4000/newcollection');
                // Prendre les 6 premiers événements pour afficher uniquement les nouveaux
                setNewCollection(response.data.slice(0, 6));
            } catch (error) {
                console.error('Erreur lors de la récupération des événements:', error);
            }
        };
        fetchNewEvents();
    }, []);

    return (
        <section className='bg-blue-950  py-16 bg-with-image bg-grid-pattern'>
            <div className='shine-border-container'>
                <div className='shine-border'></div>
                <div className='text-center mb-12 relative'>
                    <span className='text-3xl font-bold text-white py-1 px-4 rounded-xl shadow-xl'>
                        Les événements à venir
                    </span>
                </div>
                <div className='large-container bg-white bg-opacity-50 rounded-xl p-5 relative'>
                    <div className='grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-24 mb-48'>
                        {new_collection.map((item) => (
                            <div key={item.id} className='bg-white p-4 rounded-xl shadow-2xl'>
                                <Item
                                    id={item.id}
                                    name={item.name}
                                    image={item.image}
                                    ticket_Price={item.ticket_Price}
                                    category={item.category}
                                    date_event={item.date_event}
                                    lieu={item.lieu}
                                    timeEvent={item.timeEvent}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>    

    );
};

export default NewEvents;
