import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventHd from '../components/EventHd';
// import PopularProducts from '../components/PopularProducts';
import EventDescription from '../components/EventDescription';
import EventDisplay from '../components/EventDisplay';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Product = () => {
  const [allevent, setallevent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { eventId } = useParams();
  console.log(`eventId: `, eventId);

  useEffect(() => {
    fetch('http://localhost:4000/allevent')
      .then((response) => response.json())
      .then((data) => {
        setallevent(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);

  const event = allevent.find((e) => e.id === Number(eventId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found!</div>;
  }

  return (
    <section>
        <Header />
        {/* <EventHd event={event} /> */}
        <EventDisplay event={event} />
        <EventDescription event={event} /><br /> <br />
        {/* <PopularProducts /> */}
      <Footer />
    </section>
  );
};

export default Product;
