import { useState } from "react";
import { getAllAppointments } from "../helpers/get.js";
import { useContext } from "react";
import ModalContext from "../context/ModalContext.jsx"

function searchBar() {
    const { isOpen, setIsOpen } = useContext(ModalContext);
    const [filter, setFilter] = useState([]);


  return (
    <>
      <div className={isOpen ? "filter-open" : "filter-closed"}>
        <div className="">
          <input type="text" className="w-[450px] rounded-l-lg"></input>
        </div>
        <div className="">
          <select className="">
            <option value="" disabled selected>Sort by:</option>
            <option value="1">Pet name</option>
            <option>Date</option>
            <option>Owner</option>
            <hr className="full"></hr>
            <option>ASC</option>
            <option>DESC</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default searchBar;
