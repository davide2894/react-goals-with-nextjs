import Goal from "../Goal";
import { cleanup, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/testUtils";

afterEach(() => {
  cleanup();
});

const goal = {
  id: "ed04edbb-8ced-4cdf-a629-c7a57bd5824e",
  isComplete: false,
  title: "test goal",
  score: {
    max: 5,
    actual: 1,
    min: 0,
  },
};

const conpletedGoal = {
  ...goal,
  isComplete: true,
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
  expect(goalComponentWrapper).toHaveClass("goal");
});

test("If goal prop has goal.isComplete field value, then Goal component should have goal--completed class", () => {
  renderWithProviders(<Goal goal={conpletedGoal} currentUser={currentUser} />);
  const goalComponentWrapper = screen.getByTestId("goalTest");
  expect(goalComponentWrapper).toBeInTheDocument();
  expect(goalComponentWrapper).toHaveClass("goal--isComplete");
});
