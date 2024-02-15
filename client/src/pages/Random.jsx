import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Random = () => {
  const [randomAttraction, setRandomAttraction] = useState(null);

  const fetchRandomAttraction = async () => {
    try {
      const response = await axios.get('http://localhost:5555/attractions');
      setRandomAttraction(response.data); 
    } catch (error) {
      console.error('Error fetching random attraction:', error);
    }
  };

  

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-4">Random Attraction</h1>
      </div>
      <div>
        <button onClick={fetchRandomAttraction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Random Attraction
        </button>
      </div>
      {randomAttraction && (
        <div className="max-w-2xl w-3/4 bg-white shadow-lg rounded-lg overflow-hidden mt-4">
          <div className="p-6">
            <div className="flex flex-col justify-center items-center mt-4">
              <h2 className="text-xl font-semibold">{randomAttraction.name}</h2>
              <p className="text-gray-600 mt-3">{randomAttraction.district}, {randomAttraction.ward}</p>
            </div>
            <div className="flex justify-center items-center mt-4">
              <img
                src={randomAttraction.image}
                alt={randomAttraction.name}
                className="mt-4 w-full h-auto rounded-lg"
                style={{ width: 480, height: 360 }}
              />
            </div>
            <p className="text-gray-600 mt-4">{randomAttraction.description}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Random;
