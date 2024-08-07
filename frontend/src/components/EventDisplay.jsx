import React from 'react';

const EventDisplay = (props) => {
    const { event } = props;

    return (
        <section className='w-full h-[80vh]'>
            <div className='relative w-full h-full '>
                <img src={event.image} alt="bigImg" className='absolute flex justify-center top-1 rounded-sm  h-full w-auto object-fill bg-slate-50' />
            </div>
        </section>
    );
}

export default EventDisplay;
