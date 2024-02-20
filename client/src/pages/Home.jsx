import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Home = () => {
  const [randomAttraction, setRandomAttraction] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [redirect, setRedirect] = useState(false);

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

  const handleEmbarkClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setRedirect(true);
    }, 1000); // Adjust timing as needed
  };

  useEffect(() => {
    if (redirect) {
      // Redirect to /start after animation
      window.location.href = '/start';
    }
  }, [redirect]);

  return (
    <div className="relative h-screen overflow-hidden">

      {/* Background image */}
      {randomAttraction && (
        <div
          className={`absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : ''}`}
          style={{ backgroundImage: `url(${randomAttraction.image})` }}
        />
      )}

      {/* Translucent white panel for text */}
      <div className={`absolute top-0 right-40 h-full w-2/5 bg-white bg-opacity-80 flex justify-center items-center transition-transform duration-1000 ${isAnimating ? 'translate-x-full' : ''}`}>
        <div className="text-center font-merriweather">
          <h1 className="text-4xl font-bold mb-8 ">Welcome to Wanderloom</h1>
          <p className="text-lg mb-8">Let's get this trip out of the group chat.</p>
          <button onClick={handleEmbarkClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Embark
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
