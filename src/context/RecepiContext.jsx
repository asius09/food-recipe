import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useFetch, useLocalStorage } from "../hooks";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [feedRecipes, setFeedRecipes] = useLocalStorage("feedRecipes", []);
  const [isFeedActive, setIsFeedActive] = useState(false);
  const [loadMoreFeed, setLoadMoreFeed] = useState(0);
  const [favorites, setFavorites, clearFavorites] = useLocalStorage(
    "favourites",
    []
  );
  const [recipes, setRecipes] = useLocalStorage("recipes", []);

  const searchUrl = useMemo(() => {
    if (search) return `https://dummyjson.com/recipes/search?q=${search}`;
    if (isFeedActive) {
      return `https://dummyjson.com/recipes?limit=9&skip=${loadMoreFeed * 9}`;
    }
    return "";
  }, [search, isFeedActive, loadMoreFeed]);

  const { data, loading, error } = useFetch(searchUrl);

  useEffect(() => {
    if (data?.recipes) {
      if (search) {
        setRecipes(data.recipes);
      }
      if (isFeedActive) {
        setFeedRecipes((prev) => [...prev, ...data.recipes]);
      }
    }
  }, [data, search, isFeedActive, setRecipes, setFeedRecipes]);

  const handleSearch = useCallback(
    (newSearch) => {
      if (newSearch !== search) {
        setSearch(newSearch);
      }
    },
    [search]
  );

  const checkFavorite = useCallback(
    (recipeId) => favorites.some((item) => item.id === recipeId),
    [favorites]
  );

  const addToFavorites = useCallback(
    (recipe) =>
      setFavorites((prev) => [...prev, { ...recipe, isFavorite: true }]),
    [setFavorites]
  );

  const removeFromFavorites = useCallback(
    (recipeId) =>
      setFavorites((prev) => prev.filter((item) => item.id !== recipeId)),
    [setFavorites]
  );

  const clearFeedRecipes = useCallback(() => {
    // Use a direct state update to avoid dependency loop
    setFeedRecipes([]);
    // Clear from localStorage manually without triggering another render cycle
    localStorage.setItem("feedRecipes", JSON.stringify([]));
  }, [setFeedRecipes]);

  const clearExplore = useCallback(() => {
    clearFeedRecipes();
    setLoadMoreFeed(0);
    setIsFeedActive(false);
  }, [clearFeedRecipes]);

  const contextValue = useMemo(
    () => ({
      search,
      setSearch: handleSearch,
      loading,
      error,
      recipes,
      favorites,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
      checkFavorite,
      setIsFeedActive,
      setLoadMoreFeed,
      feedRecipes,
      clearExplore,
    }),
    [
      search,
      handleSearch,
      loading,
      error,
      recipes,
      favorites,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
      checkFavorite,
      setIsFeedActive,
      setLoadMoreFeed,
      feedRecipes,
      clearExplore,
    ]
  );

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return context;
};

export { RecipeProvider, useRecipe, RecipeContext };
