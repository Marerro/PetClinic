import { useContext } from "react";
import ModalContext  from "../context/ModalContext";
import Header from "./Header";
import AddAppointment from "./AddAppointment";
import SearchBar from "./SearchBar";
import AppointmentList from "./AppointmentList";

function MainPage() {
    const { isOpen, setIsOpen } = useContext(ModalContext); 

    return (
        <>
            <Header />
            <AddAppointment />
            <SearchBar />
            <AppointmentList />
        </>
    );
}

export default MainPage;
