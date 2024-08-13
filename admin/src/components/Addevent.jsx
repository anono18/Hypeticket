// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage, faSave } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

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

//   useEffect(() => {
//     const eventFromStorage = JSON.parse(localStorage.getItem('event'));
//     if (eventFromStorage) {
//       setStoredEvent(eventFromStorage);
//       setName(eventFromStorage.name || '');
//       setCategory(eventFromStorage.category || '');
//       setDescription(eventFromStorage.description || '');
//       setTickets(eventFromStorage.tickets || [{ type: '', price: '', availability: '' }]);
//       setSupportContact(eventFromStorage.supportContact || '');
//       setDateEvent(eventFromStorage.date_event || '');
//       setTimeEvent(eventFromStorage.timeEvent || '');
//       setLieu(eventFromStorage.lieu || '');
//       setOrganizer(eventFromStorage.organizer || '');
//       setEventWebsite(eventFromStorage.eventWebsite || '');
//       if (typeof eventFromStorage.image === 'string') {
//         setImage(eventFromStorage.image);
//       }
//     }
//   }, []);

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
//     formData.append('tickets', JSON.stringify(tickets));  // Ajout de tickets sous forme de chaîne JSON
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
//       tickets,  // Inclure les tickets dans les données de l'événement
//       supportContact,
//       date_event: dateEvent,
//       lieu,
//       organizer,
//       timeEvent,
//       eventWebsite,
//     };

