import express from 'express';
import { Attraction } from '../models/attractionModel.js';

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

export default router;