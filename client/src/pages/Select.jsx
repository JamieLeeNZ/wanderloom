import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Select = () => {
  const [popularAttractions, setPopularAttractions] = useState([]);
  const [attractionChoices, setAttractionChoices] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [disableClick, setDisableClick] = useState(false);
  const navigate = useNavigate();
  
  // Fetches popular attractions from the backend
  const fetchPopularAttractions = async () => {
    try {
      const response = await axios.get('http://localhost:5555/attractions/popular');
      return response.data;
    } catch (error) {
      console.error('Error fetching popular attractions:', error);
      return [];
    }
  };

  // Chooses two random attractions from the popular attractions list
  const getAttractionChoices = () => {
    console.log(popularAttractions.length);
    
    const filteredPopularAttractions = popularAttractions.filter(attraction => (
      !selectedAttractions.some(selected => selected._id === attraction._id)
    ));
    const randomIndex1 = Math.floor(Math.random() * filteredPopularAttractions.length);
    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * filteredPopularAttractions.length);
    } while (randomIndex2 === randomIndex1);

    console.log('Attraction Choices:', [
      filteredPopularAttractions[randomIndex1].name,
      filteredPopularAttractions[randomIndex2].name
    ]);

    setAttractionChoices([
      filteredPopularAttractions[randomIndex1],
      filteredPopularAttractions[randomIndex2]
    ]);

    setPopularAttractions(prevAttractions => {
      const updatedAttractions = [...prevAttractions];
      updatedAttractions.splice(randomIndex1, 1);
      updatedAttractions.splice(randomIndex2 > randomIndex1 ? randomIndex2 - 1 : randomIndex2, 1);
      return updatedAttractions;
    });
  };

  // Fetches popular attractions and sets the state
  const getPopularAttractions = async () => {
    const attractions = await fetchPopularAttractions();
    setPopularAttractions(attractions);
  };

  // Fetch popular attractions when the component mounts
  useEffect(() => {
    getPopularAttractions();
  }, []);

  // Handles the click event for an attraction
  const handleAttractionClick = (attraction) => {
    if (disableClick) return;
    setDisableClick(true);
    setSelectedAttractions(prevAttractions => [...prevAttractions, attraction]);

    setTimeout(() => {
      if (selectedAttractions.length < 5) {
        getAttractionChoices();
      }
      setFadeIn(true);
      setTimeout(() => {
        setFadeIn(false);
        setDisableClick(false); 
      }, 300);
    }, 200);
  };

  // Redirect to the itinerary page when the selected attractions reach a certain length
  useEffect(() => {
    if (selectedAttractions.length === 5) {
      navigate('/itinerary', { state: { selectedAttractions } });
    }
  }, [selectedAttractions, navigate]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Popular Attractions</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => {
          if (popularAttractions.length < 20) {
            getPopularAttractions();
          }
          getAttractionChoices(); 
          setSelectedAttractions([]);
        }}
      >
        Select Two Attractions
      </button>
      {attractionChoices.length > 0 && selectedAttractions.length < 5 && (
        <div className="flex justify-center items-center h-screen">
            <ul className="flex space-x-4">
              {attractionChoices.map(attraction => (
                <div
                  key={attraction._id}
                  className={`max-w-1/3 border border-gray-200 rounded p-4 cursor-pointer transition-transform transition-bg duration-300 ${fadeIn ? 'opacity-0 ' : 'opacity-100 '} ${selectedAttractions.includes(attraction) ? 'bg-gray-100 transform scale-95' : ''}`}
                  onClick={() => handleAttractionClick(attraction)}
                >
                  <div className="flex flex-col justify-center items-center mt-4">
                    <h2 className="text-xl font-semibold">{attraction.name}</h2>
                  </div>
                  <div className="flex justify-center items-center mt-4 p-4">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="mt-4 w-full h-auto rounded-lg"
                      style={{ width: 360, height: 240 }}
                    />
                  </div>
                </div>
              ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
