import Register from "./components/Register";
import { useState } from "react";
import { Route, Routes , Navigate} from "react-router";
import MainPage from "./components/MainPage";
import ModalContext from "./context/ModalContext";
import Modal from "./utils/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <>
    <ModalContext.Provider value={{isOpen, setIsOpen}}>
    <Routes>
    <Route path="/" element={<Navigate to="/register" />} />
    <Route path={"/register"} element={<Register />} />
    <Route path={"/main"} element={<MainPage />} />
    </Routes>
    </ModalContext.Provider>
    </>
  );
}
export default App;
