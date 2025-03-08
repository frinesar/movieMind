import { ReactNode } from "react";

function Modal({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) {
  return (
    <div
      onClick={() => closeModal()}
      className="z-40 bg-black/50  absolute top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">
        {children}
      </div>
    </div>
  );
}

export default Modal;
