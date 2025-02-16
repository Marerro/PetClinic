import { createContext, useState, useEffect } from "react";
import {getAllAppointments} from "../helpers/get.js"
import {useContext} from "react";
import AppointmentContext from "./AppointmentContext";

function AppointmentContextProvider({ children }) {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await getAllAppointments();
                setAppointments(data); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const updateAppointmentState = (updatedAppointment) => {
        setAppointments(prevAppointments => prevAppointments.map(
            appointment => appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        ));
    };
    

    return (
        <AppointmentContext.Provider value={{ appointments, setAppointments, updateAppointmentState, error, loading }}>
            {children}
        </AppointmentContext.Provider>
    );
}

export default AppointmentContextProvider