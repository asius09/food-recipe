import React from "react";
import { Link } from "react-router";
import { useRecipe } from "../../context";
import Loading from "../Loading";
import Card from "../cards/card";

const Result = () => {
  const { recipes, loading, error } = useRecipe();

  if (loading) return <Loading />;

  if ((error && error !== null) || !recipes) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <Link
            to="/"
            className="px-4 py-2 bg-amber-500 text-gray-900 rounded-md font-bold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8 px-4 pt-25">
      <Link
        to="/"
        className="text-amber-500 hover:text-amber-400 flex items-center mb-6"
      > 
        <i className="ri-arrow-left-line mr-2"></i>
        Back to Home
      </Link>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No recipes found</p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-3 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Result;
