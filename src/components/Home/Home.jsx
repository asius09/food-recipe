import React from "react";
import { Link } from "react-router";
import Loading from "../Loading";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-bold text-amber-500 mb-4">Food Recipe</h1>
      <p className="text-2xl mb-8 text-gray-300 max-w-2xl">
        Discover delicious recipes from around the world
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/feed"
          className="px-6 py-3 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
        >
          <i className="ri-search-line mr-2"></i>
          Explore Recipes
        </Link>
        <Link
          to="/favourites"
          className="px-6 py-3 bg-gray-700 text-amber-400 rounded-lg font-bold hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
        >
          <i className="ri-heart-line mr-2"></i>
          My Favorites
        </Link>
      </div>
    </div>
  );
};

export default Home;
