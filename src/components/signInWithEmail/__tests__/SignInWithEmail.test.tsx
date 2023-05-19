import SignInWithEmail from "@components/signInWithEmail/SignInWithEmail";
import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "@utils/testUtils";

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
