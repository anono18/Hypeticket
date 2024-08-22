import React from 'react'

const Start = () => {
    return (
        <section className='bg-blue-950 bg-grid-pattern'>

            <div className='relative flex flex-col items-center border border-solid border-white bg-gray-800 p-10 rounded-lg w-full max-w-4xl mx-auto'>
                <span className='text-white text-center text-lg font-bold mb-6'>
                    "Prêt à commencer ? Cliquez sur 'Démarrer' pour vous connecter et accéder à votre espace."
                </span>


            </div><br /><br />
            <div className="shimmer-button-container">
                <button className="shimmer-button">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
                        Démarrer
                    </span>
                </button>
            </div>




        </section>
    )
}

export default Start