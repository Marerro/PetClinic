import { useState, useEffect } from "react";
import { getFilteredAppointments } from "../helpers/get.js";
import { useContext } from "react";
import ModalContext from "../context/ModalContext.jsx";
import UserContext from "../context/UserContext";


function SearchBar({query, setQuery, setFilteredAppointments, filteredAppointments, setSelected, select, setOrder, order}) {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const {user} = useContext(UserContext);

  console.log("My user", user);
  console.log("Filtered appointments:", filteredAppointments);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
 
        if (user.roles?.includes("admin")) {
          const response = await getFilteredAppointments(query, select, order);
          setFilteredAppointments(response.data);
          return;
        }
  
        if (user.roles?.includes("user")) {
          const response = await getFilteredAppointments(query, select, order);
          const userAppointments = response.data.filter((app) => app.user_id === user.id);
          setFilteredAppointments(userAppointments);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAppointments();
  }, [query, select, order, user]);
  
  

  const handleSortAndOrder = (value) => {
    if (value === "ASC" || value === "DESC") {
      setOrder(value);
    } else {
      setSelected(value);
    }
  };

  return (
    <>
      <div className={isOpen ? "filter-open" : "filter-closed"}>
        <div className="">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="w-[450px] rounded-l-lg"
          ></input>
        </div>
        <div className="">
          <select onChange={(e) => handleSortAndOrder(e.target.value)} className="">
            <option disabled selected>
              Sort by:
            </option>
            <option  value={"petname"}>Pet name</option>
            <option  value={"date"}>Date</option>
            <option  value={"owner"}>Owner</option>
            <hr className="full"></hr>

            <option value={"asc"}>ASC</option>
            <option value={"desc"}>DESC</option>
            </select>
        </div>
      </div>
        </>
      )
}

export default SearchBar;
