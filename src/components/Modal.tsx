import { ReactNode } from "react";
import { createPortal } from "react-dom";

function Modal({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) {
  return createPortal(
    <div
      onClick={() => closeModal()}
      className="z-40 bg-black/50  fixed top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
