import Register from "./components/Register";
import { Route, Routes } from "react-router";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
    <Routes>
    <Route path={"/register"} element={<Register />} />
    <Route path={"/"} element={<MainPage />} />
    </Routes>
    </>
  );
}
export default App;
