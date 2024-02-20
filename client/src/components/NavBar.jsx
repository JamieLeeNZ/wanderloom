import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaHeart } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-merriweather">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-black text-2xl font-bold">
              Wanderloom
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-black hover:text-gray-700 flex items-center">
                <div className="mr-2">Home</div>
                <div className="mr-4"><FaHome /></div>
              </Link>
              <Link to="/about" className="text-black hover:text-gray-700 flex items-center">
                <div className="mr-2">About</div>
                <div className="mr-4"><FaInfoCircle /></div>
              </Link>
              <Link to="/favourites" className="text-black hover:text-gray-700 flex items-center">
                <div className="mr-2">Favorites</div>
                <div className="mr-4"><FaHeart /></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
