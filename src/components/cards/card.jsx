import React from "react";
import { Link } from "react-router";
import { useRecipe } from "../../context";

const Card = ({ recipe }) => {
  const { addToFavorites, removeFromFavorites, checkFavorite } = useRecipe();

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (checkFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
      <div className="absolute top-2 right-2 z-10">
        <button
          className="bg-gray-900 bg-opacity-70 rounded-full p-2 text-gray-300 hover:text-amber-500 transition-colors cursor-pointer"
          onClick={handleFavoriteToggle}
        >
          <i
            className={`${
              checkFavorite(recipe.id)
                ? "ri-heart-fill text-amber-500"
                : "ri-heart-line"
            } text-xl`}
          ></i>
        </button>
      </div>

      <Link to={`/result/${recipe.id}/recipe/${recipe.name}`} className="block">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-amber-500 mb-2">
            {recipe.name}
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            {recipe.tags?.[0] || "Uncategorized"}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">
              {recipe.cuisine || "Unknown origin"}
            </span>
            <span className="bg-amber-500 text-gray-900 text-xs px-2 py-1 rounded-full">
              View Recipe
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
