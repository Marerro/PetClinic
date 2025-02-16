import { updateAppointment } from "../helpers/appointments";
import {useState} from "react";
import EditAppointmentModal from "./EditAppointmentModal";
import { useContext } from "react";
import AppointmentContext from "../context/AppointmentContext"; 

const AppointmentActions = ({ appointment, userPermissions = {} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const { setAppointments } = useContext(AppointmentContext);
    return (
        <>
          <button onClick={() => {
            setSelectedAppointment(appointment); 
            setIsOpen(true);
          }}>
            Edit
          </button>
          {isOpen && selectedAppointment && (
            <EditAppointmentModal 
              appointment={selectedAppointment}
              setAppointments={setAppointments}
              userPermissions={userPermissions} 
              onClose={() => setIsOpen(false)}
            />
          )}
        </>
      );
    };

export default AppointmentActions;
