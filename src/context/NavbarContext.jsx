import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [isActive, setIsActive] = useState({
    home: false,
    explore: false,
    favourites: false,
  });
  return (
    <NavbarContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </NavbarContext.Provider>
  );
};

const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};

export { NavbarProvider, useNavbar, NavbarContext };
