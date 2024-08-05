import React from 'react'

const Start = () => {
    return (
        <section className='bg-blue-950'>
            
            <div className='relative flex flex-col items-center border border-solid border-white bg-gray-800 p-10 rounded-lg w-full max-w-4xl mx-auto'>
                <span className='text-white text-center text-lg font-bold mb-6'>
                    "Prêt à commencer ? Cliquez sur 'Démarrer' pour vous connecter et accéder à votre espace."
                </span>
                <button className='text-white py-3 px-6 border border-orange-700 shadow-2xl rounded-3xl bg-secondary' onClick={() => window.location.href = '/Login'} >
                    Démarrer
                </button>
            </div><br /><br />

        </section>
    )
}

export default Start