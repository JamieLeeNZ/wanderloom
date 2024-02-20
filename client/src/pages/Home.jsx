import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Home = () => {
  const [randomAttraction, setRandomAttraction] = useState(null);

  // Fetch a random attraction image when the component mounts
  useEffect(() => {
    fetchRandomAttraction();
  }, []);

  const fetchRandomAttraction = async () => {
    try {
      const response = await axios.get('http://localhost:5555/attractions');
      setRandomAttraction(response.data); 
    } catch (error) {
      console.error('Error fetching random attraction:', error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="relative h-screen">
      {/* Background image */}
      {randomAttraction && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${randomAttraction.image})` }}
        />
      )}

      {/* Translucent white panel for text */}
      <div className="absolute top-0 right-40 h-full w-2/5 bg-white bg-opacity-80 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome to Wanderloom</h1>
          <p className="text-lg mb-8">Let's get this trip out of the group chat.</p>
          <Link to="/start" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Embark
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
