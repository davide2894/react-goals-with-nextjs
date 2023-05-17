import { useState } from "react";
import GoalForm from "../goalForm/GoalForm";
import Modal from "@components/modal/Modal";
import ButtonIcon from "@components/buttonIcon/ButtonIcon";

function NewGoalButton() {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  return (
    <div>
      <button
        className="newGoalButton fixed flex flex-col justify-center right-5 bottom-16 md:bottom-5 w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-700"
        onClick={() => setShowNewGoalForm(true)}>
        <ButtonIcon iconName="add-icon" customCssClasses="ml-auto mr-auto" />
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
