import { useContext } from "react";
import ModalContext  from "../context/ModalContext";
import Header from "./Header";
import AddAppointment from "./AddAppointment";
import AppointmentList from "./AppointmentList";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { useState } from "react";

function MainPage() {
    const { isOpen, setIsOpen } = useContext(ModalContext); 
    const [query, setQuery] = useState("");
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    return (
        <>
            <Header />
            <AddAppointment />
            <SearchBar query={query} setQuery={setQuery} setFilteredAppointments={setFilteredAppointments} />
            <AppointmentList query={query} filteredAppointments={filteredAppointments} />
            <Footer />
        </>
    );
}

export default MainPage;
