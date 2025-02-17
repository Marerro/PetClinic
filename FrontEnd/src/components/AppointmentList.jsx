import { useContext, useState } from "react";
import AppointmentContext from "../context/AppointmentContext";
import EditAppointmentModal from "./EditAppointmentModal";
import SearchBar from "./SearchBar";
import UserContext from "../context/UserContext";
import {
  deleteAppointment,
  editAppointmentStatus,
} from "../helpers/appointments";

function AppointmentList() {
  const { appointments, setAppointments, error, setError, page, setPage, totalPages } =
    useContext(AppointmentContext);
  const { user, loading } = useContext(UserContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [query, setQuery] = useState("");
  const [select, setSelected] = useState("petname");
  const [order, setOrder] = useState("asc");

  if (!appointments || appointments.length === 0) {
    return <p className="text-gray-500 text-center">No appointments available.</p>;
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user) {
    return <p>Please log in</p>;
  }

  const isAdmin = user.roles.includes("admin");
  const loggedInUser = user.id;

  const handleDelete = async (id) => {
    try {
      const response = await deleteAppointment(id);
      if (response) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app.id !== id)
        );
      }
    } catch (error) {
      console.log("delete failed", error);
    }
  };

  console.log(appointments);

  const handleStatus = async (id, status) => {
    try {
      const response = await editAppointmentStatus(id, status);
      if (response) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: status }
              : appointment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
        setPage(prevPage => prevPage + 1);
    }
};

const handlePrevPage = () => {
    if (page > 1) {
        setPage(prevPage => prevPage - 1);
    }
};

  const renderAppointments = () => {
    const userAppointments = isAdmin
      ? appointments
      : appointments.filter(
          (appointment) => appointment.user_id === loggedInUser
        );

    const displayedAppointments = query
      ? filteredAppointments
      : userAppointments;

    return displayedAppointments.map((appointment, index, arr) => {
      const { id, petname, petowner, description, date, time, status } = appointment;

      return (
        <div
          key={id}
          className={`card max-w-[67rem] border-b-2  border-indigo-500 mx-auto mt-5 h-auto flex justify-between  ${
            index === arr.length - 1 ? "border-none mb-[10vh]" : ""
          } `}
        >
          {/* left side */}
          <div className="flex items-center gap-4 w-4/6 pb-3">
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

            <div className="flex flex-col w-full pb-3">
              <p className="text-violet-800 text-2xl font-bold">{petname}</p>
              <p className="text-lg">
                <span className="text-gray-600">Owner: </span> {petowner}
              </p>
              <p className="text-md text-gray-700">{description}</p>
            </div>
          </div>

          {/* right side */}
          <div className="text-gray-700 flex flex-col items-end gap-1 ">
            <p className="text-center">
              {date} {time}
            </p>
            {isAdmin ? (
              <div>
                <p>Current status:{appointment.status}</p>
              <select
                value={appointment.status}
                onChange={(e) => handleStatus(id, e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-4 py-2 w-[150px]"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </select>
              </div>
            ) : (
              <span className="border border-gray-300 rounded-md px-4 py-2">{appointment.status}</span>
            )}

          </div>
        </div>
      );
    });
  };

  return (
    <div className="pb-20">
      <SearchBar
        query={query}
        setQuery={setQuery}
        filteredAppointments={filteredAppointments}
        setFilteredAppointments={setFilteredAppointments}
        select={select}
        setSelected={setSelected}
        order={order}
        setOrder={setOrder}
      />

      {renderAppointments()}

      <div className="flex justify-center items-center gap-4">
        <button
            disabled={page <= 1}
            onClick={handlePrevPage}
            className="p-1 w-[100px] border rounded-md bg-gray-300"
        >
            Previous
        </button>

        <button  
            disabled={page >= totalPages} 
            onClick={handleNextPage}
            className="p-1 w-[100px] border rounded-md bg-gray-300"
        >
            Next
        </button>
    </div>

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
