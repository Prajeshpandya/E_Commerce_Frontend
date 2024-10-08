import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/reducer/modalReducer";
import { RootState } from "../redux/store";
import DetailModal from "./DetailModal";
import { useGetReviewsQuery } from "../redux/api/ProductApi";
import { useEffect } from "react";

type Modal = {
  title: string;
  children: any;
};

export default function Modal() {
  const dispatch = useDispatch();

  const { modal, selectedProduct } = useSelector(
    (state: RootState) => state.modalReducer
  );

  if (!modal || !selectedProduct) return null;

  const close = () => {
    dispatch(closeModal());
  };


  const { data, isError, isLoading, error } = useGetReviewsQuery(
    selectedProduct._id
  );


  return createPortal(
    <>
      <div className="backdrop" onClick={close} />

      {/* Ok, so this modal is not part of dom so we can't apply directly the motion props to its parents we have to apply it ti actual modal as we did it here! */}
      <motion.dialog
        // initial={{ opacity: 0, y: 30 }} //So this inital prop show the inital state of this element!
        // animate={{ opacity: 1, y: 0 }} //Animate shows the animation as we know it already!
        // exit={{ opacity: 0, y: -30 }} //And Exit will show the final state of the element when it will be push out from the dom (i.e when it will remove from dom!)
        // // This will not direactly work as react component will direactly check if this modal can be part of the dom or not as from the condition where this modal is rendering so we have to tell react to not to do that which you can see at that component where this modal has been called!
        // // Go to header.jsx to see that!

        // There is another way of doing it also
        // You can store this objects as varints can use it directly like shown as below code
        variants={{
          opening: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
          closing: { opacity: 0, y: -30 },
        }}
        // Variants can also use to childern component of wrapper component or any other components wihc has child components
        // For here go checkout NewChallenge.jsx
        initial="opening"
        animate="visible"
        exit="closing"
        open
        className="modal"
      >
        <DetailModal product={selectedProduct} reviews={data} />
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
