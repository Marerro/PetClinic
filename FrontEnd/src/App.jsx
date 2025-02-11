import Register from "./components/Register";
import { Route, Routes , Navigate} from "react-router";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Navigate to="/register" />} />
    <Route path={"/register"} element={<Register />} />
    <Route path={"/main"} element={<MainPage />} />
    </Routes>
    </>
  );
}
export default App;
