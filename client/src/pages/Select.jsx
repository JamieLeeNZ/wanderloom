import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Select = () => {
  const [popularAttractions, setPopularAttractions] = useState([]);
  const [attractionChoices, setAttractionChoices] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [disableClick, setDisableClick] = useState(false);

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
    // If there are less than two attractions, return
    if (popularAttractions.length < 2) {
      getPopularAttractions();
      return;
    }

    const randomIndex1 = Math.floor(Math.random() * popularAttractions.length);
    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * popularAttractions.length);
    } while (randomIndex2 === randomIndex1);

    setAttractionChoices([popularAttractions[randomIndex1], popularAttractions[randomIndex2]]);

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

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Popular Attractions</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => {
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
      <div className={`max-w-2xl w-3/4 gap-4 mt-4 transition-opacity duration-1000 ${selectedAttractions.length === 5 ? 'opacity-100' : 'opacity-0'}`}>
        {selectedAttractions.map(attraction => (
          <div key={attraction._id} className="border border-gray-200 rounded p-4 my-10">
            <div className="flex flex-col justify-center items-center mt-4">
              <h2 className="text-xl font-semibold">{attraction.name}</h2>
              <p className="text-gray-600 mt-3">{attraction.district}, {attraction.ward}</p>
            </div>
            <div className="flex justify-center items-center mt-4">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="mt-4 w-full h-auto rounded-lg"
                style={{ width: 480, height: 360 }}
              />
            </div>
            <p className="text-gray-600 px-8 my-6">{attraction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
