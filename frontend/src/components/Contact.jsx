import React from 'react';
import phone from "../assets/phone.gif"
import message from "../assets/message.gif"

const Contact = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
                <h1 className="text-3xl font-bold text-center mb-6">Contactez-nous</h1>
                <p className="text-center text-lg mb-6">
                    Si vous êtes organisateur d'événements et souhaitez vendre vos billets sur notre site, n'hésitez pas à nous contacter par téléphone ou par email pour discuter des opportunités de collaboration.                </p>
                <div className="flex flex-col items-center">
                    <div className="flex items-center mb-4">
                        <img src={phone} alt="" className='w-10 h-10' />
                        <span className="ml-2 text-lg text-green-900">+228 99 90 90 90</span>
                    </div>
                    <p className='underline'>ou cliquer sur le lien en bas</p>
                    <div className="flex items-center mb-4">
                        <img src={message} alt="" className='w-10 h-10' />
                        {/* <span className="ml-2 text-lg text-blue-900">contact@votresite.com</span> */}
                        <a href="mailto:adododjialban@gmail.com" className="ml-2 text-lg text-blue-900">contacter_HYPE-TICKET@Service.com</a>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;