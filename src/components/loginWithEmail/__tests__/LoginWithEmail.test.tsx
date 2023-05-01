import LoginWithEmail from "../LoginWithEmail";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Login component renders correctly", () => {
  render(<LoginWithEmail />);
  const loginComponentWrapper = screen.getByTestId("loginComponentTest");
  expect(loginComponentWrapper).toBeInTheDocument();
  expect(loginComponentWrapper).toHaveClass("bg-white");
  expect(loginComponentWrapper).toHaveClass("shadow-md");
});

test("Login component matches its own snapshot", () => {
  const tree = renderer.create(<LoginWithEmail />).toJSON();
  expect(tree).toMatchSnapshot();
});
