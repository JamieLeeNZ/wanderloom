import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [attractions, setAttractions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/attractions')
      .then((res) => {
        setAttractions(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  , []);
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold my-8'>Attractions</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <ul>
          {attractions.map((attraction) => (
            <li key={attraction._id}>
              <h2 className='text-xl font-semibold'>{attraction.name}</h2>
              <p>{attraction.description}</p>
              {}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;