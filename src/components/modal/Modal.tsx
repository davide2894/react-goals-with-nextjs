import { ReactNode, SetStateAction, SyntheticEvent, useEffect } from "react";

function Modal(props: { onClose: any; children?: ReactNode; mode?: string }) {
  const { mode, onClose, children } = props;

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        onClose();
        console.log("escape pressed");
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  function onCloseClick() {
    props.onClose();
  }

  function closeModalOnClickOutside(evt: SyntheticEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.currentTarget.classList.contains("modalOverlay") && props.onClose();
  }

  return (
    <div
      className="modalOverlay absolute top-0 bottom-0 left-0 right-0 bg-transparent backdrop-blur-md z-10"
      onClick={(evt) => closeModalOnClickOutside(evt)}>
      <button
        className="absolute top-0 right-0 w-[55px] h-[55px]"
        onClick={onCloseClick}>
        <span className="block w-[25px] h-[25px] bg-no-repeat bg-center bg-contain bg-[url('../../public/close-button.svg')]"></span>
      </button>
      <div
        className="p-5 m-14  bg-gray-700 rounded"
        onClick={(evt) => {
          evt.stopPropagation();
        }}>
        <div>
          <h2>{mode === "add" ? "Add Goal" : "Edit Goal"}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
