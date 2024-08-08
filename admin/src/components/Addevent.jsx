import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const eventType = {
  image: 'file',
  name: 'text',
  category: 'text',
  description: 'text',
  ticket_Price: 'number',
  date_event: 'date',
  timeEvent: 'text',
  lieu: 'text',
  ticket_Availability: 'number',
  organizer: 'text',
  supportContact: 'number',
  eventWebsite: 'text',
};




const Addevent = () => {
  // const id  = useParams();

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [supportContact, setSupportContact] = useState('');
  const [dateEvent, setDateEvent] = useState('');
  const [ticketAvailability, setTicketAvailability] = useState('');
  const [lieu, setLieu] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [timeEvent, setTimeEvent] = useState('');
  const [eventWebsite, setEventWebsite] = useState('');
  const [storedEvent, setStoredEvent] = useState( );


  useEffect(() => {

    // const handleStorageChange = () => {
      const storedEvent = JSON.parse(localStorage.getItem('event'));
      setStoredEvent(storedEvent);
    // };
    
    console.log(storedEvent)
    if (storedEvent) {
      setName(storedEvent.name || '');
      setCategory(storedEvent.category || '');
      setDescription(storedEvent.description || '');
      setTicketPrice(storedEvent.ticket_Price || '');
      setDateEvent(storedEvent.date_event || '');
      setTimeEvent(storedEvent.timeEvent || '');
      setLieu(storedEvent.lieu || '');
      setTicketAvailability(storedEvent.ticket_Availability || '');
      setOrganizer(storedEvent.organizer || '');
      setSupportContact(storedEvent.supportContact || '');
      setEventWebsite(storedEvent.eventWebsite || '');
      setImage(storedEvent.image || '');
    }
      // // Ajout de l'écouteur d'événements 'storage'
      // window.addEventListener('storage', handleStorageChange);

      // // Nettoyage de l'écouteur d'événements
      // return () => {
      //   window.removeEventListener('storage', handleStorageChange);
      // };
    // console.log(image)
  }, [storedEvent]);



  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product', image);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('ticket_Price', ticketPrice);
    formData.append('supportContact', supportContact);
    formData.append('date_event', dateEvent);
    formData.append('ticket_Availability', ticketAvailability);
    formData.append('lieu', lieu);
    formData.append('organizer', organizer);
    formData.append('timeEvent', timeEvent);
    formData.append('eventWebsite', eventWebsite);

    // Upload the image
    const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const imageUrl = imageResponse.data.image_url;

    // Post the event data
    const eventData = {
      name,
      image: imageUrl,
      category,
      description,
      ticket_Price: ticketPrice,
      supportContact,
      date_event: dateEvent,
      ticket_Availability: ticketAvailability,
      lieu,
      organizer,
      timeEvent,
      eventWebsite,
    };

    await axios.post('http://localhost:4000/addevent', eventData);
    alert('Evenement a été ajouté!');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product', image);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('ticket_Price', ticketPrice);
    formData.append('supportContact', supportContact);
    formData.append('date_event', dateEvent);
    formData.append('ticket_Availability', ticketAvailability);
    formData.append('lieu', lieu);
    formData.append('organizer', organizer);
    formData.append('timeEvent', timeEvent);
    formData.append('eventWebsite', eventWebsite);

    // Upload the image
    const imageResponse = await axios.post('http://localhost:4000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const imageUrl = imageResponse.data.image_url;

    // Post the event data
    const eventData = {
      name,
      image: imageUrl,
      category,
      description,
      ticket_Price: ticketPrice,
      supportContact,
      date_event: dateEvent,
      ticket_Availability: ticketAvailability,
      lieu,
      organizer,
      timeEvent,
      eventWebsite,
    };

    await axios.post(`http://localhost:4000/api/events/:${storedEvent.id}`, eventData);
    alert('Evenement a été ajouté!');
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        {!storedEvent ? <h1 className="text-2xl font-bold mb-6">Add New Event</h1> : <h1 className="text-2xl font-bold mb-6">Update Event</h1>}
        <form onSubmit={storedEvent ? handleUpdate : handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <label className="cursor-pointer">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  // <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <FontAwesomeIcon icon={faImage} size="3x" className="text-gray-500" />
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Event Name"
              value={storedEvent?.name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={storedEvent?.category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <textarea
              placeholder="Description"
              value={storedEvent?.description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Ticket Price"
              value={storedEvent?.ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Support Contact"
              value={storedEvent?.supportContact}
              onChange={(e) => setSupportContact(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="date"
              placeholder="Date of Event"
              value={storedEvent?.dateEvent}
              onChange={(e) => setDateEvent(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Ticket Availability"
              value={storedEvent?.ticketAvailability}
              onChange={(e) => setTicketAvailability(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Location"
              value={storedEvent?.lieu}
              onChange={(e) => setLieu(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Organizer"
              value={storedEvent?.organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="time"
              placeholder="Time of Event"
              value={storedEvent?.timeEvent}
              onChange={(e) => setTimeEvent(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Event Website"
              value={storedEvent?.eventWebsite}
              onChange={(e) => setEventWebsite(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
            <FontAwesomeIcon icon={faSave} />
            {storedEvent ? <span>Modifier l'événement</span> : <span>Enregistrer un nouvel événement</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addevent;