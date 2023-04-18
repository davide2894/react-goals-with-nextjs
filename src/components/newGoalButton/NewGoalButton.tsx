//@TODO: tailwing -> import "./NewGoalButton.scss";
import { useState } from "react";
import GoalForm from "../goalForm/GoalForm";
import Modal from "@components/modal/Modal";

function NewGoalButton() {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  return (
    <div>
      <button
        className="fixed flex justify-center right-5 bottom-16 md:bottom-5 w-16 h-16 align-middle rounded-full bg-yellow-500 hover:bg-yellow-700"
        onClick={() => setShowNewGoalForm(true)}>
        <p className="text-black text-center text-5xl font-bold">+</p>
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
