import Modal from "@components/modal/Modal";
import GoalForm from "@components/goalForm/GoalForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrementScore,
  deleteGoal,
  resetGoal,
  incrementScore,
} from "@redux/slices/goalSlice";
import ButtonIcon from "@components/buttonIcon/ButtonIcon";

function Goal({ goal }: any) {
  const [showEditGoalForm, setShowEditGoalForm] = useState(false);
  const isComplete = goal.score.actual === goal.score.max;
  const dispatch = useDispatch();
  const goalCsslasses = `mb-6 ${isComplete ? "text-yellow-500" : "text-white"}`;
  const testTitleCssClasses = `text-lg ${
    isComplete ? "after:content-['✓'] after:ml-2" : ""
  }`;
  function onEditFormOpenHandler() {
    setShowEditGoalForm(true);
  }

  return (
    <div data-testid="goalTest" className={goalCsslasses}>
      <p className={testTitleCssClasses}>{goal.title}</p>
      <div className="flex mt-2 items-end">
        <div className="text-2xl">
          <span>{goal.score.actual}</span>
          <span>/</span>
          <span>{goal.score.max}</span>
        </div>
        <div className="ml-4 mr-4">
          <button
            title="decrease score by 1"
            className="mr-2 ml-2 group"
            onClick={() => dispatch(decrementScore(goal))}
            disabled={goal.score.actual === goal.score.min || isComplete}>
            <ButtonIcon iconName="score-decrease-button" />
          </button>
          <button
            title="increase score by 1"
            className="group"
            onClick={() => dispatch(incrementScore(goal))}
            disabled={goal.score.actual === goal.score.max || isComplete}>
            <ButtonIcon iconName="score-increase-button" />
          </button>
        </div>
        <div>
          <button
            title="edit goal"
            className="mr-4 group"
            disabled={isComplete}
            onClick={onEditFormOpenHandler}>
            <ButtonIcon iconName="edit-button" />
          </button>
          <button
            className="mr-4 group"
            title="delete goal"
            onClick={() => dispatch(deleteGoal(goal))}>
            <ButtonIcon iconName="delete-button" />
          </button>
          <button
            className="group"
            title=""
            disabled={goal.score.actual === 0}
            onClick={() => dispatch(resetGoal(goal))}>
            <ButtonIcon iconName="reset-button" />
          </button>
          {showEditGoalForm && (
            <Modal mode="edit" onClose={() => setShowEditGoalForm(false)}>
              <GoalForm
                goalToEditId={goal.id}
                titleToEdit={goal.title}
                maxScoreToEdit={goal.score.max}
                mode="edit"
                onGoalFormSubmit={() => setShowEditGoalForm(false)}
              />
            </Modal>
          )}
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default Goal;
