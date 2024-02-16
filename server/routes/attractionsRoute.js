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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const attraction = await Attraction.findById(id);
    
    if (!attraction) {
      return res.status(404).send('Attraction not found');
    }
    return res.status(200).json(attraction);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message : err.message });
  }
});

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
    
    
    // Sort attractions by proximity and get the three closest
    const closestAttractions = attractionsWithProximity
      .sort((a, b) => a.proximity - b.proximity)
      .slice(0, 3);
    
    console.log('Attractions Array:', closestAttractions);

    return res.status(200).json(closestAttractions);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message : err.message });
  }
});

export default router;