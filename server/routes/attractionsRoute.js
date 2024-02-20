import express from 'express';
import { Attraction } from '../models/attractionModel.js';
import { calculateProximity } from '../utils/proximityUtils.js';
import { getAdjacentWards } from '../utils/proximityUtils.js';

const router = express.Router();

/*
router.get('/', async (req, res) => {
  try {
    const attractions = await Attraction.find({});
    console.log(attractions)
    return res.status(200).json({
      count: attractions.length,
      data: attractions,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message : err.message });
  }
});*/


router.get('/', async (req, res) => {
  try {
    const count = await Attraction.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomAttraction = await Attraction.findOne().skip(randomIndex);
    if (!randomAttraction) {
      return res.status(404).send('Attraction not found');
    } else {
      console.log(randomAttraction)
    }
    return res.status(200).json(randomAttraction);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message : err.message });
  }
});


router.get('/popular', async (req, res) => {
  try {
    // Fetch 40 attractions sorted by rating
    const attractions = await Attraction.find({}).sort({ rating: -1 }).limit(40);

    // Shuffle the attractions array randomly
    const shuffledAttractions = shuffleArray(attractions);

    // Create a Set to store unique wards
    const uniqueWards = new Set();

    // Filter attractions to include only those with unique wards and limit to 12 attractions
    const filteredAttractions = shuffledAttractions.filter(attraction => {
      if (!uniqueWards.has(attraction.ward)) {
        uniqueWards.add(attraction.ward);
        return true;
      }
      return false;
    }).slice(0, 12);

    return res.status(200).json(filteredAttractions);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message : err.message });
  }
});

router.get('/closest/:id', async (req, res) => {
  try {
    const id = req.params.id;
  ``
    const attraction = await Attraction.findById(id);

    // Check if the attraction object is provided
    if (!attraction) {
      return res.status(400).send('Attraction object is required');
    }

    const ward = attraction.ward;

    const attractions = await Attraction.find({
      $and: [
          {
              $or: [
                  { ward: ward }, // Attractions in the same ward
                  { ward: { $in: getAdjacentWards(ward) } } // Attractions in adjacent wards
              ]
          },
          { _id: { $ne: attraction._id } } // Exclude the selected attraction itself
      ]
    });

    // Calculate proximity to the given attraction for all attractions
    const attractionsWithProximity = attractions.map(otherAttraction => ({
        ...otherAttraction.toJSON(),
        proximity: calculateProximity(attraction, otherAttraction)
    }));
    
    // Shuffle function to randomize the array order
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Randomize the array before sorting
    const shuffledAttractions = shuffleArray(attractionsWithProximity);

    const closestAttractions = shuffledAttractions.sort((a, b) => a.proximity - b.proximity);

    return res.status(200).json(closestAttractions);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message : err.message });
  }
});

// Function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export default router;