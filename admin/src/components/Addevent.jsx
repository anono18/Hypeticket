// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage, faSave } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Addevent = () => {
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [tickets, setTickets] = useState([{ type: '', price: '', availability: '' }]);
//   const [supportContact, setSupportContact] = useState('');
//   const [dateEvent, setDateEvent] = useState('');
//   const [lieu, setLieu] = useState('');
//   const [organizer, setOrganizer] = useState('');
//   const [timeEvent, setTimeEvent] = useState('');
//   const [eventWebsite, setEventWebsite] = useState('');
//   const [storedEvent, setStoredEvent] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const eventFromState = location.state?.event;
//     if (eventFromState) {
//       setStoredEvent(eventFromState);
//       setName(eventFromState.name || '');
//       setCategory(eventFromState.category || '');
//       setDescription(eventFromState.description || '');
//       setTickets(eventFromState.tickets || [{ type: '', price: '', availability: '' }]);
//       setSupportContact(eventFromState.supportContact || '');
//       setDateEvent(eventFromState.date_event || '');
//       setLieu(eventFromState.lieu || '');
//       setOrganizer(eventFromState.organizer || '');
//       setTimeEvent(eventFromState.timeEvent || '');
//       setEventWebsite(eventFromState.eventWebsite || '');
//       setImage(eventFromState.image);
//     }
//   }, [location.state]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const handleTicketChange = (index, e) => {
//     const { name, value } = e.target;
//     const newTickets = [...tickets];
//     newTickets[index][name] = value;
//     setTickets(newTickets);
//   };

//   const addTicket = () => {
//     setTickets([...tickets, { type: '', price: '', availability: '' }]);
//   };

//   const removeTicket = (index) => {
//     const newTickets = tickets.filter((_, i) => i !== index);
//     setTickets(newTickets);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     if (image instanceof File) {
//       formData.append('product', image);
//     }
//     formData.append('name', name);
//     formData.append('category', category);
//     formData.append('description', description);
//     formData.append('tickets', JSON.stringify(tickets));
//     formData.append('supportContact', supportContact);
//     formData.append('date_event', dateEvent);
//     formData.append('lieu', lieu);
//     formData.append('organizer', organizer);
//     formData.append('timeEvent', timeEvent);
//     formData.append('eventWebsite', eventWebsite);

//     let imageUrl = '';
//     if (image instanceof File) {
//       const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       imageUrl = imageResponse.data.image_url;
//     }

//     const eventData = {
//       name,
//       image: imageUrl || image,
//       category,
//       description,
//       tickets,
//       supportContact,
//       date_event: dateEvent,
//       lieu,
//       organizer,
//       timeEvent,
//       eventWebsite,
//     };

//     if (storedEvent) {
//       await axios.put(`http://localhost:4000/events/${storedEvent.id}`, eventData);
//       alert('Événement mis à jour!');
//     } else {
//       const response = await axios.post('http://localhost:4000/addevent', eventData);
//       if (response.data.success) {
//         navigate(`/add-tickets/${response.data.eventId}`);
//       } else {
//         alert('Erreur lors de l\'ajout de l\'événement');
//       }
//     }
//   };

