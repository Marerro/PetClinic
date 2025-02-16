import { useContext } from "react";
import ModalContext  from "../context/ModalContext";
import Header from "./Header";
import AddAppointment from "./AddAppointment";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { useState } from "react";
import AppointmentList from "./AppointmentList";

function MainPage() {

    return (
        <>
            <Header />
            <AddAppointment />
            <AppointmentList />
            <Footer />
        </>
    );
}

export default MainPage;
