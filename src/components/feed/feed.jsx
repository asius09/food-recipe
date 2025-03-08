import React, { useState, useEffect } from "react";
import ExploreCard from "../cards/ExploreCard";
import { useRecipe } from "../../context";
import { Link } from "react-router";
import Loading from "../Loading";

const Feed = () => {
  const { feedRecipes, setLoadMoreFeed, setIsFeedActive, loading } =
    useRecipe();
  const [activeTag, setActiveTag] = useState("All");

  // Extract unique tags from all recipes
  const allTags = [
    "All",
    ...Array.from(
      new Set(feedRecipes.flatMap((recipe) => recipe.tags || []))
    ).slice(0, 8),
  ];

  // Filter recipes by active tag
  const displayRecipes =
    activeTag === "All"
      ? feedRecipes
      : feedRecipes.filter(
          (recipe) => recipe.tags && recipe.tags.includes(activeTag)
        );

  const handleLoadMore = () => {
    setLoadMoreFeed((prev) => prev + 1);
  };

  useEffect(() => {
    setIsFeedActive(true);
    return () => setIsFeedActive(false);
  }, [setIsFeedActive]);

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <h1 className="text-4xl font-bold text-amber-500 mb-6">
        Explore Recipes
      </h1>

      {/* Category filter tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map((tag) => (
          <button
            key={`${tag}-${Math.floor(Math.random() * 1000000)}`}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTag === tag
                ? "bg-amber-500 text-gray-900"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading && feedRecipes.length === 0 ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecipes.map((recipe) => (
            <ExploreCard
              key={`${recipe.id}-${Math.floor(Math.random() * 1000000)}`}
              recipe={recipe}
            />
          ))}
        </div>
      )}

      {displayRecipes.length === 0 && !loading && (
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

      {displayRecipes.length > 0 && (
        <div className="text-center mt-12 mb-6">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 mx-auto group"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Loading more delicious recipes...</span>
              </div>
            ) : (
              <>
                <span>Discover More Recipes</span>
                <i className="ri-restaurant-line text-xl group-hover:animate-bounce"></i>
                <svg
                  className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
