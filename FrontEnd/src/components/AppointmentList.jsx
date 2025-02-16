import { useContext, useState } from "react";
import AppointmentContext from "../context/AppointmentContext";
import EditAppointmentModal from "./EditAppointmentModal";
import SearchBar from "./SearchBar";
import UserContext from "../context/UserContext";
import {deleteAppointment} from "../helpers/appointments"

function AppointmentList() {
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const { user, loading } = useContext(UserContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [query, setQuery] = useState("");
  const [select, setSelected] = useState("petname");
  const [order, setOrder] = useState("asc");

  if (!appointments || appointments.length === 0) {
    return <p className="text-gray-500">No appointments available.</p>;
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if(!user) {
    return <p>Please log in</p>
  }

  const isAdmin = user.roles.includes("admin"); 
  const loggedInUser = user.id

  const handleDelete = async (id) => {
    try {
      const response = await deleteAppointment(id);
      if(response) {
        setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== id))
      }
    } catch (error) {
      console.error("delete failed", error);
    }
  }

  const renderAppointments = () => {
    const userAppointments = isAdmin
    ? appointments
    : appointments.filter((appointment) => appointment.user_id === loggedInUser);
  
    const displayedAppointments = query ? filteredAppointments : userAppointments;
  
    return displayedAppointments.map((appointment, index, arr) => {
      const { id, petname, petowner, description, date, time } = appointment;
  
      return (
        <div
          key={id}
          className={`card max-w-[67rem] mx-auto mt-5 h-auto flex justify-between border-b-2 border-indigo-500 ${
            index === arr.length - 1 ? "border-none" : ""
          } `}
        >
          {/* left side */}
          <div className="flex items-center gap-4 w-4/6">
          <div className="flex flex-col gap-3">
          <button
              className="px-5 py-1 bg-blue-500 text-white rounded"
              onClick={() => setSelectedAppointment(appointment)}
            >
              Edit
            </button>

            <button
            className="px-5 py-1 bg-blue-500 text-white rounded"
            onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
  
            <div className="flex flex-col w-full">
              <p className="text-violet-800 text-2xl font-bold">{petname}</p>
              <p className="text-lg">
                <span className="text-gray-600">Owner: </span> {petowner}
              </p>
              <p className="text-md text-gray-700">{description}</p>
            </div>
          </div>
  
          {/* right side */}
          <div className="w-2/6 text-right text-gray-700">
            <p className="text-center">{date} {time}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <SearchBar
        query={query}
        setQuery={setQuery}
        setFilteredAppointments={setFilteredAppointments}
        select={select}
        setSelected={setSelected}
        order={order}
        setOrder={setOrder}
      />

      {renderAppointments()}

      {selectedAppointment && (
        <EditAppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
}

export default AppointmentList;
