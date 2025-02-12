import { useContext } from "react";
import ModalContext  from "../context/ModalContext";
import Header from "./Header";
import AddAppointment from "./AddAppointment";
import SearchBar from "./SearchBar";
import AppointmentList from "./AppointmentList";
import Footer from "./Footer";

function MainPage() {
    const { isOpen, setIsOpen } = useContext(ModalContext); 

    return (
        <>
            <Header />
            <AddAppointment />
            <SearchBar />
            <AppointmentList />
            <Footer />
        </>
    );
}

export default MainPage;
