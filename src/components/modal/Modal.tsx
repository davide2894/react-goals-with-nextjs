import { useEffect } from "react";
// @TODO tailwind -> import "./Modal.scss";

function Modal(props) {
  const { mode, onClose } = props;

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

  function closeModalOnClickOutside(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.currentTarget.classList.contains("modalOverlay") && props.onClose();
  }

  return (
    <div
      className="goalForm editGoalForm modal modalOverlay"
      onClick={(evt) => closeModalOnClickOutside(evt)}>
      <button
        className="editGoalForm__close modalOverlay__closeButton"
        onClick={onCloseClick}>
        <span className="modalOverlay__closeIcon"></span>
      </button>
      <div
        className="modalOverlay__main"
        onClick={(evt) => {
          evt.stopPropagation();
        }}>
        <div className="modalOverlay__content form">
          <h2 className="modalOverlay__h2">
            {mode === "add" ? "Add Goal" : "Edit Goal"}
          </h2>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
