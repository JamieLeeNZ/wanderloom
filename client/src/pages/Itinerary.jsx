import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Itinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const location = useLocation();
  const selectedAttractions = location.state?.selectedAttractions || [];

  const fetchClosestAttractions = async (attractionId, selectedAttractionsIds) => {
    try {
      const response = await axios.get(`http://localhost:5555/attractions/closest/${attractionId}`);
      let closestAttractions = response.data;

      // Filter out attractions that are already included in other itineraries
      closestAttractions = closestAttractions.filter(attraction => !selectedAttractionsIds.includes(attraction._id));

      return closestAttractions;
    } catch (error) {
      console.error('Error fetching closest attractions:', error);
      return [];
    }
  };

  const generateItineraries = async () => {
    console.log('Selected attractions:', selectedAttractions);
    let selectedAttractionsIds = selectedAttractions.map(attraction => attraction._id);

    const generatedItineraries = [];
    for (const attraction of selectedAttractions) {
      try {
        const closestAttractions = await fetchClosestAttractions(attraction._id, selectedAttractionsIds);
        
        // Include the selected attraction in the itinerary
        const itinerary = [attraction, ...closestAttractions];
        generatedItineraries.push(itinerary);

        // Update selectedAttractionsIds with attractions from the current itinerary
        selectedAttractionsIds = [...selectedAttractionsIds, ...closestAttractions.map(attraction => attraction._id)];
      } catch (error) {
        console.error(`Error generating itinerary for ${attraction.name}:`, error);
      }
    }
    setItineraries(generatedItineraries);
  };

  useEffect(() => {
    console.log('Selected attractions:', selectedAttractions);
    generateItineraries();
  }, [selectedAttractions]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Itineraries</h2>
      <div className="max-w-2xl w-3/4 gap-4 mt-4">
        {itineraries.map((itinerary, index) => (
          <div key={index}>
            <div className="flex flex-col justify-center items-center mt-4">
              <h3 className="text-xl font-semibold mb-2">Day {index + 1}</h3>
            </div>
            <ul>
              {itinerary.map((attraction, idx) => (
                <div key={idx} className="border border-gray-200 rounded p-4 my-10">
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
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
