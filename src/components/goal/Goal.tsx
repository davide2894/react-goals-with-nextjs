import Modal from "@components/modal/Modal";
import GoalForm from "@components/goalForm/GoalForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrementScore,
  deleteGoal,
  resetGoal,
  incrementScore,
  updateGoalTitle,
} from "@goalSlice";
import ButtonIcon from "@components/buttonIcon/ButtonIcon";
import trimString from "@utils/trimString";

function Goal({ goal }: any) {
  const [showEditGoalForm, setShowEditGoalForm] = useState(false);
  const [editableTitleValue, setEditableTitleValue] = useState(goal.title);
  const isComplete = goal.score.actual === goal.score.max;
  const dispatch = useDispatch();
  const goalCsslasses = `goal mb-6 ml-6 mr-6 ${
    isComplete ? "text-yellow-500" : "text-white"
  }`;
  const testTitleCssClasses = `text-lg goal-text ${
    isComplete ? "after:content-['✓'] after:ml-2" : ""
  }`;
  function onEditFormOpenHandler() {
    setShowEditGoalForm(true);
  }

  function handleTitleChange(e: { target: { innerHTML: string } }) {
    const trimmedEventValue = trimString(e.target.innerHTML);
    if (trimmedEventValue && editableTitleValue !== trimmedEventValue) {
      setEditableTitleValue(trimmedEventValue);
    }
  }

  useEffect(() => {
    dispatch(updateGoalTitle({ goal, editableTitleValue }));
    return () => {};
  }, [editableTitleValue, dispatch, goal]);

  return (
    <div data-testid="goalTest" className={goalCsslasses}>
      <p
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={handleTitleChange}
        className={testTitleCssClasses}>
        {editableTitleValue}
      </p>
      <div className="flex mt-2 items-end">
        <div className="score text-2xl">
          <span>{goal.score.actual}</span>
          <span>/</span>
          <span>{goal.score.max}</span>
        </div>
        <div className="scoreButtons ml-4 mr-4">
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
            className="editButton mr-4 group"
            disabled={isComplete}
            onClick={onEditFormOpenHandler}>
            <ButtonIcon iconName="edit-button" />
          </button>
          <button
            className="deleteButton mr-4 group"
            title="delete goal"
            onClick={() => dispatch(deleteGoal(goal))}>
            <ButtonIcon iconName="delete-button" />
          </button>
          <button
            className="resetButton group"
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
