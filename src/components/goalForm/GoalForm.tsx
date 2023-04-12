import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGoal, updateGoal } from "../../redux/slices/goalSlice";
import { v4 as uuidv4 } from "uuid";
import { Goal, FormProps } from "../../types";
//@TODO tailwind -> import "./GoalForm.scss";

function GoalForm(props: FormProps) {
  const [goalTitle, setGoalTitle] = useState(
    props.titleToEdit ? props.titleToEdit : ""
  );
  const [goalScore, setGoalScore] = useState(
    props.maxScoreToEdit ? props.maxScoreToEdit : ""
  );

  const dispatch = useDispatch();

  function onFormSubmit(evt) {
    evt.preventDefault();

    const goal: Goal = {
      title: goalTitle,
      score: {
        max: parseInt(goalScore),
        min: 0,
        actual: 0,
      },
      id: props.goalToEditId ? props.goalToEditId : uuidv4(),
    };

    if (props.mode) {
      if (props.mode === "add") {
        dispatch(addGoal(goal));
      } else if (props.mode === "edit") {
        dispatch(updateGoal(goal));
      }
    }

    if (props.onGoalFormSubmit) {
      props.onGoalFormSubmit();
    }
  }

  return (
    <form onSubmit={(evt) => onFormSubmit(evt)}>
      <div className="goalForm__name">
        <label htmlFor="nameInput" className="goalForm__nameLabel">
          Goal title:
          <input
            type="text"
            name="name"
            required
            id="nameInput"
            value={goalTitle}
            onChange={(evt) => {
              setGoalTitle(evt.target.value);
            }}
          />
        </label>
      </div>
      <div className="goalForm__score">
        <label htmlFor="scoreInput">
          times to meet per week
          <input
            type="number"
            required
            name="score"
            min="0"
            id="scoreInput"
            value={goalScore}
            onChange={(evt) => {
              setGoalScore(evt.target.value);
            }}
          />
        </label>
      </div>
      <button type="submit" value="Submit">
        Submit
      </button>
    </form>
  );
}

export default GoalForm;
