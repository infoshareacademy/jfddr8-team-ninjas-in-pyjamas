///<reference types="cypress" />

describe("Login component", () => {
  beforeEach(() => {
    cy.visit(
      "https://infoshareacademy.github.io/jfddr8-team-ninjas-in-pyjamas/#/login"
    );
  });

  it("displays the login form", () => {
    cy.get(".login-form").should("be.visible");
    cy.get("form").should("exist");
    cy.get("#login").should("exist");
    cy.get("#password").should("exist");
    cy.get("button").should("contain", "Login");
  });

  it("allows the user to log in with valid credentials", () => {
    cy.get("#login").type("valid_user");
    cy.get("#password").type("valid_password");

    cy.get("form").submit();
    cy.url().should("include", "/");
  });

  // it('displays an error message with invalid credentials', () => {
  //   cy.get('#login').type('invalid_user');
  //   cy.get('#password').type('invalid_password');

  //   cy.get('form').submit();
  //   cy.get('.error-message').should('be.visible');
  // });
});
