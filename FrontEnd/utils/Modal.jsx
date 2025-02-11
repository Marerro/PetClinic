import react from "react";
import "../src/modal.css"

const Modal = ({isOpen, setIsOpen, children }) => {
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