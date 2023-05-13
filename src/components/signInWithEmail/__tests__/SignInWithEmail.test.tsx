import SignInWithEmail from "@components/signInWithEmail/SignInWithEmail";
import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "@utils/testUtils";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Login component renders correctly", () => {
  renderWithProviders(<SignInWithEmail />);
  const loginComponentWrapper = screen.getByTestId("signInComponentTest");
  expect(loginComponentWrapper).toBeInTheDocument();
  expect(loginComponentWrapper).toHaveClass("bg-white");
  expect(loginComponentWrapper).toHaveClass("shadow-md");
});

test("Login component matches its own snapshot", () => {
  const tree = renderer.create(<SignInWithEmail />).toJSON();
  expect(tree).toMatchSnapshot();
});