//     await axios.post('http://localhost:4000/addevent', eventData);
//     alert('Événement ajouté!');
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     if (image instanceof File) {
//       formData.append('product', image);
//     }
//     formData.append('name', name);
//     formData.append('category', category);
//     formData.append('description', description);
//     formData.append('tickets', JSON.stringify(tickets));  // Ajout de tickets sous forme de chaîne JSON
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
//       tickets,  // Inclure les tickets dans les données de l'événement
//       supportContact,
//       date_event: dateEvent,
//       lieu,
//       organizer,
//       timeEvent,
//       eventWebsite,
//     };

//     await axios.put(`http://localhost:4000/api/events/${storedEvent.id}`, eventData);
//     alert('Événement mis à jour!');
//   };

//   return (
//     <div className="flex">
//       <div className="flex-1 p-8">
//         {!storedEvent ? <h1 className="text-2xl font-bold mb-6">Add New Event</h1> : <h1 className="text-2xl font-bold mb-6">Update Event</h1>}
//         <form onSubmit={storedEvent ? handleUpdate : handleSubmit} className="space-y-6">
//           <div className="flex flex-col items-center space-y-4">
//             <label className="cursor-pointer">
//               <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
//                 {image && image instanceof File ? (
//                   <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
//                 ) : (
//                   <FontAwesomeIcon icon={faImage} size="3x" className="text-gray-500" />
//                 )}
//               </div>
//               <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//             </label>
//           </div>
//           <div className="flex flex-col space-y-4">
//             <input
//               type="text"
//               placeholder="Event Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Category"
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
//             {tickets.map((ticket, index) => (
//               <div key={index} className="flex flex-col space-y-4">
//                 <input
//                   type="text"
//                   name="type"
//                   placeholder="Ticket Type"
//                   value={ticket.type}
//                   onChange={(e) => handleTicketChange(index, e)}
//                   className="border border-gray-300 rounded-lg p-2"
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="Ticket Price"
//                   value={ticket.price}
//                   onChange={(e) => handleTicketChange(index, e)}
//                   className="border border-gray-300 rounded-lg p-2"
//                 />
//                 <input
//                   type="number"
//                   name="availability"
//                   placeholder="Ticket Availability"
//                   value={ticket.availability}
//                   onChange={(e) => handleTicketChange(index, e)}
//                   className="border border-gray-300 rounded-lg p-2"
//                 />
//                 {tickets.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeTicket(index)}
//                     className="text-red-500"
//                   >
//                     Remove Ticket
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addTicket}
//               className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
//             >
//               Add Another Ticket
//             </button>
//             <input
//               type="text"
//               placeholder="Support Contact"
//               value={supportContact}
//               onChange={(e) => setSupportContact(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="date"
//               placeholder="Event Date"
//               value={dateEvent}
//               onChange={(e) => setDateEvent(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Event Location"
//               value={lieu}
//               onChange={(e) => setLieu(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Organizer"
//               value={organizer}
//               onChange={(e) => setOrganizer(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Event Time"
//               value={timeEvent}
//               onChange={(e) => setTimeEvent(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="url"
//               placeholder="Event Website"
//               value={eventWebsite}
//               onChange={(e) => setEventWebsite(e.target.value)}
//               className="border border-gray-300 rounded-lg p-2"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
//           >
//             <FontAwesomeIcon icon={faSave} className="mr-2" />
//             {storedEvent ? 'Update Event' : 'Add Event'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addevent;
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const eventFromStorage = JSON.parse(localStorage.getItem('event'));
    if (eventFromStorage) {
      setStoredEvent(eventFromStorage);
      setName(eventFromStorage.name || '');
      setCategory(eventFromStorage.category || '');
      setDescription(eventFromStorage.description || '');
      setTickets(eventFromStorage.tickets || [{ type: '', price: '', availability: '' }]);
      setSupportContact(eventFromStorage.supportContact || '');
      setDateEvent(eventFromStorage.date_event || '');
      setTimeEvent(eventFromStorage.timeEvent || '');
      setLieu(eventFromStorage.lieu || '');
      setOrganizer(eventFromStorage.organizer || '');
      setEventWebsite(eventFromStorage.eventWebsite || '');
      if (typeof eventFromStorage.image === 'string') {
        setImage(eventFromStorage.image);
      }
    }
  }, []);

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
    formData.append('tickets', JSON.stringify(tickets));  // Ajout de tickets sous forme de chaîne JSON
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
      tickets,  // Inclure les tickets dans les données de l'événement
      supportContact,
      date_event: dateEvent,
      lieu,
      organizer,
      timeEvent,
      eventWebsite,
    };

    const response = await axios.post('http://localhost:4000/addevent', eventData);
    if (response.data.success) {
      // Redirection vers la page de création de tickets avec l'ID de l'événement
      navigate(`/add-tickets/${response.data.eventId}`);
    } else {
      alert('Erreur lors de l\'ajout de l\'événement');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image instanceof File) {
      formData.append('product', image);
    }
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('tickets', JSON.stringify(tickets));  // Ajout de tickets sous forme de chaîne JSON
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
      tickets,  // Inclure les tickets dans les données de l'événement
      supportContact,
      date_event: dateEvent,
      lieu,
      organizer,
      timeEvent,
      eventWebsite,
    };

    await axios.put(`http://localhost:4000/api/events/${storedEvent.id}`, eventData);
    alert('Événement mis à jour!');
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        {!storedEvent ? <h1 className="text-2xl font-bold mb-6">Add New Event</h1> : <h1 className="text-2xl font-bold mb-6">Update Event</h1>}
        <form onSubmit={storedEvent ? handleUpdate : handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <label className="cursor-pointer">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
                {image && image instanceof File ? (
                  <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <FontAwesomeIcon icon={faImage} size="3x" className="text-gray-500" />
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Category"
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
            {/* {tickets.map((ticket, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="type"
                  placeholder="Ticket Type"
                  value={ticket.type}
                  onChange={(e) => handleTicketChange(index, e)}
                  className="border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Ticket Price"
                  value={ticket.price}
                  onChange={(e) => handleTicketChange(index, e)}
                  className="border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="number"
                  name="availability"
                  placeholder="Ticket Availability"
                  value={ticket.availability}
                  onChange={(e) => handleTicketChange(index, e)}
                  className="border border-gray-300 rounded-lg p-2"
                />
                {tickets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicket(index)}
                    className="text-red-500"
                  >
                    Remove Ticket
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTicket}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
            >
              Add Another Ticket
            </button> */}
            <input
              type="text"
              placeholder="Support Contact"
              value={supportContact}
              onChange={(e) => setSupportContact(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="date"
              placeholder="Event Date"
              value={dateEvent}
              onChange={(e) => setDateEvent(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Event Location"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Organizer"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Event Time"
              value={timeEvent}
              onChange={(e) => setTimeEvent(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="url"
              placeholder="Event Website"
              value={eventWebsite}
              onChange={(e) => setEventWebsite(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            {storedEvent ? 'Update Event' : 'Add Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addevent;

