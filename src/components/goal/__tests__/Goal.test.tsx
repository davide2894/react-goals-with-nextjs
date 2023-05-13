import Goal from "@components/goal/Goal";
import { cleanup, screen } from "@testing-library/react";
import { GoalType } from "@types";
import { renderWithProviders } from "@utils/testUtils";

afterEach(() => {
  cleanup();
});

const goal: GoalType = {
  id: "ed04edbb-8ced-4cdf-a629-c7a57bd5824e",
  title: "test goal",
  score: {
    max: 5,
    min: 0,
    actual: 1,
  },
  userIdRef: "exampleIdRef",
  timestamp: Date.now(),
};

const completedGoal = {
  ...goal,
  score: {
    ...goal.score,
    actual: 5,
  },
};

const currentUser = {
  email: "testcurrentuseremailforreact@yopmail.com",
  uid: "bbgQNkAxgEZrxB5ZkEXZIAdZARB2",
  userDocId:
    "testcurrentuseremailforreact@yopmail.com-bbgQNkAxgEZrxB5ZkEXZIAdZARB2",
};

test("Goal component renders correctly with its class", () => {
  renderWithProviders(<Goal goal={goal} currentUser={currentUser} />);
  const goalComponentWrapper = screen.getByTestId("goalTest");
  expect(goalComponentWrapper).toBeInTheDocument();
});

test("If goal prop has goal.isComplete field value, then Goal component should have goal--completed class", () => {
  renderWithProviders(<Goal goal={completedGoal} currentUser={currentUser} />);
  const goalComponentWrapper = screen.getByTestId("goalTest");
  expect(goalComponentWrapper).toBeInTheDocument();
  expect(goalComponentWrapper).toHaveClass("text-yellow-500");
});
