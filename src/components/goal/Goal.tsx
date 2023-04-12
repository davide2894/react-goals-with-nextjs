// @TODO tailwind -> import "./Goal.scss";
import Modal from "../modal/Modal";
import GoalForm from "../goalForm/GoalForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrementScore,
  deleteGoal,
  resetGoal,
  incrementScore,
} from "../../redux/slices/goalSlice";

function Goal({ goal, currentUser }) {
  const [showEditGoalForm, setShowEditGoalForm] = useState(false);
  const isComplete = goal.score.actual === goal.score.max;
  const goalWrapperClasses = `goal ${
    goal && isComplete ? "goal--isComplete" : ""
  }`;
  const dispatch = useDispatch();

  function onEditFormOpenHandler() {
    setShowEditGoalForm(true);
  }

  return (
    <div data-testid="goalTest" className={goalWrapperClasses}>
      <p className="goal__title">{goal.title}</p>
      <div className="score">
        <div className="score__numbers">
          <span className="score__actual">{goal.score.actual}</span>
          <span className="score__separator">/</span>
          <span className="score__toReach">{goal.score.max}</span>
        </div>
        <div className="score__ctas">
          <button
            title="decrease score by 1"
            className="score__button score__button--decrease"
            onClick={() => dispatch(decrementScore(goal))}
            disabled={goal.score.actual === goal.score.min || isComplete}>
            <span className="icon score__buttonIcon score__buttonIcon--decreaseScore"></span>
          </button>
          <button
            title="increase score by 1"
            className="score__button score__button--increase"
            onClick={() => dispatch(incrementScore(goal))}
            disabled={goal.score.actual === goal.score.max || isComplete}>
            <span className="icon score__buttonIcon score__buttonIcon--increaseScore"></span>
          </button>
        </div>
        <div className="score__otherActionsWrapper">
          <button
            title="edit goal"
            className="score__button score__button--edit"
            disabled={isComplete}
            onClick={onEditFormOpenHandler}>
            <span className="icon score__buttonIcon score__buttonIcon--edit"></span>
          </button>
          <button
            title="delete goal"
            className="score__button score__button--delete"
            onClick={() => dispatch(deleteGoal(goal))}>
            <span className="icon score__buttonIcon score__buttonIcon--delete"></span>
          </button>
          <button
            title="reset goal score"
            className="score__button score__button--reset"
            disabled={goal.score.actual === 0}
            onClick={() => dispatch(resetGoal(goal))}>
            <span className="icon score__buttonIcon score__buttonIcon--reset"></span>
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
