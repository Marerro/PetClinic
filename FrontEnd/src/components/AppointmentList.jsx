import { useState, useEffect, useContext } from "react";
import { getAllAppointments } from "../helpers/get.js";
import ModalContext from "../context/ModalContext";
import UserContext from "../context/UserContext.jsx";
import "../index.css";

function AppointmentList({ query, filteredAppointments }) {
  const [appointments, setAppointments] = useState([]);
  const { isOpen } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  console.log("Current user:", user); 

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await getAllAppointments();
        if (response?.data) {
          setAppointments(response.data);
        } else {
          console.error("API response is empty:", response);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    getAppointments();
  }, []); 

  const isAdmin = user?.data.roles === "admin"; 

  const renderAppointments = () => {
    if (!isAdmin) return null;

    return appointments.map((app, index, arr) => {
      const { id, petname, petowner, description, date, time } = app;

      return (
        <div
          key={id}
          className={`card ${isOpen ? "card-opened" : "card-closed"} ${
            index === arr.length - 1 ? "pb-[8vh]" : ""
          }`}
        >
          <div className="flex gap-2 items-center w-full pb-2">
            <div>Here will be icons</div>

            {/* left side of List */}
            <div className="flex flex-col w-full">
              <p className="text-violet-800 text-[25px]">{petname}</p>
              <p className="text-[18px]">
                <span className="text-gray-600 text-[18px]">Owner:</span> {petowner}
              </p>
              <p className="text-[18px]">{description}</p>
            </div>

            {/* right side of List */}
            <div className="w-full ">
              <p className="text-right">{date} {time}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderFilteredAppointments = () => {
    if (!query || !isAdmin) return null;
    if (!filteredAppointments?.length) return null;

    return filteredAppointments.map((filter, index, arr) => (
      <div
        key={filter.id}
        className={`${
          index === arr.length - 1 ? "pb-[8vh] border-b-0" : ""
        } max-w-[67rem] mx-auto mt-[3vh] h-auto justify-between border-b-2 border-indigo-500`}
      >
        <div className="flex gap-2 items-center w-full pb-2">
          <div className="flex flex-col w-full">
            <p className="text-violet-800 text-[25px]">{filter.petname}</p>
            <p>
              <span>Owner:</span> {filter.petowner}
            </p>
            <p>{filter.description}</p>
          </div>
          <div className="w-full">
            <p className="text-right">
              {filter.date} {filter.time}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return <>{query ? renderFilteredAppointments() : renderAppointments()}</>;
}

export default AppointmentList;
