import RegisterPage from "@/app/auth/register/page";
import { render, screen } from "@testing-library/react";

describe("Register page", () => {
  test("render the register form", () => {
    render(<RegisterPage />);

    const nameInput = screen.getByPlaceholderText(/first name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const registerButton = screen.getByRole("button", {
      name: /create account button/i,
    });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});