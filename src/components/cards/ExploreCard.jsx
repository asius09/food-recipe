import React from "react";
import { Link } from "react-router";
import { useRecipe } from "../../context";

const ExploreCard = ({ recipe }) => {
  const { addToFavorites, removeFromFavorites, checkFavorite } = useRecipe();

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (checkFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative transform hover:-translate-y-1">
      <div className="absolute top-3 right-3 z-10">
        <button
          aria-label={checkFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
          className="bg-gray-900 bg-opacity-80 rounded-full p-2.5 text-gray-300 hover:text-amber-500 hover:bg-gray-800 active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
          onClick={handleFavoriteToggle}
        >
          <i className={`${checkFavorite(recipe.id) ? "ri-heart-fill text-amber-500" : "ri-heart-line"} text-xl`}></i>
        </button>
      </div>
      
      <Link to={`/result/${recipe.id}/recipe/${encodeURIComponent(recipe.name)}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            loading="lazy"
            className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent h-24 opacity-0 group-hover:opacity-70 transition-all duration-300"></div>
        </div>
        <div className="p-5 group-hover:bg-gray-750 transition-colors duration-300">
          <h3 className="text-xl font-bold text-amber-500 mb-3 group-hover:text-amber-400 transition-colors line-clamp-1">
            {recipe.name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags && recipe.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-700 text-amber-400 text-xs px-2.5 py-1 rounded-full group-hover:bg-gray-600 transition-colors">
                {tag}
              </span>
            ))}
            {recipe.tags && recipe.tags.length > 3 && (
              <span className="bg-gray-700 text-amber-400 text-xs px-2.5 py-1 rounded-full group-hover:bg-gray-600 transition-colors">
                +{recipe.tags.length - 3} more
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-400 text-sm flex items-center">
              <i className="ri-map-pin-line mr-1.5"></i>
              {recipe.cuisine || "Unknown origin"}
            </span>
            <span className="bg-amber-500 text-gray-900 text-xs px-3.5 py-1.5 rounded-full font-bold shadow-sm group-hover:bg-amber-400 transition-colors duration-300 transform group-hover:scale-105">
              View Recipe
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExploreCard;