//   return (
//     <div className="flex bg-blue-50">
//       <div className="flex-1 p-8">
//         <h1 className="text-2xl font-bold mb-6">{storedEvent ? 'Modifier l\'événement' : 'Ajouter un nouvel événement'}</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col items-center space-y-4">
//             <label className="cursor-pointer">
//               <div className="w-80 h-40 bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
//                 {image && image instanceof File ? (
//                   <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
//                 ) : (
//                   <img src={image} alt="Event" className="w-full h-full object-cover rounded-lg" />
//                 )}
//               </div>
//               <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//             </label>
//           </div>
//           <div className="flex flex-col space-y-4">
//             <input
//               type="text"
//               placeholder="Nom de l'événement"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Catégorie"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <textarea
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             {/* Ajoutez ici les autres champs comme les tickets, le supportContact, etc. */}
//             <input
//               type="text"
//               placeholder="Contact Support"
//               value={supportContact}
//               onChange={(e) => setSupportContact(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="date"
//               placeholder="Date de l'événement"
//               value={dateEvent}
//               onChange={(e) => setDateEvent(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Lieu de l'événement"
//               value={lieu}
//               onChange={(e) => setLieu(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Organisateur"
//               value={organizer}
//               onChange={(e) => setOrganizer(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Heure de l'événement"
//               value={timeEvent}
//               onChange={(e) => setTimeEvent(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Site web de l'événement"
//               value={eventWebsite}
//               onChange={(e) => setEventWebsite(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center"
//             >
//               <FontAwesomeIcon icon={faSave} className="mr-2" />
//               {storedEvent ? 'Mettre à jour' : 'Ajouter'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addevent;


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Addevent = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState([{ type: '', price: '', availability: '' }]);
  const [supportContact, setSupportContact] = useState('');
  const [dateEvent, setDateEvent] = useState('');
  const [lieu, setLieu] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [timeEvent, setTimeEvent] = useState('');
  const [eventWebsite, setEventWebsite] = useState('');
  const [storedEvent, setStoredEvent] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const eventFromState = location.state?.event;
    if (eventFromState) {
      setStoredEvent(eventFromState);
      setName(eventFromState.name || '');
      setCategory(eventFromState.category || '');
      setDescription(eventFromState.description || '');
      setTickets(eventFromState.tickets || [{ type: '', price: '', availability: '' }]);
      setSupportContact(eventFromState.supportContact || '');
      setDateEvent(eventFromState.date_event || '');
      setLieu(eventFromState.lieu || '');
      setOrganizer(eventFromState.organizer || '');
      setTimeEvent(eventFromState.timeEvent || '');
      setEventWebsite(eventFromState.eventWebsite || '');
      setImage(eventFromState.image);
    }
  }, [location.state]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const newTickets = [...tickets];
    newTickets[index][name] = value;
    setTickets(newTickets);
  };

  const addTicket = () => {
    setTickets([...tickets, { type: '', price: '', availability: '' }]);
  };

  const removeTicket = (index) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    setTickets(newTickets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image instanceof File) {
      formData.append('product', image);
    }
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('tickets', JSON.stringify(tickets));
    formData.append('supportContact', supportContact);
    formData.append('date_event', dateEvent);
    formData.append('lieu', lieu);
    formData.append('organizer', organizer);
    formData.append('timeEvent', timeEvent);
    formData.append('eventWebsite', eventWebsite);

    let imageUrl = '';
    if (image instanceof File) {
      const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      imageUrl = imageResponse.data.image_url;
    }

    const eventData = {
      name,
      image: imageUrl || image,
      category,
      description,
      tickets,
      supportContact,
      date_event: dateEvent,
      lieu,
      organizer,
      timeEvent,
      eventWebsite,
    };

    if (storedEvent) {
      await axios.put(`http://localhost:4000/events/${storedEvent.id}`, eventData);
      alert('Événement mis à jour!');
    } else {
      const response = await axios.post('http://localhost:4000/addevent', eventData);
      if (response.data.success) {
        navigate(`/add-tickets/${response.data.eventId}`);
      } else {
        alert('Erreur lors de l\'ajout de l\'événement');
      }
    }
  };

  return (
    <div className="flex bg-blue-50">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">{storedEvent ? 'Modifier l\'événement' : 'Ajouter un nouvel événement'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <label className="cursor-pointer">
              <div className="w-80 h-40 bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
                {image ? (
                  image instanceof File ? (
                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <img src={image} alt="Event" className="w-full h-full object-cover rounded-lg" />
                  )
                ) : (
                  <FontAwesomeIcon icon={faCameraRetro} size="3x" style={{ color: '#1c7ed6' }} />
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Nom de l'événement"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Contact Support"
              value={supportContact}
              onChange={(e) => setSupportContact(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="date"
              placeholder="Date de l'événement"
              value={dateEvent}
              onChange={(e) => setDateEvent(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Lieu de l'événement"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Organisateur"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Heure de l'événement"
              value={timeEvent}
              onChange={(e) => setTimeEvent(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Site web de l'événement"
              value={eventWebsite}
              onChange={(e) => setEventWebsite(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              {storedEvent ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addevent;

