import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
    if (typeof window === "undefined") return null;

    return createPortal(
        <div id="modal-portal" className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center max-h-dvh">
            {children}
        </div>,
        document.body
    );
};

export default Modal;
