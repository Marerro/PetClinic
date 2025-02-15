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
    const [select, setSelected] = useState(null);
    const [order, setOrder] = useState(null);

    return (
        <>
            <Header />
            <AddAppointment />
            <SearchBar select={select} setSelected={setSelected} setOrder={setOrder} order={order} query={query} setQuery={setQuery} setFilteredAppointments={setFilteredAppointments} />
            <AppointmentList query={query} select={select} order={order} filteredAppointments={filteredAppointments} />
            <Footer />
        </>
    );
}

export default MainPage;
