import Register from "./components/Register";
import { useState } from "react";
import { Route, Routes , Navigate} from "react-router";
import MainPage from "./components/MainPage";
import ModalContext from "./context/ModalContext";
import searchContext from "./context/searchContext";
import SearchBar from "./components/SearchBar";
import AppointmentList from "./components/AppointmentList";

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [select, setSelected] = useState(null);


  return (
    <>
    <ModalContext.Provider value={{isOpen, setIsOpen}}>
    <searchContext.Provider value={{select, setSelected}}>
    <Routes>
    <Route path="/" element={<Navigate to="/register" />} />
    <Route path={"/register"} element={<Register />} />
    <Route path={"/main"} element={<MainPage />} />
    </Routes>
    </searchContext.Provider>
    </ModalContext.Provider>
    </>
  );
}
export default App;
