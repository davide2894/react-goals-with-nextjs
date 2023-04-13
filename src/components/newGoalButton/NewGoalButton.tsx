//@TODO: tailwing -> import "./NewGoalButton.scss";
import { useState } from "react";
import GoalForm from "../goalForm/GoalForm";
import Modal from "../modal/Modal";

function NewGoalButton() {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  return (
    <div className="newGoalButton newGoalButton__wrapper">
      <button
        className="newGoalButton__button cta"
        onClick={() => setShowNewGoalForm(true)}>
        +
      </button>
      {showNewGoalForm && (
        <Modal mode="add" onClose={() => setShowNewGoalForm(false)}>
          <GoalForm
            mode="add"
            onGoalFormSubmit={() => setShowNewGoalForm(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default NewGoalButton;
