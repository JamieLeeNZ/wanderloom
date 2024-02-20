import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-black text-2xl font-bold">
              Wanderloom
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-black hover:text-gray-700">
                Home
              </Link>
              <Link to="/about" className="text-black hover:text-gray-700">
                About
              </Link>
              <Link to="/favourites" className="text-black hover:text-gray-700">
                Favourites
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
