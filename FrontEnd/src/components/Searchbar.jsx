import { useState, useEffect } from "react";
import { getFilteredAppointments } from "../helpers/get.js";
import { useContext } from "react";
import ModalContext from "../context/ModalContext.jsx";
import searchContext from "../context/searchContext.jsx";
import AppointmentList from "./AppointmentList.jsx";

function SearchBar({query, setQuery, setFilteredAppointments}) {
  const { select, setSelected } = useContext(searchContext);
  const { isOpen, setIsOpen } = useContext(ModalContext);

  useEffect(() => {
    if (query === "") return setFilteredAppointments([]);
    const filterAppointments = async () => {
      const response = await getFilteredAppointments(query);
      setFilteredAppointments(response.data);
    };
    filterAppointments();
  }, [query, setFilteredAppointments]);

  const handleFilter = (value) => {
    setSelected(value);
    console.log(value);
  };

  useEffect(() => {}, [select]);

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
          <select onChange={(e) => handleFilter(e.target.value)} className="">
            <option disabled selected>
              Sort by:
            </option>
            <option value={"petname"}>Pet name</option>
            <option value={"date"}>Date</option>
            <option value={"owner"}>Owner</option>
            <hr className="full"></hr>
            <option value={"asc"}>ASC</option>
            <option value={"desc"}>DESC</option>
            <p>{select}</p>
          </select>
        </div>
      </div>
        </>
      )
}

export default SearchBar;
