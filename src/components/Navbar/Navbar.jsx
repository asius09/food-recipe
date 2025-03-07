import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRecipe } from "../../context";

const Navbar = () => {
  const navigate = useNavigate();
  const { setSearch } = useRecipe();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    navigate(`/result/${searchInput}`);
    setSearchInput("");
  };

  return (
    <nav className="bg-gray-800 shadow-lg py-4 text-gray-100  absolute top-0 left-0 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <i className="ri-restaurant-2-fill text-3xl mr-2 text-amber-500" />
          <span className="text-2xl font-bold group-hover:text-amber-400 transition-colors duration-300">
            Food Recipe
          </span>
        </Link>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search recipes..."
            className="px-4 py-2 border-2 border-gray-600 bg-gray-700 text-gray-100 rounded-l-md w-64 focus:outline-none focus:border-amber-500 transition-colors duration-300"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-2 px-4 rounded-r-md transition-all duration-300 hover:shadow-lg flex items-center justify-center"
          >
            <i className="ri-search-line text-xl" />
          </button>
        </form>
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex flex-col items-center"
            >
              <i className="ri-home-5-fill text-2xl" />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/feed"
              className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex flex-col items-center"
            >
              <i className="ri-compass-3-line text-2xl" />
              <span className="text-xs mt-1">Explore</span>
            </Link>
          </li>
          <li>
            <Link
              to="/favourites"
              className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex flex-col items-center"
            >
              <i className="ri-heart-3-fill text-2xl" />
              <span className="text-xs mt-1">Favorites</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
