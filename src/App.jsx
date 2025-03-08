import { Outlet } from "react-router";
import { Navbar } from "./components";
import { useLocation } from "react-router";
import { useRecipe } from "./context";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const { clearExplore } = useRecipe();

  useEffect(() => {
    if (location.pathname !== "/feed") {
      clearExplore();
    }
  }, [location, clearExplore]);

  return (
    <div className="min-h-screen w-screen bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
