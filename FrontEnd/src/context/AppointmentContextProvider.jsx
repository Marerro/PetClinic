import { createContext, useState, useEffect } from "react";
import {getAllAppointments} from "../helpers/get.js"
import {useContext} from "react";
import AppointmentContext from "./AppointmentContext";

function AppointmentContextProvider({ children }) {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await getAllAppointments(limit, page);

                setAppointments(data.allAppointments); 
                
                const totalAppointmentsCount = data.total?.count
                setTotalAppointments(totalAppointmentsCount);

                const calculatedTotalPages = Math.ceil(totalAppointmentsCount / limit);
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [limit, page]);

    const updateAppointmentState = (updatedAppointment) => {
        setAppointments(prevAppointments => prevAppointments.map(
            appointment => appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        ));
    };
    

    return (
        <AppointmentContext.Provider value={{ appointments, setAppointments, updateAppointmentState, error, loading, page, setPage, totalPages, totalAppointments }}>
            {children}
        </AppointmentContext.Provider>
    );
}

export default AppointmentContextProvider