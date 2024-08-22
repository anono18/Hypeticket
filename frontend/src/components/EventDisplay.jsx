import React from 'react';

const EventDisplay = (props) => {
    const { event } = props;

    return (
        <section className='w-full h-[80vh] flex justify-center items-center'>
            <div className='relative w-full h-full flex justify-center items-center'>
                <img 
                    src={event.image} 
                    alt="bigImg" 
                    className='max-h-full max-w-full object-contain rounded-sm bg-slate-50' 
                />
            </div>
        </section>
    );
}

export default EventDisplay;
