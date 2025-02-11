import react from "react";

const Modal = ({isOpen, onClose, children }) => {
    if(!isOpen) return null
    return (
        <div
        onClick={onClose}
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        }}
        >
            <div
            onClick={(e) =>{ e.stopPropagation()}}
            style={{
                background: "#FFF",
                border: "1px solid #D3D3D3",
                position: "absolute",
                top: "11.6%",
                width: "1072px",
                margin: "margin",
                height: "20%",
                left: "29.05%"
            }}
              >
                {children}  
            </div>
        </div>
    )
}

export default Modal;