import { useState, useEffect } from "react";
import { getFilteredAppointments } from "../helpers/get.js";
import { useContext } from "react";
import ModalContext from "../context/ModalContext.jsx";
import searchContext from "../context/searchContext.jsx";
import AppointmentList from "./AppointmentList.jsx";

function SearchBar({query, setQuery, setFilteredAppointments, setSelected, select, setOrder, order}) {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  useEffect(() => {
    if (query === "") return setFilteredAppointments([]);
    const filterAppointments = async () => {
      const response = await getFilteredAppointments(query, select, order);
      setFilteredAppointments(response.data);
    };
    filterAppointments();
  }, [query, select, order]);

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
