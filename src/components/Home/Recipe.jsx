import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { useLocalStorage } from "../../hooks";
import Loading from "../Loading";
import { useRecipe } from "../../context";

const Recipe = () => {
  const { id, name } = useParams();
  const { recipes } = useRecipe();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 300);
  const [recipe, setRecipe] = useState({});
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const isFavorite = favourites.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
    setRecipe(recipe);
  }, [id, recipes]);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavourites(favourites.filter((item) => item.id !== parseInt(id)));
    } else {
      setFavourites([...favourites, recipe]);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <article className="min-h-screen w-full px-4 pt-25">
      <nav className="mb-6">
        <Link
          to="/result/id"
          className="text-amber-500 hover:text-amber-400 flex items-center group transition-all duration-300"
        >
          <i className="ri-arrow-left-line mr-2 group-hover:-translate-x-1"></i>
          Back to recipes
        </Link>
      </nav>

      <header className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-5xl font-bold text-amber-500 mb-2">
          {recipe.name}
        </h1>
        <p className="text-gray-300 mt-2 italic">
          Cuisine:{" "}
          <span className="text-amber-300">{recipe.cuisine || "Unknown"}</span>
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-96 object-cover rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500"
        />

        <section className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center">
            <i className="ri-list-check mr-2"></i>
            Ingredients
          </h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center text-gray-200 hover:text-white transition-colors"
              >
                <i className="ri-checkbox-circle-fill text-amber-500 mr-3"></i>
                {ingredient}
              </li>
            ))}
          </ul>

          <button
            onClick={toggleFavorite}
            className={`mt-10 px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center shadow-lg hover:scale-105 ${
              isFavorite
                ? "bg-gray-700 text-amber-400 hover:bg-gray-600"
                : "bg-amber-500 text-gray-900 hover:bg-amber-600"
            }`}
          >
            <i
              className={`${
                isFavorite ? "ri-heart-fill" : "ri-heart-line"
              } text-xl mr-2`}
            ></i>
            {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
          </button>
        </section>
      </div>

      <section className="mb-10 bg-gray-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center">
          <i className="ri-file-list-3-line mr-2"></i>
          Instructions
        </h2>
        <ol className="space-y-6">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="text-gray-200 flex">
              <span className="inline-block bg-amber-500 text-gray-900 font-bold rounded-full w-8 h-8 text-center leading-8 mr-4 flex-shrink-0 shadow-md">
                {index + 1}
              </span>
              <p className="pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
};

export default Recipe;
