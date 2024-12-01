describe("Authentication flow", () => {
  it("Register and login a user", () => {
    // Register a new user
    cy.visit("/auth/register");
    cy.get('input[placeholder="First name"]').type("John Doe");
    cy.get('input[placeholder="Email"]').type("john@example.com");
    cy.get('input[placeholder="Password"]').type("password123");
    cy.contains("Create an account").click();
    cy.contains("Registration successful!");

    // Log in with the new user
    cy.visit("/auth/login");
    cy.get('input[placeholder="Email"]').type("john@example.com");
    cy.get('input[placeholder="Password"]').type("password123");
    cy.contains("Login").click();
    cy.contains("Login Successful!");
  });
});