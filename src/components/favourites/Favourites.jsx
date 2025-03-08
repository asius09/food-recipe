import React from "react";
import { Link } from "react-router";
import { useRecipe } from "../../context";
import Card from "../cards/card";

const Favourites = () => {
  const { favorites } = useRecipe();

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <h1 className="text-4xl font-bold text-amber-500 mb-6">My favourites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <i className="ri-heart-3-line text-6xl text-gray-600 mb-4"></i>
          <p className="text-xl text-gray-400">
            You haven't saved any recipes yet
          </p>
          <Link
            to="/feed"
            className="mt-6 inline-block px-6 py-3 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-all duration-300"
          >
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
