import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router";
import { Home, Result, Recipe, Favourites, Feed } from "./components";
import { RecipeProvider } from "./context";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="result/:search" element={<Result />} />
      <Route path="result/:id/recipe/:name" element={<Recipe />} />
      <Route path="favourites" element={<Favourites />} />
      <Route path="feed" element={<Feed />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecipeProvider>
      <RouterProvider router={router} />
    </RecipeProvider>
  </StrictMode>
);
