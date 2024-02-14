import express from 'express';
import { PORT, mongoURI } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import { Attraction } from './models/attractionModel.js';
import attractionRoute from './routes/attractionsRoute.js';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  console.log(req); 
  return res.status(234).send('Hello World');
});

app.use('/attractions', attractionRoute);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log(`Connected to MongoDB Atlas cluster: ${mongoose.connection.host}, database: ${mongoose.connection.db.databaseName}`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


