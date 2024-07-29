import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Invoice from "./Invoice.js";
import { useParams } from "react-router-dom";

const Example = () => {
  const params = useParams();
  const orderId = params.id;

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Invoice orderId={orderId} ref={componentRef} />

      <button
        style={{
          padding: "1rem",
          backgroundColor: "#1B61B5",
          color: "white",
          borderRadius: "10px",
          margin: "auto",
          marginBottom: "1rem",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          fontSize:"15px",
          fontWeight:"600",
          cursor:"pointer"
        }}
        onClick={handlePrint}
      >
        Print Invoice
      </button>
    </div>
  );
};

export default Example;
