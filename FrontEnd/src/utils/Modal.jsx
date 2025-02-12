import react from "react";
import "../modal.css"
import ModalContext from "../context/ModalContext"
import { useContext } from "react";

const Modal = ({ children }) => {
    const {isOpen} = useContext(ModalContext);
    if(!isOpen) return null

    return (
        <div
        className="modal-overlay"
        >
            <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className="modal-content"
              >
                  {children}
            </div>
        </div>
    )
}

export default Modal;