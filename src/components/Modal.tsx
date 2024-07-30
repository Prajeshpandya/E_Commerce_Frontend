import { createPortal } from "react-dom";
import { forwardRef } from "react";

const ModalNew = forwardRef(({ children, className = "" }, ref) => {
  const OVERLAY = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.7)",
    zIndex: 1000,
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "27px",
    zIndex: 1000,
  };

  return createPortal(
    <>
      <div style={OVERLAY} />
      <div ref={ref} style={modalStyle} className={`modal ${className}`}>
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
});

export default ModalNew;
