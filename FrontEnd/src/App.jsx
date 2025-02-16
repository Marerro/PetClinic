import Register from "./components/Register";
import { useState } from "react";
import { Route, Routes , Navigate} from "react-router";
import MainPage from "./components/MainPage";
import ModalContext from "./context/ModalContext";
import searchContext from "./context/searchContext";
import SearchBar from "./components/SearchBar";
import Login from "./components/LoginForm"; 
import UserContextProvider from "./context/UserContextProvider.jsx";
import AppointmentContextProvider from "./context/AppointmentContextProvider.jsx";
import {useContext} from "react"
import UserContext from "./context/UserContext";

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [select, setSelected] = useState(null);
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <p className="text-center">Loading...</p>; 
  }


  return (
    <>
  <UserContextProvider>
  <AppointmentContextProvider>
    <ModalContext.Provider value={{isOpen, setIsOpen}}>
    <searchContext.Provider value={{select, setSelected}}>
    <Routes>
    <Route path="/" element={<Navigate to="/register" />} />
    <Route path={"/login"} element={<Login />} />
    <Route path={"/register"} element={<Register />} />
    <Route path={"/main"} element={<MainPage />} />
    </Routes>
    </searchContext.Provider>
    </ModalContext.Provider>
    </AppointmentContextProvider>
    </UserContextProvider>
    </>
  );
}
export default App;
