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
  // Use useMemo to create the URL only when search changes
  const searchUrl = useMemo(() => {
    if (search) return `https://dummyjson.com/recipes/search?q=${search}`;
    if (isFeedActive) {
      return `https://dummyjson.com/recipes?limit=9&skip=${
        loadMoreFeed === 0 ? 0 : loadMoreFeed * 9
      }`;
    }
    return "";
  }, [search, isFeedActive, loadMoreFeed]);

  // This will only call useFetch when searchUrl changes
  const { data, loading, error } = useFetch(searchUrl);
  const [recipes, setRecipes] = useLocalStorage("recipes", []);

  useEffect(() => {
    if (data?.recipes) {
      if (search) {
        setRecipes(data.recipes);
      }
      if (isFeedActive) {
        setFeedRecipes((prev) => [...prev, ...data.recipes]);
      }
    }
  }, [data]);

  // Create a wrapper function for setSearch that only updates when necessary
  const handleSearch = useCallback(
    (newSearch) => {
      if (newSearch !== search) {
        setSearch(newSearch);
      }
    },
    [search]
  );
  const checkFavorite = useCallback(
    (recipeId) => {
      return favorites.some((item) => item.id === recipeId);
    },
    [favorites, setFavorites]
  );

  const addToFavorites = useCallback(
    (recipe) => {
      setFavorites((prev) => [...prev, { ...recipe, isFavorite: true }]);
    },
    [setFavorites, favorites]
  );

  const removeFromFavorites = useCallback(
    (recipeId) => {
      setFavorites((prev) => prev.filter((item) => item.id !== recipeId));
    },
    [setFavorites, favorites]
  );

  // Provide the wrapped setter instead of the raw one
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
      isFeedActive,
      setIsFeedActive,
      loadMoreFeed,
      setLoadMoreFeed,
      feedRecipes,
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
